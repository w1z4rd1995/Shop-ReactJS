import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";
import { useState } from "react";
import { ItemCounter } from "./ItemCounter";

export const OneCart = observer((props) => {
    // const [totalPriceItem, setTotalPriceItem] = useState(props.Item.price);
    // const totalPriceItem = counterItem * props.Item.price;
    // props.SetTotalPrice([totalPriceItem]);

    // let totalPrice = props.Item.cartQuantity * props.Item.price;
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
                    Id={props.Item.id}
                    Quantity={props.Item.cartQuantity}
                />
            </div>
            <div className="cartButtons">
                <div className="cartPrice">
                    {/* {props.Item.cartQuantity * props.Item.price} $ */}
                    {props.Item.totalPrice} $
                </div>
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
