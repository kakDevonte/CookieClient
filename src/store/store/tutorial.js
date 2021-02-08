import {action, makeObservable, observable} from "mobx";
import Collection from "../../helpers/Collection";

class TutorialStore {
  _step = 0;
  _players = new Map();

  _inventoryState = '';
  _inventoryCurrent = null;
  _targetSeat = null;

  _targetSelector = {
    current: null,
    previous: 0
  };

  _activeSeat = null;
  _receivedGifts = [];

  _gameState = 'pending';
  _rotateCookie = null;
  _allowClickRotate = false;

  _kissResult = false;

  constructor(store) {
    this.getPlayer = this.getPlayer.bind(this);

    makeObservable(this, {
      _step: observable,
      _players: observable,
      _targetSeat: observable,
      _targetSelector: observable,
      _activeSeat: observable,
      _inventoryState: observable,
      _inventoryCurrent: observable,
      _receivedGifts: observable,
      _gameState: observable,
      _rotateCookie: observable,
      _allowClickRotate: observable,
      _kissResult: observable,

      setStep: action,
      updatePlayers: action,
      setActiveSeat: action,
      setTargetSeat: action
    });

    this._store = store;
    this._store.app.openBackLayer();
  }

  get step() { return this._step; }

  get inventoryState() { return this._inventoryState; }
  get inventoryCurrent() { return this._inventoryCurrent; }

  get targetSeat() { return this._targetSeat; }

  get targetSelector() { return this._targetSelector.current }
  get previousTargetSelector() { return this._targetSelector.previous; }

  get activeSeat() { return this._activeSeat; }
  get giftReceived() { return this._receivedGifts; }

  get gameState() { return this._gameState; }
  get rotateCookie() { return this._rotateCookie; }
  get allowClickRotate() { return this._allowClickRotate; }

  get kissResult() { return this._kissResult; }

  getPlayer(index) {
    return this._players.get(index);
  }

  setStep(step) { this._step = step; }

  setActiveSeat(seat) { this._activeSeat = seat; }
  setTargetSeat(seat) { this._targetSeat = seat; }
  setKissResult(result) { this._kissResult = result; }

  setTargetSelector(seat) {
    this._targetSelector.previous = this._targetSelector.current ? this._targetSelector.current : 0;
    this._targetSelector.current = seat;
  }

  setRotateCookie(rotate){ this._rotateCookie = rotate; }

  setGameState(state) { this._gameState = state; }

  setInventoryState(state) { this._inventoryState = state; }
  updatePlayers(index, player) { this._players.set(index, player); }

  closeInventory(event) {
    this.setInventoryState('');
  }

  clickRotateCookie(){
    console.log('click rotate');
  }


  nextStepOne() {
    this._store.app.closeBackLayer();
    this.setStep(1);
  }


  fromInfo(uid) {
    const [user] = this.findPlayer(uid);

    return {
      id: user.id,
      name: user.name,
      fullName: user.fullName,
      photo: user.photo,
      gender: user.gender,
      seat: user.seat
    }
  }

  findPlayer(uid) {
    return Collection.findOne(this._players, uid, 'id');
  }

  receiveGift(uid, gid, from){
    const target = this.findPlayer(uid);
    from = this.findPlayer(from);

    const gift = {
      id: gid,
      uid: from[0].id,
      name: from[0].name,
      photo: from[0].photo,
      date: Date.now()
    };

    const index = this._store.game.addReceivedGift({
      active: from,
      target: target,
      gift: this._store.inventory.gifts[gift.id],
      item: gift
    }, this._receivedGifts);

    setTimeout( () => {
      this._store.game.removeReceivedGift(index, this._receivedGifts);
      target[0].gifted.push(gift);
    }, 2100);
  }

  crateUser() {
    const info = this._store.user.data;

    const user = {
      id: info.id,
      name: info.first_name,
      fullName: info.first_name + ' ' + info.last_name,
      photo: info.photo_200,
      gender: info.sex === 1 ? 'female': 'male',
      kissed: [],
      gifted: [],
      seat: 0,
      type: 'human',
      template: null,
      itsMe: true
    };

    this.updatePlayers(0, user);
  }

