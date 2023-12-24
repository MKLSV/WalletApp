import { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { useNavigate } from "react-router-dom";
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
  },[])

  useEffect(() => {
    setWallet(incomesCount)
  },[incomesCount,spendsCount])

  return (
    <div className="home-view">
      {loader ? <Loader/> : ''}
      <div className="wallet">
        <span>Кошелек:</span>
        <span>{wallet}</span>
        <span> Р</span>
      </div>
      <PieChart spendsCount={spendsCount}/>
      <div className="app-footer">
        {/* <NavLink className='incomes' to='/'>Доходы</NavLink>
        <NavLink className='incomes' to='/'>Расходы</NavLink> */}
        <button className="incomes" onClick={() => navigate('/incomes')}>Доходы</button>
        <button className="spends" onClick={() => navigate('/spends')}>Расходы</button>
      </div>
    </div>
  );
}

