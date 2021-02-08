import {action, makeObservable, observable} from "mobx";

class RatingStore {

  _state = '';
  _error = false;
  _period = 'day';
  _ratingList = {
    day: [],
    week: [],
    month: []
  };
  _myRatingData = {
    day: {
      position: '>1000',
      id: null,
    },
    week: {
      position: '>1000',
      id: null,
    },
    month: {
      position: '>1000',
      id: null,
    }
  };

  constructor(store){
    makeObservable(this, {
      _state: observable,
      _error: observable,
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
  get error() { return this._error; }
  get period() { return this._period; }
  get ratingList() { return this._ratingList[this._period]; }
  get myRating() { return this._myRatingData[this._period]; }

  setState(state) {
    if(state === this._state) return;
    this._state = state;
  }

  setError(error) {
    if(error === this._error) return;
    this._error = error;
  }

  setPeriod(period) {
    if(period === this._period) return;
    this._period = period;
  }

  updateRatingList(data, period) {
    if(!period) {
      this._ratingList = { day: [], week: [], month: [] };
      return;
    }

    if(period === 'day' || period === 'week' || period === 'month') {
      this._ratingList[period] = data;
    }
  }

  updateMyRatingData(data, period) {
    this._myRatingData[period] = data;
  }

  toggleRatingPanel() {
    if(this._state === '') {
      this.setState(' opened');
      this.requestRatingData('day');
    }else if(this._state === ' opened') {
      this.setState('');
      this.setError(false);

      setTimeout(() => {
        this.updateRatingList();
      }, 1000);
    }
  }

  requestRatingData(period) {
    this.setError(false);
    this.setPeriod(period);

    if(this._ratingList[period].length > 0) return;
    this._store.socket.emit('request-ratings', period);
  }

  receiveData(data) {
    if(data === 'error') {
      this.setError(true);
      return;
    }
    this.updateRatingList(data.items, data.period);
    this.updateMyRatingData(data.my, data.period);
  }
}

export default RatingStore;