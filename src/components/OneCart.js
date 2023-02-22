import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";
import { useState } from "react";
import { ItemCounter } from "./ItemCounter";

export const OneCart = observer((props) => {
    // let price = props.Item.price;
    const [counter, setCounter] = useState(1);
    const totalPrice = (counter * props.Item.price).toFixed(2);

    return (
        <div className="cart">
            <div className="imageCart">
                <img src={props.Item.image} />
            </div>
            <div className="cartTitle">
                <div className="cartTitleStyle">{props.Item.title}</div>
                <div className="cartRating">
                    <Rating value={props.Item.rating} readOnly />
                </div>
            </div>

            <div className="cartItemQuantity">
                <ItemCounter
                    Counter={counter}
                    SetCounter={setCounter}
                    Id={props.Item.id}
                />
            </div>
            <div className="cartButtons">
                <div className="cartPrice">{totalPrice} $</div>
                <input
                    className="deleteButtonStyle"
                    type="button"
                    value="Удалить"
                    onClick={() => {
                        console.log("delete");
                        store.deleteCartItem(props.Item.id);
                    }}
                />
            </div>
        </div>
    );
});
