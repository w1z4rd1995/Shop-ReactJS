import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";
import { useState } from "react";

export const OneProduct = observer((props) => {
    const [counter, setCounter] = useState(0);
    console.log(props.Item.quantity);

    return (
        <div className="oneProduct">
            <div className="imageStyle">
                <img src={props.Item.image} />
            </div>
            <div className="titleStyle">{props.Item.title}</div>
            <div className="ratingStyle">
                <Rating
                    className="ratingStyle"
                    value={props.Item.rating.rate}
                    readOnly
                />
            </div>
            <div className="priceStyle">{props.Item.price} $</div>

            <div className="addButtonStyle">
                {counter === 0 ? (
                    <input
                        className="inputButtonStyle"
                        type="button"
                        value="В корзину"
                        onClick={() => {
                            store.addCart(props.Item);
                            props.Item.quantity += 1;
                            console.log(props.Item.quantity);
                        }}
                    ></input>
                ) : (
                    <div>123</div>
                )}
            </div>
        </div>
    );
});
