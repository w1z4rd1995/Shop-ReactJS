import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";
import { useState } from "react";

export const OneProduct = observer((props) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <div className="oneProduct">
            <div className="imageStyle">
                <img src={props.Item.image} />
            </div>
            <div className="titleStyle">{props.Item.title}</div>
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
                            console.log(props.Item.id);
                            store.addCart(props.Item.id);

                            // console.log(props.Item.quantity);
                        }}
                    ></input>
                ) : (
                    <div>123</div>
                )}
            </div>
        </div>
    );
});
