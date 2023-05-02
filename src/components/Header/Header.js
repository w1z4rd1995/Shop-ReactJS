import { observer } from "mobx-react-lite";
import { store } from "../../stores/AppStore";
import { NavLink } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import logo from "../images/footerLogo.PNG";
import SearchIcon from "@mui/icons-material/Search";
import { SearchedProducts } from "../SearchedProducts/SearchedProducts";
import { Input } from "antd";
import { useState } from "react";
import "./Header.css";

export const Header = observer(() => {
    const [searchInputValue, setSearchInputValue] = useState("");
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const onSearchClick = () => {
        findObj();
        if (isMenuOpened === false) {
            setIsMenuOpened(true);
        } else if (isMenuOpened === true) {
            setIsMenuOpened(false);
        }
    };

    const onChangeSearch = (e) => {
        setSearchInputValue(e.target.value);
    };

    const findObj = () => {
        const div = document.getElementById("root");
        div.addEventListener("click", function eventHandler(event) {
            const target = event.target;
            if (isMenuOpened === false) {
                if (target.className !== "menuContainer") {
                    div.removeEventListener("click", eventHandler);
                    setIsMenuOpened(false);
                }
            }
        });
    };

    const debounce =
        (func, delay, timeout = 0) =>
        (args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(args), delay);
        };
    return (
        <div className="header">
            <div className="headerLogo">
                <img className="headerLogoStyle" src={logo} />
            </div>
            <div className="headerLinks">
                <div>
                    <NavLink to="/">Главная</NavLink>
                </div>

                <div>
                    <NavLink to="/products">Товары</NavLink>
                </div>
                <div>
                    <div className="cartStyle">
                        <NavLink to="/cart">Корзина</NavLink>
                    </div>
                    {store.cartCount !== 0 ? (
                        <div className="cartCount">{store.cartCount}</div>
                    ) : (
                        ""
                    )}
                </div>
                <div>
                    <NavLink to="/contacts">Контакты</NavLink>
                </div>
            </div>

            <div className="headerSearchStyle" id="menu">
                <div>
                    <SearchIcon fontSize="large" />
                </div>
                <div className="searchInput">
                    <Input
                        placeholder="Поиск по товарам"
                        allowClear
                        onChange={debounce(onChangeSearch, 400)}
                        onClick={onSearchClick}
                    />
                    {isMenuOpened && (
                        <div className="headerSearchMenu">
                            <div>
                                <SearchedProducts
                                    searchValue={searchInputValue}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="headerInfo">
                <div className="headerPhone">
                    <div>
                        <CallIcon fontSize="medium" />
                    </div>
                    <div>+7(495)4958800</div>
                </div>
                <div className="headerMail">
                    <div>
                        <MailOutlineIcon fontSize="medium" />
                    </div>
                    <div>sobaka@mail.ru</div>
                </div>
                <div>Режим работы: 8:00 - 23:00</div>
            </div>
        </div>
    );
});
