import { RiDeleteBin6Line } from "react-icons/ri";

export function Incomes({ incomeList, addIncome }) {

    return (
        <div className="income">
            <span>Доходы</span>
            <form class="input-group mb-3" onSubmit={(e) => addIncome(e)}>
                <input type="text" class="form-control" placeholder="Источник" />
                <span class="input-group-text"></span>
                <input type="number" class="form-control" placeholder="Сумма" />
                <button type="submit" class="btn btn-primary">+</button>
            </form>
            <div class="list-group">
                {incomeList.map((item, index) => (
                    <div class="list-group-item" key={index}>
                        <span className="item">{item.title}</span>
                        <span className="item">{item.price}</span>
                        <button>
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}