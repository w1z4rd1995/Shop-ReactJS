import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../Stores/AppStore";
import { Routes, Route, Link } from "react-router-dom";

export const Catalog = observer(() => {
    // console.log(store.ApiData);
    // console.log(store.storeCategories);
    const store = useContext(StoreContext);

    useEffect(() => {
        store.fetchData();
        console.log("зашел фетч");
    }, []);

    return (
        <div className="catalogContent">
            {store.ApiData &&
                store.storeCategories.map((item, index) => (
                    <div key={index}>
                        <Link to={`${item}`}>{item} </Link>
                    </div>
                ))}
        </div>
    );
});
