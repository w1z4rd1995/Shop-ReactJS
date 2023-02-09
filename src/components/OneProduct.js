import { observer } from "mobx-react-lite";

export const OneProduct = observer((props) => {
    return (
        <div className="oneProduct">
            <div className="imageStyle">
                <img src={props.Item.image} />
            </div>
            <div>{props.Item.title}</div>
            <div>rating:{props.Item.rating.rate}</div>
            <div>price:{props.Item.price}</div>
        </div>
    );
});
