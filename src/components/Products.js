// import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";

export const Products = observer(() => {
    const [sliderValueChange, setSliderValueChange] = useState([]);
    const onSliderChange = (event, newValue) => {
        setSliderValueChange(newValue);
        loadingHandler();
    };

    const [isLoading, setIsLoading] = useState(false);

    const loadingHandler = () => {
        if (isLoading === false) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    useEffect(() => {
        if (store.IsReady === false) {
            store.fetchData();
            console.log("зашел фетч");
            store.setIsReady(true);
        }
        console.log(store.minPrice);
        setSliderValueChange([store.minPrice, store.maxPrice]);
    }, [store.minPrice]);
    // console.log(sliderValueChange);

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
                                            // color="black"
                                            min={store.minPrice}
                                            max={store.maxPrice}
                                            defaultValue={[
                                                store.minPrice,
                                                store.maxPrice,
                                            ]}
                                            // value={setValue}
                                            valueLabelDisplay="auto"
                                            disableSwap
                                            step={5}
                                            onChangeCommitted={onSliderChange}
                                        />
                                    )}
                                </div>
                                <div className="minMaxPrices">
                                    {sliderValueChange[0]} $ -{" "}
                                    {sliderValueChange[1]} $
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
                                                        store.setCategoryFilter(
                                                            item
                                                        );
                                                        store.chooseSorting();
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
                                } else store.setIsChecked("price", false);
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
                                    store.sortingByName();
                                } else store.setIsChecked("name", false);
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
                                } else store.setIsChecked("rating", false);
                            }}
                        />
                        Рейтингу
                    </div>
                </div>
                <div className="productsList">
                    {isLoading === false ? (
                        <div className="products">
                            {store.ApiData && store.currentCategory.length !== 0
                                ? store.filterProducts.map((item) => {
                                      if (
                                          item.price >= sliderValueChange[0] &&
                                          item.price <= sliderValueChange[1]
                                      )
                                          return (
                                              <div key={item.id}>
                                                  <OneProduct Item={item} />
                                              </div>
                                          );
                                  })
                                : store.ApiData.map((item) => {
                                      if (
                                          item.price >= sliderValueChange[0] &&
                                          item.price <= sliderValueChange[1]
                                      ) {
                                          return (
                                              <div key={item.id}>
                                                  <OneProduct Item={item} />
                                              </div>
                                          );
                                      }
                                  })}
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
