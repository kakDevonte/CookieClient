import {action, makeObservable, observable} from "mobx";

class RatingStore {

  _state = '';
  _period = 'today';
  _ratingList = {
    today: [],
    week: [],
    month: []
  };
  _myRatingData = {};

  constructor(store){
    makeObservable(this, {
      _state: observable,
      _period: observable,
      _ratingList: observable,
      _myRatingData: observable,

      setState: action,
      setPeriod: action,
      updateRatingList: action,
      updateMyRatingData: action
    });
    this._store = store;
  }

  get state() { return this._state; }
  get period() { return this._period; }
  get ratingList() { return this._ratingList[this._period]; }
  get myRating() { return this._myRatingData; }

  setState(state) {
    if(state === this._state) return;
    this._state = state;
  }

  setPeriod(period) {
    if(period === this._period) return;
    this._period = period;
  }

  updateRatingList(data, period) {
    if(!period) {
      this._ratingList = { today: [], week: [], month: [] };
      return;
    }

    if(period === 'today' || period === 'week' || period === 'month') {
      this._ratingList[period] = data;
    }
  }

  updateMyRatingData(data) {
    this._myRatingData = data;
  }

  toggleRatingPanel() {
    if(this._state === '') {
      this.setState(' opened');
      this.requestRatingData('today');
    }else if(this._state === ' opened') {
      this.setState('');

      setTimeout(() => {
        this.updateRatingList();
      }, 1000);
    }
  }

  requestRatingData(period) {
    this.setPeriod(period);

    if(this._ratingList[period].length > 0) return;
    this._store.socket.emit('request-ratings', period);
  }

  receiveData(data) {
    this.updateRatingList(data.items, data.period);
    this.updateMyRatingData(data.my);
  }
}

export default RatingStore;