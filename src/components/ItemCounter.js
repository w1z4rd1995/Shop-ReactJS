import { useState } from "react";
import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";

export const ItemCounter = observer((props) => {
    const minValue = 0;
    const maxValue = 20;
    console.log(props.Counter);
    const increase = () => {
        if (props.Counter < maxValue) props.SetCounter(props.Counter + 1);
    };

    const decrease = () => {
        if (props.Counter > minValue) {
            props.SetCounter(props.Counter - 1);
        }
        if (props.Counter === 1) {
            store.deleteCartItem(props.Id);
        }
    };

    return (
        <div className="counterStyle">
            <div className="">
                <input
                    className="counterDecrease"
                    type="button"
                    value="-"
                    onClick={decrease}
                />
            </div>
            <div>
                <input
                    className="counterText"
                    type="text"
                    value={props.Counter}
                    readOnly
                />
            </div>
            <div>
                <input type="button" value="+" onClick={increase} />
            </div>
        </div>
    );
});
