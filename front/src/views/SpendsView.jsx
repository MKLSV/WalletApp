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
    const [spendList, setSpendList] = useState(null)

    const spends = useSelector(storeState => storeState.spendsModule.spends)
    useEffect(() => {
        if (spends.length) {
            const sortedSpends = spends.sort(function (a, b) {
                if (a.date === 'Не горит' && b.date !== 'Не горит') {
                    return 1;
                } else if (a.date !== 'Не горит' && b.date === 'Не горит') {
                    return -1;
                } else {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                }
            });
            console.log(sortedSpends)
            setSpendList(sortedSpends)
            setLoader(false)
            return
        }
        const fetchData = async () => {
            await loadSpends()
            const sortedSpends = spends.sort(function (a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setSpendList(sortedSpends)
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

    function checkPriority(date) {
        const diff = new Date(date).getTime() - Date.now()
        if (diff < 604800000) return 'list-item high'
        if (diff < 604800000 * 2) return 'list-item medium'
        if (date === 'Не горит') return 'list-item'
        return 'list-item low'
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
            {spendList && spendList.length ?
                <div className="list-group" >
                    {spendList.map((item, index) => (
                        <div className={checkPriority(item.date)} key={index} onClick={() => onSelectedSpend(item._id)}>
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