import { store } from "../../stores/AppStore";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import { ChooseProductList } from "../../components/ChooseProductList/ChooseProductList";
import "./Products.css";

export const Products = observer(() => {
    const [isLoading, setIsLoading] = useState(false);

    const onSliderChange = (event, newValue) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        store.setSliderValue(newValue);
        loadingHandler();
    };

    const loadingHandler = () => {
        if (isLoading === false) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
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
                                    {store.sliderValue && (
                                        <Slider
                                            style={{ color: "orange" }}
                                            key={`slider-${store.sliderValue}`}
                                            min={store.minPrice}
                                            max={store.maxPrice}
                                            defaultValue={store.sliderValue}
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
                                    <h3>Категория</h3>
                                </div>
                                <div className="filtersCategoryItem">
                                    {store.categoryFilter.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <Checkbox
                                                    sx={{
                                                        color: "orange",
                                                        "&.Mui-checked": {
                                                            color: "orange",
                                                        },
                                                    }}
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
                                                            window.scrollTo({
                                                                top: 0,
                                                                left: 0,
                                                                behavior:
                                                                    "smooth",
                                                            });
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
                                                            window.scrollTo({
                                                                top: 0,
                                                                left: 0,
                                                                behavior:
                                                                    "smooth",
                                                            });
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
                            sx={{
                                color: "orange",
                                "&.Mui-checked": {
                                    color: "orange",
                                },
                            }}
                            checked={store.isChecked.price}
                            onChange={() => {
                                loadingHandler();
                                if (store.isChecked.price === false) {
                                    store.setIsChecked("price", true);
                                    store.sortingByPrice();
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
                            sx={{
                                color: "orange",
                                "&.Mui-checked": {
                                    color: "orange",
                                },
                            }}
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
                            sx={{
                                color: "orange",
                                "&.Mui-checked": {
                                    color: "orange",
                                },
                            }}
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
                                style={{
                                    width: 70,
                                    height: 70,
                                    color: "orange",
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    );
});
