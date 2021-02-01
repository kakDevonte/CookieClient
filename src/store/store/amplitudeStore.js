import Amplitude from 'amplitude';

class AmplitudeStore{
  constructor(store) {
    this._dev = process.env.NODE_ENV !== 'production';
    this._store = store;
    this._amplitude = new Amplitude({
      'url': 'https://cookieapp.ru',
      'api': 'http://api.cookieapp.ru:3000',
      'amplitude': '86b0caee0e6c0afc91059e88525fe9f7'
    });
  }

  sendGift(buy) {
    if(buy) {
      this.hardGift();
    } else {
      this.freeGift();
    }
  }

  freeGift() {
    if(this._dev) return;

    this._amplitude.track({
      event_type: 'free_gift',
      user_id: this._store.user.id,
      platform: this._store.platform
    });
  }

  hardGift() {
    if(this._dev) return;

    this._amplitude.track({
      event_type: 'hard_gift',
      user_id: this._store.user.id,
      platform: this._store.platform
    });
  }

  rotation() {
    if(this._dev) return;

    this._amplitude.track({
      event_type: 'rotation',
      user_id: this._store.user.id,
      platform: this._store.platform
    });
  }
}

export default AmplitudeStore;