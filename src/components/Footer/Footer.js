import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import logo from "../images/footerLogo.PNG";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./Footer.css";

export const Footer = observer(() => {
    return (
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
                        <NavLink to="/products">Товары</NavLink>
                        <NavLink to="/cart">Корзина</NavLink>
                        <NavLink to="/contacts">Контакты</NavLink>
                    </div>
                </div>
                <div className="footerButton">
                    <NavLink to="/contacts" className="footerButtonStyle">
                        Связаться с нами
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
                                123456, Россия, г. Москва, ул. Степанова, д. 100{" "}
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
    );
});
