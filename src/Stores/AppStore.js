import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import axios from "axios";

export class OneProductDescription {
    constructor(
        id,
        title,
        category,
        price,
        rating,
        image,
        description,
        isCart
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.isCart = isCart;
    }
}

export class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    ApiData = [];
    Categories = [];
    IsReady = false;

    // cartProduct = { id: "name", op: 123 };
    cartProduct = [];
    oneNewItem = {};

    fetchData = async () => {
        const api_url = "https://fakestoreapi.com/products";
        const response = await axios.get(api_url);
        const tempApiData = response.data;
        if (tempApiData !== {}) {
            this.IsReady = true;
        }
        tempApiData.map(
            (item) => (
                (this.oneNewItem = new OneProductDescription(
                    item.id,
                    item.title,
                    item.category,
                    item.price,
                    item.rating.rate,
                    item.image,
                    item.description,
                    (item.isCart = false)
                )),
                this.ApiData.push(this.oneNewItem)
            )
        );

        const temp = this.ApiData.map((item) => item.category);
        this.Categories = [...new Set(temp)];
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

    addCart(id) {
        this.ApiData = this.ApiData.map((item) => {
            if (item.id === id) {
                return { ...item, isCart: true };
            } else return item;
        });
    }

    deleteCartItem(id) {
        this.ApiData = this.ApiData.map((item) => {
            if (item.id === id) {
                return { ...item, isCart: false };
            } else return item;
        });
    }
}
export const store = new AppStore();
export const StoreContext = createContext(store);
