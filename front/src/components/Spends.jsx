import { RiDeleteBin6Line } from "react-icons/ri";


export function Spends({ addSpend, spendList }) {

    return (
        <div className="spends">
            <span>Расходы</span>
            <form class="input-group mb-3" onSubmit={(e) => addSpend(e)}>
                <input type="text" class="form-control" placeholder="Трата" />
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" placeholder="Сумма" />
                <button type="submit" class="btn btn-primary">+</button>
            </form>
            <ul class="list-group">
                {spendList.map((item, index) => (
                    <li class="list-group-item" key={index}>
                        <span className="item">{item.title}</span>
                        <span className="item">{item.price}</span>
                        <button>
                            <RiDeleteBin6Line />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}