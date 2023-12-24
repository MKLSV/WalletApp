import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { utilService } from "../services/util.service";
import { storageService } from "../services/async-storage.service";

export function AddIncomeModal({ setLoader, setList, setShowModal, incomeKEY }) {

    const [error, setError] = useState('')
    const [checked, setChecked] = useState(false)

   async function onAddItem(e) {
        e.preventDefault()
        if (!e.target[0].value.length || !e.target[1].value.length || (!e.target[2].value.length && !checked)) {
            setError('Не хватает данных')
            return
        }
        else {
            const data = {
                title: e.target[0].value,
                price: e.target[1].value,
                date:  checked ? utilService.getTodayDate() : e.target[2].value.split('-').join('/')
            }
            setLoader(true)
            const newData = await storageService.post(incomeKEY, data)
            console.log(newData)
            setList((prev) => ([...prev, newData]))
            setShowModal(false)
            setLoader(false)
        }
    }


    return (
        <div className="add-modal" onClick={() => setShowModal(false)}>
            <form class="add-form" onSubmit={onAddItem} onClick={(e) => (e.stopPropagation())}>
                {/* <span className="close-btn"><IoClose/></span> */}
                <input type="text" class="form-control" placeholder="Источник" />
                <span class="input-group-text"></span>
                <input type="number" class="form-control" placeholder="Сумма" />
                {!checked ? 
                <input type="date" class="form-control" />
                :    
                <input type="date" class="form-control disabled" disabled/>
            }
                <section className="check">
                    <input type="checkbox" className="checkbox" id="today" name="today" onClick={() => setChecked(!checked)}/>
                    <label for="today">Сегодня</label>
                </section>
                <button type="submit" class="btn btn-primary">Добавить</button>
                <div className="error">{error}</div>
            </form>
        </div>
    )
}