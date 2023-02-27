import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const OneProduct = observer((props) => {
    // const [quantity, setQuantity] = useState(0);

    return (
        <div className="oneProduct">
            <div className="imageStyle">
                <img src={props.Item.image} />
            </div>
            <div className="titleStyle">
                <NavLink to={`/products/${props.Item.id}`}>
                    {props.Item.title}
                </NavLink>
            </div>
            <div className="ratingStyle">
                <Rating
                    className="ratingStyle"
                    value={props.Item.rating}
                    readOnly
                />
            </div>
            <div className="priceStyle">{props.Item.price} $</div>

            <div className="addButtonStyle">
                {props.Item.isCart === false ? (
                    <input
                        className="inputButtonStyle"
                        type="button"
                        value="В корзину"
                        onClick={() => {
                            store.addCart(props.Item.id);
                        }}
                    ></input>
                ) : (
                    <div className="cartLink">
                        <NavLink to="/cart">Добавлено</NavLink>
                    </div>
                )}
            </div>
        </div>
    );
});
