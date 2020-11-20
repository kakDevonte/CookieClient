import {makeObservable, observable} from "mobx";

class AppStore {

    version = 1;

    constructor (store) {
        makeObservable(this, {
            version: observable
        });
        this.store = store;
    }
}

export default AppStore
