import { action, makeObservable, observable } from "mobx";

class ProfileStore {
  _state = "";
  _stateModal = "";
  _data = {};
  _myProfile = true;
  _error = false;

  constructor(store) {
    makeObservable(this, {
      _state: observable,
      _stateModal: observable,
      _error: observable,
      _data: observable,

      setState: action,
      setMyProfile: action,
    });
    this._store = store;
  }

  get state() {
    return this._state;
  }
  get stateModal() {
    return this._stateModal;
  }
  get myProfile() {
    return this._myProfile;
  }
  get data() {
    return this._data;
  }
  get error() {
    return this._error;
  }

  setState(state) {
    if (state === this._state) return;
    this._state = state;
  }

  setStateModal(state) {
    if (state === this._stateModal) return;
    this._stateModal = state;
  }

  setMyProfile(myProfile) {
    this._myProfile = myProfile;
  }

  setData(data) {
    this._data = data;
  }

  emitProfileData(from, to) {
    this._store.socket.emit("get-user", {
      uid: this._store.user.id,
      from,
      to,
      token: this._store.user.token,
    });
  }

  emitRatingData(from, to) {
    this._store.socket.emit("get-rating-user", {
      uid: this._store.user.id,
      from,
      to,
      token: this._store.user.token,
    });
  }

  setError(error) {
    if (error === this._error) return;
    this._error = error;
  }

  toggleProfile() {
    if (this._state === "") {
      this.setState(" opened");
    } else if (this._state === " opened") {
      this.setState("");
      this.setError(false);
    }
  }

  openProfile() {
    this.setState(" opened");
  }

  closeProfile() {
    this.setState("");
  }

  toggleModal() {
    if (this._stateModal === "") {
      this.setStateModal(" opened");
    } else if (this._stateModal === " opened") {
      this.setStateModal("");
      this.setError(false);
    }
  }

  toggleMyProfile(flag) {
    this.setMyProfile(flag);
  }
}

export default ProfileStore;
