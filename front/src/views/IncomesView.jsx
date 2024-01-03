import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadIncomes } from "../store/incomes.actions";
import { NavLink } from "react-router-dom";

import { IoArrowBackOutline } from "react-icons/io5";
import { Loader } from "../components/Loader";
import { SelectedIncomeModal } from "../components/SelectedIncomeModal";

export function IncomesView() {
    const [incomeWallet, setIncomeWallet] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedIncome, setSelectedIncome] = useState(null)
    const [loader, setLoader] = useState(true)

    const incomes = useSelector(storeState => storeState.incomesModule.incomes)
    console.log(incomes)
    console.log(incomes.length)

    useEffect(() => {
        if (incomes.length) {
            setLoader(false)
            return
        }
        const fetchData = async () => {
            await loadIncomes()
            setLoader(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const newWallet = incomes.reduce((total, income) => total + parseInt(income.price), 0);
        setIncomeWallet(newWallet)
    }, [incomes])

    function onSelectedIncome(id) {
        const selected = incomes.find(item => item._id === id)
        setSelectedIncome(selected)
    }


    return (
        <div className="list-container">
            {loader ? <Loader /> : ''}
            {selectedIncome ? <SelectedIncomeModal setLoader={setLoader} selectedIncome={selectedIncome} setSelectedIncome={setSelectedIncome} /> : ''}
            <div className="header">
                <div className="title">
                    <NavLink className='back' to='/'><IoArrowBackOutline /></NavLink>
                </div>
                <div className="wallet">
                    <span>Доходы: </span>
                    <span>{incomeWallet} P</span>
                </div>
            </div>
            {incomes && incomes.length ?
                <div className="list-group" >
                    {incomes.map((item, index) => (
                        <div className="list-item" key={index} onClick={() => onSelectedIncome(item._id)}>
                            <span className="item">{item.title}</span>
                            <span className="item">{item.price}p</span>
                        </div>
                    ))}
                    {/* <button onClick={() => setShowModal(true)}>Добавить</button> */}
                </div>
                :
                <div className="add-btn" onClick={() => setShowModal(true)}>
                    <span>+</span>
                </div>
            }
        </div>
    )
}