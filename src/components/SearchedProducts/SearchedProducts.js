import { observer } from "mobx-react-lite";
import { store } from "../../stores/AppStore";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SearchedProducts.css";

export const SearchedProducts = observer((props) => {
    const navigate = useNavigate();

    const searchedItems = store.ApiData.filter((item) =>
        item.title?.toLowerCase().includes(props.searchValue)
    );

    return (
        <div className="menuContainer">
            {searchedItems.length !== 0 ? (
                searchedItems.map((item) => {
                    return (
                        <div
                            className="searchedItem"
                            onClick={() => navigate(`/products/${item.id}`)}
                            key={item.id}
                        >
                            <div className="oneSearchedItem">
                                <div>
                                    <img
                                        className="searchedItemImage"
                                        src={item.image}
                                    />
                                </div>
                                <div className="searchedItemTitle">
                                    <NavLink to={`/products/${item.id}`}>
                                        {item.title}
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>Ничего не найдено</div>
            )}
        </div>
    );
});
