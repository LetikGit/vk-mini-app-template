import {makeAutoObservable} from "mobx";

class UserStore {
    vk_data = {};

    constructor() {
        makeAutoObservable(this)
    }

    setVkData(value) {
        this.vk_data = value;
    }
}

export default new UserStore()