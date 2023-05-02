import { Routes, Route, NavLink } from "react-router-dom";
import { Contacts } from "../pages/Contacts/Contacts";
import { Main } from "../pages/Main/Main";
import { observer } from "mobx-react-lite";
import { Products } from "../pages/Products/Products";
import { Cart } from "../pages/Cart/Cart";
import { OneProductPage } from "../pages/OneProductPage/OneProductPage";
import "./Navigation.css";

export const Navigation = observer(() => {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/products" element={<Products />} />
                <Route
                    path="/products/:productId"
                    element={<OneProductPage />}
                />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    );
});
