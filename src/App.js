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
import logo from "./components/images/footerLogo.PNG";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { SearchField } from "@adobe/react-spectrum";

const App = observer(() => {
    return (
        <div className="container">
            <div className="header">
                <div className="headerLogo">
                    <img className="headerLogoStyle" src={logo} />
                </div>
                <div className="headerLinks">
                    <div>
                        <NavLink to="/">Главная</NavLink>
                    </div>

                    <div>
                        <NavLink to="/products">Все товары</NavLink>
                    </div>
                    <div>
                        <NavLink to="/cart">Корзина</NavLink>
                    </div>
                    <div>
                        <NavLink to="/contacts">Контакты</NavLink>
                    </div>
                </div>
                <div className="headerSearchStyle">
                    <SearchField className="headerSearch" />
                </div>
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

                    {/* <Route
                        path="/catalog/:categoryName"
                        element={<CategoryProducts />}
                    /> */}
                </Routes>
            </div>
            <div className="footer">
                <div className="footerContent">
                    <div className="footerLogo">
                        <img className="logoStyle" src={logo}></img>
                    </div>
                    <div className="footerPages">
                        <div>
                            <h2>Страницы</h2>
                        </div>
                        <div className="footerNav">
                            <NavLink to="/">Главная</NavLink>
                            <NavLink to="/catalog">Каталог</NavLink>
                            <NavLink to="/products">Все товары</NavLink>
                            <NavLink to="/cart">Корзина</NavLink>
                            <NavLink to="/contacts">Контакты</NavLink>
                        </div>
                    </div>
                    <div className="footerButton">
                        <NavLink to="/contacts" className="footerButtonStyle">
                            Связаться с нами{" "}
                        </NavLink>
                    </div>
                    <div className="footerContacts">
                        <div>
                            <h2>Контакты</h2>
                        </div>
                        <div className="footerContactsInfo">
                            <div className="footerLocation">
                                <div>
                                    <LocationOnIcon />
                                </div>
                                <div>
                                    123456, Россия, г. Москва, ул. Степанова, д.
                                    100{" "}
                                </div>
                            </div>
                            <div className="footerPhone">
                                <div>
                                    <CallIcon />
                                </div>
                                <div>+7(495)4958800</div>
                            </div>
                            <div className="footerMail">
                                <div>
                                    <MailOutlineIcon />
                                </div>
                                <div>sobaka@mail.ru</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerMoreInfo">
                    <div className="footerIcons">
                        <TelegramIcon fontSize="large" />
                        <FacebookIcon fontSize="large" />
                        <TwitterIcon fontSize="large" />
                    </div>
                    <div className="footerText">
                        Copyright &copy; 2023. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
});

export default App;
