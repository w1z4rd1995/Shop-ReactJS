import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";

export const OneProduct = observer((props) => {
    return (
        <div className="oneProduct">
            <div className="imageStyle">
                <img src={props.Item.image} />
            </div>
            <div className="titleStyle">{props.Item.title}</div>
            <div className="ratingStyle">
                <Rating value={props.Item.rating.rate} readOnly />
            </div>
            <div className="priceStyle">{props.Item.price} $</div>
            <div className="addButtonStyle">
                <input
                    className="inputButtonStyle"
                    type="button"
                    value="В корзину"
                    onClick={() => {
                        store.addCart(props.Item);
                    }}
                ></input>
            </div>
        </div>
    );
});
