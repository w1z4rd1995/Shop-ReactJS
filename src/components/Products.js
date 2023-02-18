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

    const [sliderValue, setSliderValue] = useState([0, 100]);
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
                <div>Фильтры:</div>
                <div>
                    Цена
                    <Slider
                        value={sliderValue}
                        valueLabelDisplay="auto"
                        onChange={onSliderChange}
                        disableSwap
                    />
                </div>
            </div>
            <div className="sorting">
                Сортировать по:
                <div>
                    <Checkbox
                        checked={isChecked[0]}
                        onChange={(event) => {
                            setIsChecked({ price: event.target.checked });
                            if (event.target.checked === true) {
                                store.sortingByPrice();
                            }
                        }}
                    />
                    Цене
                </div>
                <div>
                    <Checkbox
                        checked={isChecked[1]}
                        onChange={(event) => {
                            setIsChecked({ name: event.target.checked });
                            if (event.target.checked === true) {
                                store.sortingByName();
                            }
                        }}
                    />
                    Наименованию
                </div>
                <div>
                    <Checkbox
                        checked={isChecked[2]}
                        onChange={(event) => {
                            setIsChecked({ rating: event.target.checked });
                            if (event.target.checked === true) {
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
                        return (
                            <div key={item.id}>
                                <OneProduct Item={item} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
});
