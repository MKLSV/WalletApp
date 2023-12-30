import { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { NavLink, useNavigate } from "react-router-dom";
import { storageService } from "../services/storage.service";
import { Loader } from "../components/Loader";


export function HomeView() {
  const [wallet, setWallet] = useState(0)
  const [incomesCount, setIncomesCount] = useState(0)
  const [spendsCount, setSpandsCount] = useState(0)
  const [loader, setLoader] = useState(true)


  const spendKEY = 'SPENDS_DB'
  const incomeKEY = 'INCOMES_DB'

  useEffect(() => {
    storageService.query(spendKEY).then((spends) => {
      const spendsWallet = spends.reduce((total, spend) => total + parseInt(spend.enlisted), 0);
      setSpandsCount(parseInt(spendsWallet))
    })
    storageService.query(incomeKEY).then((incomes) => {
      const incomesWallet = incomes.reduce((total, income) => total + parseInt(income.price), 0);
      setIncomesCount(parseInt(incomesWallet))
      setLoader(false)
    })
  }, [])
  console.log(incomesCount)
  console.log(spendsCount)
  useEffect(() => {
    setWallet(incomesCount - spendsCount)
  }, [incomesCount, spendsCount])

  function calculateProcent(type) {
    if (type === 'income') {
      if(incomesCount === 0) return '0wv' 
      return((((incomesCount + spendsCount) / incomesCount) * 100) + "%")
    }
    else{
      if(spendsCount === 0) return '0%' 
      return((((incomesCount + spendsCount) / spendsCount) * 100) + "%")
    }
  }

  return (
    <div className="home-view">
      {loader ? <Loader /> : ''}
      <div className="app-header">
        <NavLink className='incomes' to='/'>Доходы</NavLink>
        <NavLink className='spends' to='/'>Расходы</NavLink>
      </div>
      <PieChart incomesCount={incomesCount} spendsCount={spendsCount} />
      <div className="wallet-container">
        <span>Кошелек</span>
        <div className="wallet">
          <button className="add-income">+</button>
          <span>{wallet} P</span>
          <button className="add-spend">+</button>
        </div>
        <div className="wallet-bar">
          <div className="income-bar" ></div>
          {/* <div className="income-bar" style={{ width: calculateProcent('income') }}></div> */}
          <div className="middle-bar">
          </div>
          <div className="spend-bar" ></div>
          {/* <div className="spend-bar" style={{ width: calculateProcent('spend') }}></div> */}
        </div>
      </div>
    </div>
  );
}

