import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import { store } from "../../stores/AppStore";
import { NavLink } from "react-router-dom";
import "./OneProduct.css";

export const OneProduct = observer((props) => {
    return (
        <>
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
                            store.setCategoryFilter(props.Item);
                            store.findCartCount();
                        }}
                    ></input>
                ) : (
                    <div className="cartLink">
                        <NavLink to="/cart">Добавлено</NavLink>
                    </div>
                )}
            </div>
        </>
    );
});
