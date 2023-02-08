import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import axios from "axios";

export class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    ApiData = {};
    Categories = [];
    IsReady = false;

    fetchData = async () => {
        const api_url = "https://fakestoreapi.com/products";
        const response = await axios.get(api_url);
        this.ApiData = response.data;
        if (this.ApiData !== {}) {
            this.IsReady = true;
        }

        const temp = this.ApiData.map((item) => item.category);
        this.Categories = [...new Set(temp)];
        // console.log(this.ApiData);
        // console.log(this.storeCategories);
    };
}
export const store = new AppStore();
export const StoreContext = createContext(store);
