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

    // cartProduct = { id: "name", op: 123 };
    cartProduct = [];

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

    sortingByPrice() {
        this.ApiData.sort((first, second) => {
            if (first.price > second.price) {
                return 1;
            } else if (first.price < second.price) {
                return -1;
            } else return 0;
        });
    }

    sortingByName() {
        this.ApiData.sort((first, second) => {
            const firstItem = first.title?.toLowerCase();
            const secondItem = second.title?.toLowerCase();

            if (firstItem > secondItem) {
                return 1;
            } else if (firstItem < secondItem) {
                return -1;
            } else return 0;
        });
    }

    sortingByRating() {
        this.ApiData.sort((first, second) => {
            if (first.rating.rate > second.rating.rate) {
                return 1;
            } else if (first.rating.rate < second.rating.rate) {
                return -1;
            } else return 0;
        });
    }

    addCart(item) {
        console.log(item);
        this.cartProduct.push(item);
    }

    deleteCartItem(id) {
        console.log("delete func");
        this.cartProduct = this.cartProduct.filter((item) => item.id !== id);
    }
}
export const store = new AppStore();
export const StoreContext = createContext(store);
