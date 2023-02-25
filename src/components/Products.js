// import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";

export const Products = observer(() => {
    const [isChecked, setIsChecked] = useState({
        price: false,
        name: false,
        rating: false,
    });

    const [sliderValue, setSliderValue] = useState([
        store.minPrice,
        store.maxPrice,
    ]);
    console.log(store.minPrice);
    console.log(store.maxPrice);
    console.log(sliderValue[0]);

    // console.log(sliderValue);
    const onSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    useEffect(() => {
        if (store.IsReady === false) {
            store.fetchData();
        }
    }, []);

    return (
        <div className="productContainer">
            <div className="filters">
                <div>
                    <h4>Фильтры</h4>
                </div>
                <div>Цена</div>
                <div className="inputStyle">
                    <input
                        className="inputMin"
                        type="number"
                        // defaultValue={sliderValue[0]}
                        value={sliderValue[0]}
                    />
                    <input
                        className="inputMax"
                        type="number"
                        value={sliderValue[1]}
                    />
                </div>
                <div>
                    <div>от</div>

                    <div>
                        <div>до</div>
                    </div>
                </div>

                <div className="sliderStyle">
                    <Slider
                        // min={store.minPrice}
                        max={store.maxPrice}
                        value={sliderValue}
                        valueLabelDisplay="auto"
                        onChange={onSliderChange}
                        disableSwap
                        step={100}
                    />
                </div>
                <div className="filterButtonStyle">
                    <input
                        className="filterButton"
                        type="button"
                        value="Применить"
                    />
                </div>
            </div>
            <div className="sorting">
                Сортировать по:
                <div>
                    <Checkbox
                        checked={isChecked.price}
                        onChange={() => {
                            if (!isChecked.price) {
                                store.sortingByPrice();
                            }
                            setIsChecked({
                                price: !isChecked.price,
                                name: false,
                                rating: false,
                            });
                        }}
                    />
                    Цене
                </div>
                <div>
                    <Checkbox
                        checked={isChecked.name}
                        onChange={() => {
                            setIsChecked({
                                name: !isChecked.name,
                                price: false,
                                rating: false,
                            });
                            if (!isChecked.name) {
                                store.sortingByName();
                            }
                        }}
                    />
                    Наименованию
                </div>
                <div>
                    <Checkbox
                        checked={isChecked.rating}
                        onChange={() => {
                            setIsChecked({
                                rating: !isChecked.rating,
                                name: false,
                                price: false,
                            });
                            if (!isChecked.rating) {
                                store.sortingByRating();
                            }
                        }}
                    />
                    Рейтингу
                </div>
            </div>
            <div className="products">
                {store.IsReady &&
                    store.ApiData.map((item) => {
                        return item.price >= sliderValue[0] &&
                            item.price <= sliderValue[1] ? (
                            <div key={item.id}>
                                <OneProduct Item={item} />
                            </div>
                        ) : (
                            ""
                        );
                    })}
            </div>
        </div>
    );
});
