import { useState } from "react";
import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";

export const ItemCounter = observer((props) => {
    const [counterItem, setCounterItem] = useState(props.Quantity);
    let counter = counterItem;
    const minValue = 0;
    const maxValue = 20;

    const increase = () => {
        if (counter < maxValue) {
            counter += 1;
            setCounterItem(counter);
        }

        store.setNewQuantity(props.Id, counter);
        store.findCartCount();
    };

    const decrease = () => {
        if (counter > minValue) {
            counter -= 1;
            setCounterItem(counter);
            store.setNewQuantity(props.Id, counter);
        }
        store.findCartCount();

        if (counter === 0) {
            store.deleteCartItem(props.Id);
            store.setCategoryFilter(props.Item);
            store.findCartCount();
        }
    };

    return (
        <div className="counterStyle">
            <div className="buttonTextStyle">
                <input
                    className="counterButton"
                    type="button"
                    value="-"
                    onClick={decrease}
                ></input>
            </div>
            <div className="counter">
                <input
                    className="counterText"
                    type="text"
                    value={props.Quantity}
                    readOnly
                />
            </div>
            <div className="buttonTextStyle">
                <input
                    className="counterButton"
                    type="button"
                    value="+"
                    onClick={increase}
                />
            </div>
        </div>
    );
});
