import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../Stores/AppStore";

export const OneCart = observer((props) => {
    return (
        <div className="cart">
            <div className="imageCart">
                <img src={props.Items.image} />
            </div>
            <div>{props.Items.title}</div>
            <div>
                <Rating value={props.Items.rating.rate} readOnly />
            </div>
            <div>{props.Items.price} $</div>
            <div>
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
