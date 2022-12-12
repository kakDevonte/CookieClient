import {action, makeObservable, observable} from "mobx";

class ShopStore {

    _state = '';
    _error = false;

    constructor(store){
        makeObservable(this, {
            _state: observable,
            _error: observable,

            setState: action,
        });
        this._store = store;
    }

    get state() { return this._state; }
    get error() { return this._error; }


    setState(state) {
        if(state === this._state) return;
        this._state = state;
    }

    setError(error) {
        if(error === this._error) return;
        this._error = error;
    }

    toggleShopPanel() {
        if(this._state === '') {
            this.setState(' opened');
        }else if(this._state === ' opened') {
            this.setState('');
            this.setError(false);
        }
    }
}

export default ShopStore;