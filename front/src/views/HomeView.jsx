import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import { loadIncomes } from "../store/incomes.actions.js"

import { PieChart } from "../components/PieChart";
import { Loader } from "../components/Loader";
import { AddModal } from "../components/addModal.jsx";
import { loadSpends } from "../store/spends.actions.js";

export function HomeView() {
  const [wallet, setWallet] = useState({ wallet: 0, spendsCount: 0, incomesCount: 0 })
  const [showModal, setShowModal] = useState(null)
  const [loader, setLoader] = useState(true)

  const incomes = useSelector(storeState => storeState.incomesModule.incomes)
  const spends = useSelector(storeState => storeState.spendsModule.spends)

  console.log(incomes)
  useEffect(() => {
    if (incomes.length && spends.length){
      setLoader(false)
      return
    } 
    const fetchData = async () => {
      await loadIncomes()
      await loadSpends()
      setLoader(false)
    }
    fetchData()
  }, [])


  useEffect(() => {
    const incomesWallet = incomes.reduce((total, income) => total + parseInt(income.price), 0);
    const spendsWallet = spends.reduce((total, spend) => total + parseInt(spend.price), 0);
    const enlistedWallet = spends.reduce((total, spend) => total + parseInt(spend.enlisted), 0);
    setWallet({ wallet: incomesWallet - enlistedWallet, spendsCount: spendsWallet, incomesCount: incomesWallet })
  }, [incomes, spends])

  function calculateProcent(type) {
    if (type === 'income') {
      if (wallet.incomesCount === 0) return '0%'
      return ((((wallet.incomesCount + wallet.spendsCount) / wallet.spendsCount) * 100) + "%")
    }
    else {
      if (wallet.spendsCount === 0) return '0%'
      return ((((wallet.incomesCount + wallet.spendsCount) / wallet.incomesCount) * 100) + "%")
    }
  }


  return (
    <div className="home-view">
      {loader ? <Loader /> : ''}
      {showModal ? <AddModal setLoader={setLoader} setShowModal={setShowModal} showModal={showModal} /> : ''}
      <div className="app-header">
        <NavLink className='incomes' to='/incomes'>Доходы</NavLink>
        <NavLink className='spends' to='/spends'>Расходы</NavLink>
      </div>
      <PieChart incomesCount={wallet.incomesCount} spendsCount={wallet.spendsCount} />
      <div className="wallet-container">
        <span>Кошелек</span>
        <div className="wallet">
          <button className="add-income" onClick={() => (setShowModal('income'))}>+</button>
          <span>{wallet.wallet} P</span>
          <button className="add-spend" onClick={() => (setShowModal('spend'))}>+</button>
        </div>
        <div className="wallet-bar">
          {/* <div className="income-bar" ></div> */}
          <div className="income-bar" style={{ width: calculateProcent('income') }}></div>
          <div className="middle-bar"></div>
          {/* <div className="spend-bar" ></div> */}
          <div className="spend-bar" style={{ width: calculateProcent('spend') }}></div>
        </div>
      </div>
    </div>
  );
}

