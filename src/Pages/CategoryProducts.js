import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";

export const CategoryProducts = () => {
    const params = useParams();
    console.log(params);
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
                {store.ApiData.map((item) => {
                    if (item.category === params.categoryName) {
                        return <OneProduct Item={item} />;
                    }
                })}
            </div>
        </div>
    );
};
