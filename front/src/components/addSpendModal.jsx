import { useState } from "react";
import { storageService } from "../services/async-storage.service";

export function AddSpendModal({ setLoader, setList, setShowModal }) {

    const [error, setError] = useState('')
    const [checked, setChecked] = useState(false)

    const spendKEY = 'SPENDS_DB'

    async function onAddItem(e) {
        e.preventDefault()
        if (!e.target[0].value.length || !e.target[1].value.length || (!e.target[2].value.length && !checked)) {
            setError('Не хватает данных')
            return
        }
        else {
            setLoader(true)
            const data = {
                enlisted: 0,
                title: e.target[0].value,
                price: e.target[1].value,
                date:  checked ? 'Не горит' : e.target[2].value.split('-').join('/')
            }
            const newData = await storageService.post(spendKEY, data)
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
                <input type="text" class="form-control" placeholder="Трата" />
                <span class="input-group-text"></span>
                <input type="number" class="form-control" placeholder="Сумма" />
                {!checked ? 
                <input type="date" class="form-control" />
                :    
                <input type="date" class="form-control disabled" disabled/>
            }
                <section className="check">
                    <input type="checkbox" className="checkbox" id="today" name="today" onClick={() => setChecked(!checked)}/>
                    <label for="today">Не горит</label>
                </section>
                <button type="submit" class="btn btn-primary">Добавить</button>
                <div className="error">{error}</div>
            </form>
        </div>
    )
}