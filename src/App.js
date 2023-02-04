import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { Catalog } from "./Pages/Catalog";
import { Contacts } from "./Pages/Contacts";
import { Main } from "./Pages/Main";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useContext } from "react";
import { StoreContext } from "./Stores/AppStore";

const App = observer(() => {
    const store = useContext(StoreContext);

    useEffect(() => {
        store.fetchData();
        console.log("зашел фетч");
    }, []);

    return (
        <div className="container">
            <div className="header">
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/catalog">Каталог</NavLink>
                <NavLink to="/contacts">Контакты</NavLink>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </div>
            <div className="footer">Footer</div>
        </div>
    );
});

export default App;
