import { makeAutoObservable } from "mobx";


class Cart {
    isShow = false;
    products = [];
    orderCode = null;

    constructor() {
        makeAutoObservable(this);
        if(localStorage.getItem('cart')) this.products = JSON.parse(localStorage.getItem('cart'));
    }

    __saveToLocalStorage = () => {
        let data = JSON.stringify(this.products);
        localStorage.setItem('cart', data);
    }

    toogleState = () => {
        this.isShow = ! this.isShow;
    }

    stateOff = () => {
        this.isShow = false;
    }

    addProduct = (product) => {
        let isExist = ~this.products.findIndex(e => e.id == product.id);
        if(! isExist) this.products.push({...product, count: 1});
        this.__saveToLocalStorage();
    }

    get Count() {
        return this.products.length;
    }

    get subtotal() {
        let total = this.products.reduce((prev, current) => prev + current.count * Number(current.price), 0);
        return total
    }

    get productsForOrder() {
        const arr = [];
        this.products.forEach(e => arr.push({'product': e.id, 'quantity': e.count}));

        return arr;
    }

    incCount = (id) => {
        const product = this.products.find(e => e.id == id);
        product.count++;
        this.__saveToLocalStorage();
    }

    decCount = (id) => {
        const product = this.products.find(e => e.id == id);
        if(product.count > 1) product.count--;
        this.__saveToLocalStorage();
    }

    removeProduct = (id) => {
        this.products = this.products.filter(e => e.id != id);
        this.__saveToLocalStorage()
    }

    error = (id, key, obj) => {
        const product = this.products.find(e => e.id == id);
        product.errors = obj;
        console.log('=1=');
        console.log(this.products);
    }

    setOrderCode = (code) => {
        this.orderCode = code;
    }

    clearProductsOrder = () => {
        this.products = [];
        this.__saveToLocalStorage()
    }


}

export const cartStore = new Cart();