import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { OneCart } from "../components/OneCart";

export const Cart = observer(() => {
    return (
        <div className="cartContainer">
            <div className="totalPrice">TotalPrice</div>
            <div className="cartProducts">
                {Object.keys(store.cartProduct).length === 0 ? (
                    <div className="emptyCart">
                        <div>корзина пуста </div>
                    </div>
                ) : (
                    store.cartProduct.map((item) => {
                        return (
                            <div key={item.id}>
                                <OneCart Items={item} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
});
