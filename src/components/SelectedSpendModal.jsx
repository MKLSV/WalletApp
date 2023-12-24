import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { utilService } from "../services/util.service";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { storageService } from "../services/async-storage.service";

export function SelectedSpendModal({ setLoader, setList, list, setSelectedSpend, selectedSpend }) {

    const [deleteModal, setDeleteModal] = useState(false)
    const [editItem, setEditItem] = useState(false)
    const [onAddEnlisted, setOnAddEnliste] = useState(false)
    const [editedItem, setEditedItem] = useState({ ...selectedSpend })
    const [newEnliste, setNewEnliste] = useState(null)
    const spendKEY = 'SPENDS_DB'
    function onEdit() {
        if (deleteModal) return
        setEditItem(true)
    }
    function handleChange(event) {
        console.log(event.target.id)
        const name = event.target.id
        const value = event.target.value
        setEditedItem((prev) => ({ ...prev, [name]: value }))
    }
    function handleEnliste(event) {
        const value = event.target.value
        if (value > parseInt(editedItem.price)) setNewEnliste(editedItem.price)
        else {
            setNewEnliste(parseInt(value))
        }
    }
    async function saveChanges() {
        setEditItem(false)
        setLoader(true)
        await storageService.put(spendKEY, editedItem)
        let newList = list
        const idx = newList.findIndex(item => item.id === selectedSpend.id)
        newList.splice(idx, 1, editedItem)
        setList(newList)
        setLoader(false)
        setSelectedSpend(null)
    }
    async function deleteIncome() {
        setLoader(true)
        await storageService.remove(spendKEY, selectedSpend.id)
        let newList = list
        const idx = newList.findIndex(item => item.id === selectedSpend.id)
        newList.splice(idx, 1)
        setList(newList)
        setLoader(false)
        setSelectedSpend(null)
    }

    async function addNewEnliste() {
        setLoader(true)
        const newEditedItem = { ...editedItem, enlisted: editedItem.enlisted + newEnliste, price: parseInt(editedItem.price) - newEnliste }
        setEditedItem(newEditedItem)
        await storageService.put(spendKEY, editedItem)
        let newList = list
        const idx = newList.findIndex(item => item.id === selectedSpend.id)
        newList.splice(idx, 1, newEditedItem)
        setList(newList)
        setLoader(false)
    }

    return (
        <div className="item-modal" onClick={() => setSelectedSpend(null)}>
            <div className="item-info" onClick={(e) => (e.stopPropagation())}>
                <div className="item">
                    <label>Источник</label>
                    {editItem ?
                        <input type="text" id="title" value={editedItem.title} onChange={(e) => handleChange(e)} />
                        :
                        <span>{editedItem.title}</span>
                    }
                </div>
                <div className="item">
                    <label>Оставшаяся Сумма</label>
                    {editItem ?
                        <input type="text" id="price" value={editedItem.price} onChange={(e) => handleChange(e)} />
                        :
                        <span>{editedItem.price}</span>
                    }

                </div>
                <div className="item">
                    <label>Уже зачисленно</label>
                    <span>{editedItem.enlisted}</span>

                </div>
                {!onAddEnlisted ?
                    <div className="item">
                        <label>Число</label>
                        {editItem ?
                            <input type="text" id="date" value={editedItem.date} onChange={(e) => handleChange(e)} />
                            :
                            <span>{editedItem.date}</span>
                        }
                    </div>
                    :
                    <div className="item">
                        <label>Зачислить</label>
                        <input type="number" value={newEnliste} onChange={(e) => handleEnliste(e)} />
                    </div>
                }
                {onAddEnlisted ?
                    <button className="add-spend-btn" onClick={addNewEnliste}>Внеси</button>
                    :
                    <button className="add-spend-btn" onClick={() => setOnAddEnliste(true)}>Внеси Часть</button>
                }
                {editItem ?
                    <div className="btns">
                        <FaCheck className="set" style={{ color: 'green', }} onClick={saveChanges} />
                        <IoClose className="unset" style={{ color: 'red', fontSize: '35px' }} onClick={() => setEditItem(false)} />
                    </div>
                    :
                    <div className={deleteModal ? "btns disabled" : "btns"}>
                        <RiDeleteBin5Line onClick={() => setDeleteModal(true)} />
                        <FaRegEdit onClick={onEdit} />
                    </div>
                }
                <div className={deleteModal ? "delete-modal active" : "delete-modal"}>
                    <span>ТОЧНО?</span>
                    <div className="delete-modal-btns">
                        <button className="yes" onClick={deleteIncome}>Ага</button>
                        <button className="no" onClick={() => setDeleteModal(false)}>Не</button>
                    </div>
                </div>
            </div>

        </div>
    )
}