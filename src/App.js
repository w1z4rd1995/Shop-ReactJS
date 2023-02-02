import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { Catalog } from "./Catalog";
import { Contacts } from "./Contacts";
import { Main } from "./Main";

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
