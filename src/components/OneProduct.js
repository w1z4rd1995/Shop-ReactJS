import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";

export const OneProduct = observer((props) => {
    return (
        <div className="oneProduct">
            <div className="imageStyle">
                <img src={props.Item.image} />
            </div>
            <div>{props.Item.title}</div>
            <div>
                <Rating value={props.Item.rating.rate} readOnly />
            </div>
            <div>{props.Item.price} $</div>
            <div className="cardButtons">
                <div>
                    <input type="button" value="Подробнее"></input>
                </div>
                <div>
                    <input type="button" value="В корзину"></input>
                </div>
            </div>
        </div>
    );
});
