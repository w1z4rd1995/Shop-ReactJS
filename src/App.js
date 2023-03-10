import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { Catalog } from "./Pages/Catalog";
import { Contacts } from "./Pages/Contacts";
import { Main } from "./Pages/Main";
import { observer } from "mobx-react-lite";
import { CategoryProducts } from "./Pages/CategoryProducts";
import { Products } from "./components/Products";
import { Cart } from "./Pages/Cart";
import { OneProductPage } from "./Pages/OneProductPage";

const App = observer(() => {
    return (
        <div className="container">
            <div className="header">
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/catalog">Каталог</NavLink>
                <NavLink to="/products">Все товары</NavLink>
                <NavLink to="/cart">Корзина</NavLink>
                <NavLink to="/contacts">Контакты</NavLink>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/:productId"
                        element={<OneProductPage />}
                    />

                    <Route path="/cart" element={<Cart />} />

                    <Route
                        path="/catalog/:categoryName"
                        element={<CategoryProducts />}
                    />
                </Routes>
            </div>
            <div className="footer">Footer</div>
        </div>
    );
});

export default App;
