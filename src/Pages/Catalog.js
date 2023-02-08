import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../Stores/AppStore";
import { Link } from "react-router-dom";

export const Catalog = observer(() => {
    const store = useContext(StoreContext);

    useEffect(() => {
        if (store.IsReady === false) {
            store.fetchData();
            console.log("зашел фетч");
        }
    }, []);
    console.log(store.IsReady);
    return (
        <div className="catalogContent">
            {store.ApiData &&
                store.Categories.map((item, index) => (
                    <div key={index}>
                        <Link to={`${item}`}>{item} </Link>
                    </div>
                ))}
        </div>
    );
});
