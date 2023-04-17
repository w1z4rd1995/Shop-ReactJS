import { observer } from "mobx-react-lite";
import { store } from "../Stores/AppStore";
import { Link, NavLink } from "react-router-dom";

export const SearchedProducts = observer((props) => {
    console.log(props.searchValue);
    const searchedItems = store.ApiData.filter((item) =>
        item.title?.toLowerCase().includes(props.searchValue)
    );
    return (
        <div className="menuContainer">
            {searchedItems.length !== 0 ? (
                searchedItems.map((item) => {
                    return (
                        <div className="searchedItem" key={item.id}>
                            <div className="oneSearchedItem">
                                <div>
                                    <img
                                        className="searchedItemImage"
                                        src={item.image}
                                    />
                                </div>
                                <div className="searchedItemTitle">
                                    <NavLink to={`/products/${item.id}`}>
                                        {item.title}{" "}
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
