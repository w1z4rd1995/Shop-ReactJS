import { createContext } from "react";
import { makeAutoObservable, toJS } from "mobx";
import axios from "axios";
import { Api } from "@mui/icons-material";

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

    Categories = [];
    categoryFilter = [];
    sortingData = [];
    filterProducts = [];
    currentCategory = [];
    cartProduct = [];
    users = [];
    oneNewItem = {};

    cartCount = 0;

    IsReady = false;
    isChecked = { price: false, name: false, rating: false };
    currentSorting = [];
    minPrice;
    maxPrice;
    sliderValue = [];
    tempSliderValue = [];
    defaultSliderValue = [];
    visibleItems;
    invisibleItems;

    fetchData = async () => {
        const api_url = "https://fakestoreapi.com/products";

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
                this.createData(this.oneNewItem)
            )
        );

        const temp = this.ApiData.map((item) => item.category);
        this.allImages = this.ApiData.map((item) => item.image);
        this.Categories = [...new Set(temp)];
        this.categoryFilter = this.Categories.map((category) => {
            return { category, isSelected: false };
        });

        store.findMinMaxPrice();
        store.setSliderValue([store.minPrice, store.maxPrice]);
    };
    createData(item) {
        this.ApiData.push(item);
    }

    findCartCount() {
        let count = 0;
        store.ApiData.map((item) => {
            if (item.isCart === true) {
                count = count + item.cartQuantity;
            }
            this.cartCount = count;
        });
    }
    setVisibleItems = (value) => {
        this.visibleItems = 0;

        if (value === "visible") {
            this.visibleItems = this.visibleItems + 1;
        }

        console.log(this.visibleItems);
    };

    setItemQuantity(id) {
        store.ApiData.map((item) => {
            if (item.id === id) {
                return (item.cartQuantity = 1);
            }
        });
    }

    setSliderValue(newValue) {
        if (
            newValue[0] === this.defaultSliderValue[0] &&
            newValue[1] === this.defaultSliderValue[1]
        ) {
            this.sliderValue = [this.minPrice, this.maxPrice];
        } else this.sliderValue = newValue;
    }

    fetchDataUsers = async () => {
        const api_url = "https://reqres.in/api/users";
        const response = await axios.get(api_url);
        this.users = response.data.data;
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
    }
    setFilterProducts() {
        this.filterProducts = [...this.ApiData];
    }
    clearFilterProducts() {
        this.filterProducts = [];
    }

    filterList() {
        this.currentCategory = this.categoryFilter.filter(
            (item) => item.isSelected === true
        );

        let tempFilterProduct = [];
        this.currentCategory.map((item) => {
            this.ApiData.map((product) => {
                if (item.category === product.category) {
                    tempFilterProduct.push({ ...product });
                }

                if (this.currentCategory.length !== 0) {
                    this.filterProducts = tempFilterProduct;
                }
            });
        });
    }
    setIsChecked(sortingName, value) {
        this.currentSorting = [];
        if (sortingName === "price" && value === true) {
            this.isChecked = { price: true, name: false, rating: false };
            this.currentSorting.push("price");
        } else if (sortingName === "price" && value === false) {
            this.isChecked = { price: false, name: false, rating: false };
            this.currentSorting = [];
        }

        if (sortingName === "name" && value === true) {
            this.isChecked = { price: false, name: true, rating: false };
            this.currentSorting.push("name");
        } else if (sortingName === "name" && value === false) {
            this.isChecked = { price: false, name: false, rating: false };
            this.currentSorting = [];
        }

        if (sortingName === "rating" && value === true) {
            this.isChecked = { price: false, name: false, rating: true };
            this.currentSorting.push("rating");
        } else if (sortingName === "rating" && value === false) {
            this.isChecked = { price: false, name: false, rating: false };
            this.currentSorting = [];
        }
    }

    chooseSorting() {
        if (this.currentSorting[0] === "price") {
            this.sortingByPrice();
        }
        if (this.currentSorting[0] === "name") {
            this.sortingByName();
        }
        if (this.currentSorting[0] === "rating") {
            this.sortingByRating();
        }
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
        this.defaultSliderValue = [this.minPrice, this.maxPrice];
        console.log(this.defaultSliderValue);
    }

    sortingByPrice() {
        this.filterProducts.sort((first, second) => {
            if (first.price > second.price) {
                return 1;
            } else if (first.price < second.price) {
                return -1;
            } else return 0;
        });
    }

    sortingByName() {
        this.filterProducts.sort((first, second) => {
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
        this.filterProducts.sort((first, second) => {
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
        this.sortingData = this.sortingData.map((item) => {
            if (item.id === id) {
                return { ...item, isCart: true };
            } else return item;
        });
        this.filterProducts = this.filterProducts.map((item) => {
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
        this.sortingData = this.sortingData.map((item) => {
            if (item.id === id) {
                return { ...item, isCart: false };
            } else return item;
        });
        this.filterProducts = this.filterProducts.map((item) => {
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
