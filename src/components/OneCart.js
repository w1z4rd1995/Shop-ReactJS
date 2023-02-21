import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";

export const OneCart = observer((props) => {
    console.log("OneCart");

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

            <div className="cartItemQuantity">кол-во</div>
            <div className="cartButtons">
                <div className="cartPrice">{props.Item.price} $</div>
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
