import Amplitude from "amplitude";

class AmplitudeStore {
  constructor(store) {
    this._dev = !!process.env.REACT_APP_BOTTLE_APP;
    this._store = store;
    this._amplitude = new Amplitude("4eb634462aab087adc41e792a25257da");
  }

  sendGift(buy) {
    ///+++
    if (buy) {
      this.hardGift();
    } else {
      this.freeGift();
    }
  }

  freeGift() {
    if (this._dev) return;
    this._amplitude.track({
      event_type: "free_gift",
      user_id: this._store.user.id,
      platform: this._store.platform,
    });
  }

  trackTutorialStep(step) {
    this._amplitude.track({
      user_id: this._store.user.id,
      event_type: "Tutorial Step",
      event_properties: {
        step: step,
      },
    });
  }

  trackPayment(amount) {
    ///+++
    this._amplitude.track({
      user_id: this._store.user.id,
      event_type: "Payment",
      event_properties: {
        amount: amount,
      },
    });
  }

  trackKisses() {
    ///+++
    this._amplitude.track({
      user_id: this._store.user.id,
      event_type: "Kisses",
    });
  }

  trackMessages() {
    ///+++
    this._amplitude.track({
      user_id: this._store.user.id,
      event_type: "Messages",
    });
  }

  trackPushSubscription(userId, date) {
    this._amplitude.track({
      user_id: this._store.user.id,
      event_type: "Push Subscription",
    });
  }

  hardGift() {
    if (this._dev) return;

    this._amplitude.track({
      event_type: "hard_gift",
      user_id: this._store.user.id,
      platform: this._store.platform,
    });
  }

  rotation() {
    if (this._dev) return;

    this._amplitude.track({
      event_type: "rotation",
      user_id: this._store.user.id,
      platform: this._store.platform,
    });
  }

  startGame(enters) {
    if (this._dev) return;

    const data = {
      event_type: "bottle_started",
      user_id: this._store.user.id,
      platform: this._store.platform,
    };

    if (!enters || enters === 0) data.first_try = true;

    this._amplitude.track(data);
  }
}

export default AmplitudeStore;
