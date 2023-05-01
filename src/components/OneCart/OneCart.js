import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../../Stores/AppStore";
import { useState } from "react";
import { ItemCounter } from "../ItemCounter/ItemCounter";
import "./OneCart.css";

export const OneCart = observer((props) => {
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
                    Item={props.Item}
                    Id={props.Item.id}
                    Quantity={props.Item.cartQuantity}
                />
            </div>
            <div className="cartButtons">
                <div className="cartPrice">
                    {props.Item.totalPrice.toFixed(2)} $
                </div>
                <input
                    className="deleteButtonStyle"
                    type="button"
                    value="Удалить"
                    onClick={() => {
                        store.deleteCartItem(props.Item.id);
                        store.setCategoryFilter(props.Item);
                        store.setItemQuantity(props.Item.id);
                        store.findCartCount();
                    }}
                />
            </div>
        </div>
    );
});
