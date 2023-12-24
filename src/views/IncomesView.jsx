import { useEffect, useState } from "react";
import { AddIncomeModal } from "../components/addIncomeModal";
import { SelectedIncomeModal } from "../components/SelectedIncomeModal";
import { storageService } from "../services/async-storage.service";
import { Loader } from "../components/Loader";

export function IncomesView() {
    const [incomeList, setIncomeList] = useState([])
    const [incomeWallet, setIncomeWallet] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedIncome, setSelectedIncome] = useState(null)
    const [loader, setLoader] = useState(true)
    const incomeKEY = 'INCOMES_DB'


    useEffect(() => {
        storageService.query(incomeKEY).then((incomes) => {
            setIncomeList(incomes)
            setLoader(false)
        })
    }, [])
    useEffect(() => {
        const newWallet = incomeList.reduce((total, income) => total + parseInt(income.price), 0);
        setIncomeWallet(newWallet)
    }, [incomeList, selectedIncome])

    function onSelectedIncome(id) {
        const selected = incomeList.find(item => item.id === id)
        setSelectedIncome(selected)
    }


    return (
        <div className="income">
            {loader ? <Loader/> : ''}
            {showModal ? <AddIncomeModal setLoader={setLoader} setList={setIncomeList} setShowModal={setShowModal} incomeKEY={incomeKEY} /> : ''}
            {selectedIncome ? <SelectedIncomeModal setLoader={setLoader} list={incomeList} setList={setIncomeList} selectedIncome={selectedIncome} setSelectedIncome={setSelectedIncome} /> : ''}
            <div className="wallet">
                <span>Доходы: </span>
                <span>{incomeWallet}</span>
                <span>p</span>
            </div>
            {incomeList && incomeList.length ?
                <div class="list-group" >
                    {incomeList.map((item, index) => (
                        <div class="list-item" key={index} onClick={() => onSelectedIncome(item.id)}>
                            <span className="item">{item.title}</span>
                            <span className="item">{item.price}p</span>
                        </div>
                    ))}
                    <button onClick={() => setShowModal(true)}>Добавить</button>
                </div>
                :
                <div className="add-btn" onClick={() => setShowModal(true)}>
                    <span>+</span>
                </div>
            }
        </div>
    )
}