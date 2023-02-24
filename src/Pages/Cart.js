import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { OneCart } from "../components/OneCart";
import emptyCart from "../components/images/EmptyCart1.png";
import { NavLink } from "react-router-dom";

export const Cart = observer(() => {
    let counterCartItems = 0;
    let empty = 0;
    let totalPrice = 0;

    store.ApiData.map((item) => {
        if (item.isCart === true) {
            empty = empty + 1;
            counterCartItems = counterCartItems + item.cartQuantity;
            totalPrice = totalPrice + item.totalPrice;
        }
    });

    return (
        <>
            {empty > 0 && (
                <div className="cartContainer">
                    <div className="totalPrice">
                        <div className="cartQuantity">В корзине товаров:</div>
                        {/* <div>товаров: </div> */}
                        <div>{counterCartItems} шт.</div>
                        <div className="cartQuantity">На сумму:</div>
                        <div className="">{totalPrice.toFixed(2)} $</div>
                        <div>
                            <input
                                className="buyButton"
                                type="button"
                                value="Перейти к оформлению"
                            />
                        </div>
                    </div>
                    <div className="cartProducts">
                        {store.ApiData.map((item) => {
                            if (item.isCart === true) {
                                return (
                                    <div key={item.id}>
                                        <OneCart
                                            Item={item}
                                            // Counter={counter}
                                            // SetCounter={setCounter}
                                            // TotalPrice={totalPrice}
                                            // SetTotalPrice={setTotalPrice}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
            {empty === 0 && (
                <div className="emptyCart">
                    <div>
                        <img src={emptyCart} loading="lazy" />
                    </div>
                    <div>
                        Ваша корзина пуста. Вы можете вернуться к покупкам
                    </div>
                    <div>
                        <NavLink to="/products">Вернуться к покупкам</NavLink>
                    </div>
                </div>
            )}
        </>
    );
});