  _crateBot(seat, id, name, fullname, gender) {
    const photo = {
      'Александр Домогаров': 'https://sun9-39.userapi.com/impg/JlSozSp6CpUwbnAZJVXPYhJ7_Pwud0Aif-3nxQ/EEl0BtEmKaw.jpg?size=200x200&quality=96&proxy=1&sign=482edd226a04337eef872ec76bb897cb&type=album',
      'Бенедикт Камбербэтч': 'https://sun9-46.userapi.com/impg/sW7QlhDus11-XD07FDUCJPXczy6ttg8zTBf6tA/1pIPdRdjDmg.jpg?size=200x200&quality=96&proxy=1&sign=bc123029a9923329746cfaeafb5598d8&type=album',
      'Джессика Альба': 'https://sun9-22.userapi.com/impg/GauGugjatPLMsaRb-1lnFMCV1-KYKJM8JH0TRA/M4Y5vEnBfL8.jpg?size=200x200&quality=96&proxy=1&sign=9228d83fd2f21b5eaa646bfad78d0530&type=album',
      'Дмитрий Певцов': 'https://sun9-56.userapi.com/impg/mdTRsa1FR-HTmT6jkPCvuaN4y_Fv5lHvB0azng/MBPA4K2v1zw.jpg?size=200x200&quality=96&proxy=1&sign=7b9a35660a07038b5149296df74531de&type=album',
      'Инна Гомес': 'https://sun9-52.userapi.com/impg/JtxqdUEHH-ZvjveJDedBVkLYOUh3dZUOxT1MRw/hUnODdKycg4.jpg?size=200x200&quality=96&proxy=1&sign=0efd983d0d558118abc6839cd6b0b149&type=album',
      'Камерон Диаз': 'https://sun9-18.userapi.com/impg/pbIcJfUEYntqMXHDfh1RXERMdoJCOSnIF90AGg/QWKfyKACwAY.jpg?size=200x200&quality=96&proxy=1&sign=1c60a299bd7cdedac7efd7096c1d23f1&type=album',
      'Киану Ривз': 'https://sun9-45.userapi.com/impg/rPz6rpA1o1vyGCIo23NwjqHvRi6GA2ld2daCfQ/a5CNuxsxhIo.jpg?size=200x200&quality=96&proxy=1&sign=5ddf3953bbbfbaa7aed97f629b33ae7c&type=album',
      'Милла Йовович': 'https://sun9-10.userapi.com/impg/4JcqqDhOE_InPbpXU8rThlejBn-cR1-nuAIYrQ/tdmPgn-lL80.jpg?size=200x200&quality=96&proxy=1&sign=431d027100b6418131a9d8bfeb17da04&type=album',
    };

    const bot = {
      id: id,
      name: name,
      fullName: fullname,
      photo: photo[fullname],
      gender: gender,
      kissed: [],
      gifted: [],
      seat: seat,
      type: 'robot',
      template: 'null'
    };

    this.updatePlayers(seat, bot);
  }

  _createBotsFromMale() {
    setTimeout(() => {
      this._crateBot(1, '1', 'Милла', 'Милла Йовович', 'female');
    }, 2500);

    setTimeout(() => {
      this._crateBot(2, '2', 'Киану', 'Киану Ривз', 'male');
    }, 4000);

    setTimeout(() => {
      this._crateBot(3, '3', 'Инна', 'Инна Гомес', 'female');
      this.setGameState('new-round');
    }, 6000);

    setTimeout(() => {
      this._crateBot(4, '4', 'Джессика', 'Джессика Альба', 'female');
    }, 7000);
  }

  _createBotsFromFemale() {
    setTimeout(() => {
      this._crateBot(1, '5', 'Дмитрий', 'Дмитрий Певцов', 'male');
    }, 2500);

    setTimeout(() => {
      this._crateBot(2, '6', 'Камерон', 'Камерон Диаз', 'female');
    }, 4000);

    setTimeout(() => {
      this._crateBot(3, '7', 'Бенедикт', 'Бенедикт Камбербэтч', 'male');
      this.setGameState('new-round');
    }, 6000);

    setTimeout(() => {
      this._crateBot(4, '8', 'Александр', 'Александр Домогаров', 'male');
      //this._store.app.openBackLayer();

      const player = document.querySelector('.player.p4');

      setTimeout(() => {
        player.classList.toggle('accent-item');

        this._rotateSelector(2);
        this._store.chat.sendLocalMessage('6', 'Привет!');
        this._store.chat.sendLocalMessage('6', 'Привет!', this._store.user.id);

        this.receiveGift(this._store.user.id, '5', '6');
        this.receiveGift('6', '8', '8');
      }, 1000);

    }, 7000);
  }

  _rotateSelector(seat) {
    this.setTargetSeat(null);
    this.setTargetSelector(seat);
    this.setRotateCookie(true);

    setTimeout( () => {
      this.setRotateCookie(false);
      this.setTargetSeat(seat);

      setTimeout( () => this._kissing(), 3000);
    }, 4000);
  }

  _kissing() {
    this.setKissResult(true);
    setTimeout(() => {
      this._players.get(this._activeSeat).kissed.push(1);
      this._players.get(this._targetSeat).kissed.push(1);
    }, 1250);

    setTimeout(() => this.setKissResult(false), 6000);
  }
}

export default TutorialStore;