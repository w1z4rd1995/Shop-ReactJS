// import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import { ChooseProductList } from "./ChooseProductList";

export const Products = observer(() => {
    const onSliderChange = (event, newValue) => {
        store.setSliderValue(newValue);
        loadingHandler();
    };

    const [isLoading, setIsLoading] = useState(false);
    console.log(store.sliderValue);

    const loadingHandler = () => {
        if (isLoading === false) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    return (
        store.IsReady &&
        store.ApiData && (
            <div className="productContainer">
                <div className="filters">
                    <div>
                        <div className="filtersHeader">
                            <h2>Фильтры</h2>{" "}
                        </div>

                        <div className="allFilters">
                            <div>
                                <div className="priceHeader">
                                    <h3>Цена</h3>
                                </div>
                                <div className="inputStyle"></div>

                                <div className="sliderStyle">
                                    {store.minPrice && store.maxPrice && (
                                        <Slider
                                            key={`slider-${store.sliderValue}`}
                                            // color="black"
                                            min={store.minPrice}
                                            max={store.maxPrice}
                                            defaultValue={
                                                store.sliderValue[0] ===
                                                    store.minPrice &&
                                                store.sliderValue[1] ===
                                                    store.maxPrice
                                                    ? [
                                                          store.minPrice,
                                                          store.maxPrice,
                                                      ]
                                                    : store.sliderValue
                                            }
                                            // value={setValue}
                                            valueLabelDisplay="auto"
                                            disableSwap
                                            step={5}
                                            onChangeCommitted={onSliderChange}
                                        />
                                    )}
                                </div>
                                <div className="minMaxPrices">
                                    {store.sliderValue[0]} $ -{" "}
                                    {store.sliderValue[1]} $
                                </div>
                            </div>

                            <div>
                                <div className="categoryHeader">
                                    <h3>Категория</h3>{" "}
                                </div>
                                <div className="filtersCategoryItem">
                                    {store.categoryFilter.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <Checkbox
                                                    checked={item.isSelected}
                                                    onChange={() => {
                                                        loadingHandler();
                                                        if (
                                                            item.isSelected ===
                                                            false
                                                        ) {
                                                            store.setCategoryFilter(
                                                                item
                                                            );
                                                            store.clearFilterProducts();
                                                            store.filterList();
                                                            store.chooseSorting();
                                                        } else if (
                                                            item.isSelected ===
                                                            true
                                                        ) {
                                                            store.setCategoryFilter(
                                                                item
                                                            );
                                                            store.setFilterProducts();
                                                            store.filterList();
                                                            store.chooseSorting();
                                                        }
                                                    }}
                                                />
                                                {item.category}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sorting">
                    Сортировать по:
                    <div>
                        <Checkbox
                            checked={store.isChecked.price}
                            onChange={() => {
                                loadingHandler();
                                if (store.isChecked.price === false) {
                                    store.setIsChecked("price", true);

                                    store.sortingByPrice();

                                    // store.chooseSorting();
                                } else if (store.isChecked.price === true) {
                                    store.setIsChecked("price", false);
                                    store.filterList();
                                }
                            }}
                        />
                        Цене
                    </div>
                    <div>
                        <Checkbox
                            checked={store.isChecked.name}
                            onChange={() => {
                                loadingHandler();
                                if (store.isChecked.name === false) {
                                    store.setIsChecked("name", true);
                                    store.filterList();

                                    store.sortingByName();
                                } else if (store.isChecked.name === true) {
                                    store.setIsChecked("name", false);
                                    store.filterList();
                                }
                            }}
                        />
                        Наименованию
                    </div>
                    <div>
                        <Checkbox
                            checked={store.isChecked.rating}
                            onChange={() => {
                                loadingHandler();
                                if (store.isChecked.rating === false) {
                                    store.setIsChecked("rating", true);

                                    store.sortingByRating();
                                } else if (store.isChecked.rating === true) {
                                    store.setIsChecked("rating", false);
                                    store.filterList();
                                }
                            }}
                        />
                        Рейтингу
                    </div>
                </div>
                <div className="productsList">
                    {isLoading === false ? (
                        <div className="products">
                            <ChooseProductList />
                        </div>
                    ) : (
                        <div className="loadingStyle">
                            <CircularProgress
                                style={{ width: 70, height: 70 }}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    );
});
