// import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";

export const Products = observer(() => {
    const [isChecked, setIsChecked] = useState({
        price: false,
        name: false,
        rating: false,
    });

    // const [sliderValueMin, setSliderValueMin] = useState(0);
    const [sliderValueChanged, setSliderValueChange] = useState([0, 1000]);
    // console.log("123");

    const onSliderChange = (event, newValue) => {
        setSliderValueChange(newValue);
        console.log(newValue);

        console.log("changed mouseUp");
    };

    useEffect(() => {
        if (store.IsReady === false) {
            store.fetchData();
            console.log("зашел фетч");
            store.IsReady = true;
        }
    }, []);
    return (
        store.IsReady &&
        store.ApiData && (
            <div className="productContainer">
                <div className="filters">
                    <div>
                        <h4>Фильтры</h4>
                    </div>
                    <div>Цена</div>
                    <div className="inputStyle"></div>
                    <div>
                        <div>от</div>

                        <div>до</div>
                    </div>

                    <div className="sliderStyle">
                        <Slider
                            min={0}
                            max={1000}
                            defaultValue={[200, 500]}
                            // value={setValue}
                            valueLabelDisplay="auto"
                            disableSwap
                            step={5}
                            onChangeCommitted={onSliderChange}
                        />
                    </div>
                    {/* <div className="filterButtonStyle">
                        <input
                            className="filterButton"
                            type="button"
                            value="Применить"
                        />
                    </div> */}
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
                    {store.ApiData.map((item) => {
                        return (item.price >= sliderValueChanged[0]) &
                            (item.price <= sliderValueChanged[1]) ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={item.id}
                            >
                                <OneProduct Item={item} />
                            </motion.div>
                        ) : (
                            ""
                        );
                    })}
                </div>
            </div>
        )
    );
});
