import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { observer } from "mobx-react-lite";

export const CategoryProducts = observer(() => {
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
                        console.log(item);
                        return (
                            <div key={item.id}>
                                <OneProduct Item={item} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
});
