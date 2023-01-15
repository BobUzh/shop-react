import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { getProducts } from '../api/Product';

class Product {
    __perPage = 8
    
    isLoading = false;
    products = [];
    count = 0;
    category_slug = null;
    filter = '';
    searchParams;

    constructor() {
        makeAutoObservable(this);
        this.searchParams = new URLSearchParams({'limit': this.__perPage});
    }

    loadProducts = async () => {
        console.log('load Products');
        this.setLoader(true);
        console.log(this.searchParams.toString());
        const result = await getProducts(this.searchParams.toString());
        this.products = result.data.results;
        this.count = result.data.count;
        this.setLoader(false);
    }

    get countOfPages() {
        console.log('cache Count of page');
        return Math.ceil(this.count/this.__perPage);
    }

    setLoader = (flag) => {
        this.isLoading = flag;
    }

    setCategory = (slug) => {
        console.log('slug', slug);
        this.category_slug = slug;
        this.searchParams.set('category_slug', slug);
        this.searchParams.set('offset', 0);
        this.searchParams.delete('specifications[]');
        this.filter = this.searchParams.toString()
    }

    setOffset = (page) => {
        console.log('pagep', page);
        let offset =  (page - 1) * this.__perPage;
        this.searchParams.set('offset', offset);
        this.filter = this.searchParams.toString()
    }

    setFilter = (filter) => {
        this.searchParams.set('offset', 0);
        this.searchParams.delete('specifications[]');

        if (Object.keys(filter).length) {
            for (const [_, value] of Object.entries(filter)) {
                this.searchParams.append('specifications[]', value)
            }
        }
        this.filter = this.searchParams.toString()
        console.log('filter', this.filter);
    }
}

export const productStore =  new Product();