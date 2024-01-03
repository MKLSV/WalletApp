import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { useSelector } from "react-redux";
import { loadSpends } from "../store/spends.actions";
import { NavLink } from "react-router-dom";

import { IoArrowBackOutline } from "react-icons/io5";
import { SelectedSpendModal } from "../components/SelectedSpendModal";

export function SpendsView() {
    const [spendWallet, setSpendWallet] = useState(0)
    const [enlistedWallet, setEnlistedWallet] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedSpend, setSelectedSpend] = useState(null)
    const [loader, setLoader] = useState(true)


    const spends = useSelector(storeState => storeState.spendsModule.spends)

    useEffect(() => {
        if (spends.length) {
            setLoader(false)
            return
        }
        const fetchData = async () => {
            await loadSpends()
            setLoader(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const newWallet = spends.reduce((total, spend) => total + parseInt(spend.price), 0);
        setSpendWallet(newWallet)
        const newEnlistedWallet = spends.reduce((total, spend) => total + parseInt(spend.enlisted), 0);
        setEnlistedWallet(newEnlistedWallet)
    }, [spends])



    function onSelectedSpend(id) {
        const selected = spends.find(item => item._id === id)
        console.log(selected)
        setSelectedSpend(selected)
    }


    return (
        <div className="list-container">
            {loader ? <Loader /> : ''}
            {selectedSpend ? <SelectedSpendModal setLoader={setLoader} selectedSpend={selectedSpend} setSelectedSpend={setSelectedSpend} /> : ''} 
            <div className="header spend">
                <div className="title">
                    <NavLink className='back' to='/'><IoArrowBackOutline /></NavLink>
                </div>
                <div className="wallet">
                    <section>
                        <span>Расходы: </span>
                        <span>{spendWallet} P</span>
                    </section>
                    <section>
                        <span>Внесено: </span>
                        <span>{enlistedWallet} P</span>
                    </section>
                </div>
            </div>
            {spends && spends.length ?
                <div className="list-group" >
                    {spends.map((item, index) => (
                        <div className="list-item" key={index} onClick={() => onSelectedSpend(item._id)}>
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