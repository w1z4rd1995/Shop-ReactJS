import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { Catalog } from "./Pages/Catalog";
import { Contacts } from "./Pages/Contacts";
import { Main } from "./Pages/Main";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useContext } from "react";
import { StoreContext } from "./Stores/AppStore";
import { Category } from "./Pages/Category";

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
                    <Route
                        path="/catalog/:categoryName"
                        element={<Category />}
                    />
                </Routes>
            </div>
            <div className="footer">Footer</div>
        </div>
    );
});

export default App;
