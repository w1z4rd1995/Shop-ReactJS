import { store } from "../Stores/AppStore";
import { OneProduct } from "../components/OneProduct";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react-lite";
export const ChooseProductList = observer(() => {
    if (
        store.currentCategory.length === 0 &&
        store.currentSorting.length === 0
    ) {
        store.setFilterProducts();

        return store.ApiData.map((item) => {
            if (
                item.price >= store.sliderValue[0] &&
                item.price <= store.sliderValue[1]
            ) {
                return (
                    <div key={item.id}>
                        <OneProduct Item={item} />
                    </div>
                );
            }
        });
    } else {
        return store.filterProducts.map((item) => {
            if (
                item.price >= store.sliderValue[0] &&
                item.price <= store.sliderValue[1]
            ) {
                return (
                    <div key={item.id}>
                        <OneProduct Item={item} />
                    </div>
                );
            }
        });
    }
});
