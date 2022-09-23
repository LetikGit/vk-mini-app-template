import {makeAutoObservable} from "mobx";
import {VKCOM} from "@vkontakte/vkui";

class AppConfigStore {
    platform = "";

    constructor() {
        makeAutoObservable(this)
    }

    setPlatform(value) {
        this.platform = value;
        if (value === VKCOM) {
            this.isDesktop = true;
        }
    }
}

export default new AppConfigStore()