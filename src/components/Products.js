// import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect } from "react";

export const Products = () => {
    useEffect(() => {
        if (store.IsReady === false) {
            store.fetchData();
            console.log("зашел фетч");
        }
    }, []);
    return (
        <div className="productContainer">
            <div className="filters">
                filter
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
            <div className="sorting">sorting</div>
            <div className="products">
                {store.ApiData &&
                    store.ApiData.map((item) => {
                        return (
                            <div key={item.id}>
                                <OneProduct Item={item} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
