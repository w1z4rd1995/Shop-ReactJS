import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
export const ChooseProductList = observer(() => {
    const [sliderValueChange, setSliderValueChange] = useState([]);

    if (
        store.currentSorting.length === 0 &&
        store.currentCategory.length === 0
    ) {
        console.log("apidata");
        return store.ApiData.map((item) => {
            return (
                <div key={item.id}>
                    <OneProduct Item={item} />
                </div>
            );
        });
    }

    if (store.currentCategory.length !== 0) {
        console.log("filter");
        return store.filterProducts.map((item) => {
            return (
                <div key={item.id}>
                    <OneProduct Item={item} />
                </div>
            );
        });
    }

    if (
        store.currentSorting.length !== 0 &&
        store.currentCategory.length === 0
    ) {
        console.log("sorting");
        return store.sortingData.map((item) => {
            return (
                <div key={item.id}>
                    <OneProduct Item={item} />
                </div>
            );
        });
    }
});
