import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { OneCart } from "../components/OneCart";
import emptyCart from "../components/images/EmptyCart1.png";
import { NavLink } from "react-router-dom";

export const Cart = observer(() => {
    return (
        <>
            <div className="cartContainer">
                <div className="totalPrice">TotalPrice</div>
                <div className="cartProducts">
                    {store.ApiData.map((item) => {
                        if (item.isCart === true) {
                            return (
                                <div key={item.id}>
                                    <OneCart Item={item} />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
});

//  {Object.keys(store.cartProduct).length === 0 ? (
//     <div className="emptyCart">
//     <div>
//         <img src={emptyCart} />
//     </div>
//     <div>
//         Ваша корзина пуста. Вы можете вернуться к покупкам
//     </div>
//     <div>
//         <NavLink to="/products">Вернуться к покупкам</NavLink>
//     </div>
// </div>
// ) : (
