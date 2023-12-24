import { useEffect, useState } from "react";
import { storageService } from "../services/async-storage.service";
import { Loader } from "../components/Loader";
import { AddSpendModal } from "../components/addSpendModal";
import { SelectedSpendModal } from "../components/SelectedSpendModal";

export function SpendsView() {
    const [spendsList, setSpendsList] = useState([])
    const [spendWallet, setSpendWallet] = useState(0)
    const [enlistedWallet, setEnlistedWallet] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedSpend, setSelectedSpend] = useState(null)
    const [loader, setLoader] = useState(true)
    const spendsKEY = 'SPENDS_DB'


    useEffect(() => {
        storageService.query(spendsKEY).then((spends) => {
            setSpendsList(spends)
            setLoader(false)
        })
    }, [])
    useEffect(() => {
        const newWallet = spendsList.reduce((total, spend) => total + parseInt(spend.price), 0);
        setSpendWallet(newWallet)
        const newEnlistedWallet = spendsList.reduce((total, spend) => total + parseInt(spend.enlisted), 0);
        setEnlistedWallet(newEnlistedWallet)
    }, [spendsList, selectedSpend])

    function onSelectedSpend(id) {
        const selected = spendsList.find(item => item.id === id)
        console.log(selected)
        setSelectedSpend(selected)
    }


    return (
        <div className="income">
            {loader ? <Loader/> : ''}
            {showModal ? <AddSpendModal setLoader={setLoader} setList={setSpendsList} setShowModal={setShowModal} spendsKEY={spendsKEY} /> : ''}
            {selectedSpend ? <SelectedSpendModal setLoader={setLoader} list={spendsList} setList={setSpendsList} selectedSpend={selectedSpend} setSelectedSpend={setSelectedSpend} /> : ''}
            <div className="wallet">
                <span>Расходы: </span>
                <span>{spendWallet}</span>
                <span>p</span>
            </div>
            <div className="wallet">
                <span>Внесено: </span>
                <span>{enlistedWallet}</span>
                <span>p</span>
            </div>
            {spendsList && spendsList.length ?
                <div class="list-group" >
                    {spendsList.map((item, index) => (
                        <div class="list-item" key={index} onClick={() => onSelectedSpend(item.id)}>
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