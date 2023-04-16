import { observer } from "mobx-react-lite";
import { store } from "../Stores/AppStore";

export const SearchedProducts = observer((props) => {
    console.log(props.searchValue);
    const searchedItems = store.ApiData.filter((item) =>
        item.title?.toLowerCase().includes(props.searchValue)
    );
    return (
        <div>
            {searchedItems.map((item) => {
                return <div key={item.id}>{item.title}</div>;
            })}
        </div>
    );
});
