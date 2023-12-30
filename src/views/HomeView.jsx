import { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { NavLink, useNavigate } from "react-router-dom";
import { storageService } from "../services/async-storage.service";
import { Loader } from "../components/Loader";

export function HomeView() {
  const [wallet, setWallet] = useState(0)
  const [incomesCount, setIncomesCount] = useState(0)
  const [spendsCount, setSpandsCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();

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

  useEffect(() => {
    setWallet(incomesCount)
  }, [incomesCount, spendsCount])

  return (
    <div className="home-view">
      {loader ? <Loader /> : ''}
      <div className="app-header">
        {/* <button className="incomes" onClick={() => navigate('/incomes')}>Доходы</button>
        <button className="spends" onClick={() => navigate('/spends')}>Расходы</button> */}
        <NavLink className='incomes' to='/'>Доходы</NavLink>
        <NavLink className='spends' to='/'>Расходы</NavLink>
      </div>
      <PieChart spendsCount={spendsCount} />
      <div className="wallet-container">
        <span>Кошелек</span>
        <div className="wallet">
          <button className="add-income">+</button>
          <span>{wallet} P</span>
          <button className="add-spend">+</button>
        </div>
        <div className="wallet-bar">
          <div className="income-bar"></div>
          <div className="middle-bar">
          </div>
          <div className="spend-bar"></div>
        </div>
      </div>
    </div>
  );
}

