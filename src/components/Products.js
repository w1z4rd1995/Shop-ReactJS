// import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";

export const Products = observer(() => {
    const [isChecked, setIsChecked] = useState({
        price: false,
        name: false,
        rating: false,
    });

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
                        <h2>Фильтры</h2>
                    </div>
                    <h3>Цена</h3>
                    <div className="inputStyle"></div>
                    <div>
                        <div>от</div>

                        <div>до</div>
                    </div>

                    <div className="sliderStyle">
                        {store.minPrice && store.maxPrice && (
                            <Slider
                                // color="black"
                                min={store.minPrice}
                                max={store.maxPrice}
                                defaultValue={[store.minPrice, store.maxPrice]}
                                // value={setValue}
                                valueLabelDisplay="auto"
                                disableSwap
                                step={5}
                                onChangeCommitted={onSliderChange}
                            />
                        )}
                    </div>
                    <div>
                        <h3>Категория</h3>
                        <div>
                            {store.categoryFilter.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <Checkbox
                                            checked={item.isSelected}
                                            onChange={() => {
                                                loadingHandler();
                                                store.setCategoryFilter(item);
                                            }}
                                        />
                                        {item.category}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="sorting">
                    Сортировать по:
                    <div>
                        <Checkbox
                            checked={isChecked.price}
                            onChange={() => {
                                loadingHandler();
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
                                loadingHandler();
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
                                loadingHandler();
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
                <div className="productsList">
                    {isLoading === false ? (
                        <div className="products">
                            {store.ApiData && store.currentCategory.length !== 0
                                ? store.filterProducts.map((item) => {
                                      if (
                                          item.price > sliderValueChange[0] &&
                                          item.price < sliderValueChange[1]
                                      )
                                          return (
                                              <div key={item.id}>
                                                  <OneProduct Item={item} />
                                              </div>
                                          );
                                  })
                                : store.ApiData.map((item) => {
                                      if (
                                          item.price > sliderValueChange[0] &&
                                          item.price < sliderValueChange[1]
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
