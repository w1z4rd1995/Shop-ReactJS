import { store } from "../../stores/AppStore";
import { OneProduct } from "../OneProduct/OneProduct";
import { observer } from "mobx-react-lite";
import "./ChooseProductList.css";

export const ChooseProductList = observer(() => {
    if (
        store.currentCategory.length === 0 &&
        store.currentSorting.length === 0
    ) {
        store.setFilterProducts();
        let count = 0;
        const mainList = store.ApiData.map((item) => {
            if (
                item.price >= store.sliderValue[0] &&
                item.price <= store.sliderValue[1]
            ) {
                count += 1;
                return (
                    <div className="oneProduct" key={item.id}>
                        <OneProduct Item={item} />
                    </div>
                );
            }
        });
        if (count) {
            return mainList;
        } else if (count === 0) {
            return (
                <div className="emptyList">
                    Ничего не найдено...Попробуйте изменить фильтры
                </div>
            );
        }
    } else {
        let count = 0;
        const filterList = store.filterProducts.map((item) => {
            if (
                item.price >= store.sliderValue[0] &&
                item.price <= store.sliderValue[1]
            ) {
                count += 1;
                return (
                    <div className="oneProduct" key={item.id}>
                        <OneProduct Item={item} />
                    </div>
                );
            }
        });
        if (count) {
            return filterList;
        } else if (count === 0) {
            return (
                <div className="emptyList">
                    Ничего не найдено...Попробуйте изменить фильтры
                </div>
            );
        }
    }
});
