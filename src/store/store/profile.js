import {action, makeObservable, observable} from "mobx";

class ProfileStore {

    _state = '';
    _data = {};
    _myProfile = true;
    _error = false;

    constructor(store){
        makeObservable(this, {
            _state: observable,
            _error: observable,
            _data: observable,

            setState: action,
            setMyProfile: action,
        });
        this._store = store;
    }

    get state() { return this._state; }
    get myProfile() { return this._myProfile; }
    get data() { return this._data; }
    get error() { return this._error; }


    setState(state) {
        if(state === this._state) return;
        this._state = state;
    }

    setMyProfile(myProfile) {
        this._myProfile = myProfile;
    }

    setData(data) {
        this._data = data;
    }

    setError(error) {
        if(error === this._error) return;
        this._error = error;
    }

    toggleProfile() {
        if(this._state === '') {
            this.setState(' opened');
        }else if(this._state === ' opened') {
            this.setState('');
            this.setError(false);
        }
    }

    toggleMyProfile(flag) {
        this.setMyProfile(flag);
    }

}

export default ProfileStore;