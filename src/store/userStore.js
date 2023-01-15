import { makeAutoObservable } from "mobx";


class User {

    user = {};
    isAuthorized = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuthorize = (flag) => {
        this.isAuthorized = flag;
        console.log('authorize');
        console.log(this.isAuthorized);
    }

}

export const userStore = new User();