import { createContext } from "react";
import { makeAutoObservable, toJS } from "mobx";
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
        isCart,
        cartQuantity,
        totalPrice
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.isCart = isCart;
        this.cartQuantity = cartQuantity;
        this.totalPrice = price;
    }
}

export class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    ApiData = [];

    allImages = [];

    Categories = [];
    categoryFilter = [];
    filterProducts = [];
    currentCategory = [];

    cartProduct = [];

    oneNewItem = {};

    IsReady = false;

    minPrice;
    maxPrice;

    fetchData = async () => {
        const api_url = "https://fakestoreapi.com/products";
        // const api_url = "https://api.escuelajs.co/api/v1/products";
        const response = await axios.get(api_url);
        const tempApiData = response.data;

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
                    (item.isCart = false),
                    (item.cartQuantity = 1)
                )),
                this.ApiData.push(this.oneNewItem)
            )
        );

        const temp = this.ApiData.map((item) => item.category);

        this.allImages = this.ApiData.map((item) => item.image);
        // console.log(this.allImages);

        this.Categories = [...new Set(temp)];

        this.categoryFilter = this.Categories.map((category) => {
            return { category, isSelected: false };
        });

        // this.filterProducts = [...this.ApiData];
        // console.log(this.categoryFilter);

        store.findMinMaxPrice();
    };

    setCategoryFilter(categoryItem) {
        if (categoryItem.isSelected === false) {
            this.categoryFilter = this.categoryFilter.map((item) => {
                if (item.category === categoryItem.category) {
                    return { ...item, isSelected: true };
                } else return { ...item };
            });
        } else if (categoryItem.isSelected === true) {
            this.categoryFilter = this.categoryFilter.map((item) => {
                if (item.category === categoryItem.category) {
                    return { ...item, isSelected: false };
                } else return { ...item };
            });
        }

        this.currentCategory = this.categoryFilter.filter(
            (item) => item.isSelected === true
        );

        let tempFilterProduct = [];
        this.currentCategory.map((item) => {
            console.log(this.currentCategory);
            // console.log(item);

            this.ApiData.map((product) => {
                if (item.category === product.category) {
                    tempFilterProduct.push({ ...product });
                    console.log(tempFilterProduct);
                }
                this.filterProducts = tempFilterProduct;
                // console.log(tempFilterProduct);
            });
        });
        console.log(this.ApiData);
        console.log(this.filterProducts);
    }

    setIsReady(value) {
        store.IsReady = value;
    }
    findMinMaxPrice() {
        const minPriceItem = this.ApiData.reduce((first, second) =>
            first.price > second.price ? second : first
        );
        const maxPriceItem = this.ApiData.reduce((first, second) =>
            first.price < second.price ? second : first
        );
        this.minPrice = minPriceItem.price;
        this.maxPrice = maxPriceItem.price;
    }

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
            if (first.rating > second.rating) {
                return 1;
            } else if (first.rating < second.rating) {
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

    setNewQuantity(id, quantity) {
        if (quantity > 0) {
            this.ApiData = this.ApiData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        cartQuantity: quantity,
                        totalPrice: item.price * quantity,
                    };
                } else return item;
            });
        }
    }
}
export const store = new AppStore();
export const StoreContext = createContext(store);
