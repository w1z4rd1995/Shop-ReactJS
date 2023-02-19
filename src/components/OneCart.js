import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";

export const OneCart = observer((props) => {
    return (
        <div className="cart">
            <div className="imageCart">
                <img src={props.Items.image} />
            </div>
            <div className="cartTitle">{props.Items.title}</div>
            <div className="cartRating">
                <Rating value={props.Items.rating.rate} readOnly />
            </div>
            <div className="cartPrice">{props.Items.price} $</div>
            <div className="cartItemQuantity">кол-во</div>
            <div className="cartButtons">
                <input
                    type="button"
                    value="Удалить"
                    onClick={() => {
                        console.log("delete");
                        store.deleteCartItem(props.Items.id);
                    }}
                />
            </div>
        </div>
    );
});
