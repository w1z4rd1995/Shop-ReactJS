import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import axios from "axios";

export class AppStore {
    ApiData = {};
    storeCategories = [];
    constructor() {
        makeAutoObservable(this);
    }

    fetchData = async () => {
        const api_url = "https://fakestoreapi.com/products";
        const response = await axios.get(api_url);
        this.ApiData = response.data;

        const temp = this.ApiData.map((item) => item.category);
        this.storeCategories = [...new Set(temp)];
        // console.log(this.ApiData);
        // console.log(this.storeCategories);
    };
}
export const store = new AppStore();
export const StoreContext = createContext(store);
