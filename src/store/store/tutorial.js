import {action, makeObservable, observable} from "mobx";
import Collection from "../../helpers/Collection";

class TutorialStore {
  _step = 'welcome';
  _players = new Map();

  _shadowLayer = '';
  _targetSeat = null;

  _targetSelector = {
    current: null,
    previous: 0
  };

  _rounds = 5;
  _activeSeat = null;
  _receivedGifts = [];

  _gameState = 'pending';
  _rotateCookie = null;
  _allowClickRotate = false;

  _kissResult = false;

  _kissData = {
    _active: null,
    activeSeat: null,
    activePlayer: null,
    activeKiss: null,

    _target: null,
    targetSeat: null,
    targetPlayer: null,
    targetKiss: null,

    kissResult: null,
    kissWindow: 'closed',
    clickDecision: this._clickDecision,
  };

  constructor(store) {
    this.getPlayer = this.getPlayer.bind(this);
    this._kissData.clickDecision = this._kissData.clickDecision.bind(this);

    makeObservable(this, {
      _step: observable,
      _rounds: observable,
      _players: observable,
      _shadowLayer: observable,
      _targetSeat: observable,
      _targetSelector: observable,
      _activeSeat: observable,
      _receivedGifts: observable,
      _gameState: observable,
      _rotateCookie: observable,
      _allowClickRotate: observable,
      _kissResult: observable,
      _kissData: observable,

      setStep: action,
      setRounds: action,
      setShadowLayer: action,
      updatePlayers: action,
      updateKissData: action,
      setActiveSeat: action,
      setTargetSeat: action,
      setAllowClickRotate: action
    });

    this._store = store;
  }

  get step() { return this._step; }
  get rounds() { return this._rounds; }
  get shadowLayer() { return this._shadowLayer; }
  get targetSeat() { return this._targetSeat; }

  get targetSelector() { return this._targetSelector.current }
  get previousTargetSelector() { return this._targetSelector.previous; }

  get activeSeat() { return this._activeSeat; }
  get giftReceived() { return this._receivedGifts; }

  get gameState() { return this._gameState; }
  get rotateCookie() { return this._rotateCookie; }
  get allowClickRotate() { return this._allowClickRotate; }

  get kissResult() { return this._kissResult; }

  get kissData() { return this._kissData; }

  getPlayer(index) {
    return this._players.get(index);
  }

  openShadowLayer(){ if(this._shadowLayer === '') this.setShadowLayer(' opened'); }
  closeShadowLayer(){ if(this._shadowLayer === ' opened') this.setShadowLayer(''); }

  setStep(step) { this._step = step; }
  setRounds(round) { this._rounds = round; }
  setShadowLayer(state) { this._shadowLayer = state; }

  setActiveSeat(seat) {
    this._activeSeat = seat;
    this._kissData.activeSeat = seat;

    if(seat !== null) {
      this._kissData._active = this.getPlayer(seat);
      this._kissData.activePlayer = this._kissData._active.id;
    } else {
      this._kissData._active = null;
      this._kissData.activePlayer = null;
    }
  }
  setTargetSeat(seat) {
    this._targetSeat = seat;
    this._kissData.targetSeat = seat;

    if(seat !== null) {
      this._kissData._target = this.getPlayer(seat);
      this._kissData.targetPlayer = this._kissData._target.id;
    } else {
      this._kissData._target = null;
      this._kissData.targetPlayer = null;
    }
  }

  setKissResult(result) { this._kissResult = result; }

  setTargetSelector(seat) {
    this._targetSelector.previous = this._targetSelector.current ? this._targetSelector.current : 0;
    this._targetSelector.current = seat;
  }

  setAllowClickRotate(allow) { this._allowClickRotate = allow; }
  setRotateCookie(rotate){ this._rotateCookie = rotate; }

  setGameState(state) { this._gameState = state; }
  updatePlayers(index, player) { this._players.set(index, player); }

  updateKissData(action, active) {
    if(action === 'open') {
      this._kissData.kissWindow = 'opened accent-item';
    }

    if(action === 'close') {
      this._kissData.kissWindow = 'closed';
      this._kissData.activeKiss = null;
      this._kissData.targetKiss = null;
    }

    if(action === 'kiss'){
      if(active === true) {
        this._kissData.activeKiss = true;
      } else {
        this._kissData.targetKiss = true;
      }
    }

    if(this._kissData.activeKiss && this._kissData.targetKiss) {
      this._kissData.kissResult = true;
      this._kissing();

      setTimeout(() => this.updateKissData('close'), 2500);
      setTimeout(() => this._roundFour(), 8000);
    }
  }

  clickToggleInventory(seat, event) {
    if(this._step === 'openInventory') {
      this._store.inventory.clickToggleInventory(seat, event);
      this.setStep('giveGift');
    }
  }

  clickPersonalMessage() { return null; }

  clickChangeTypeChat(type) {
    if(this._step !== 'personalMessage') return;
    if(type === 'personal') this.setStep('openTalk');
    this._store.chat.clickChangeTypeChat(type);
  }

  clickOpenTalk(player) {
    if(this._step === 'openTalk') {
      this._disAccentAll();
      this._accentItem('.personal-chat .messages');
      this._store.chat.clickOpenTalk(player);
      this.setStep('readMessage');

      setTimeout(() => this.setStep('writeMessage'), 2000);
    }
  }

  _clickDecision(result) {
    if(this._kissData.activeKiss === null) {
      if(result === false) {
        this.setStep('declineKiss');
      } else {
        this.setStep('acceptKss');
        this.closeShadowLayer();
        this._disAccentAll();
        this.updateKissData('kiss', true);
        setTimeout(() => this.updateKissData('kiss', false), 1500);
      }
    }
  }

  clickRotateCookie() {
    if(this._step !== "playerTurn") return;

    this.setAllowClickRotate(false);
    this.closeShadowLayer();
    this._disAccentAll();

    this.setStep('rotate');
    this._roundThree('rotate');
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
      this._store.chat.sendLocalMessage('2', 'Вы все восхитительны!');
    }, 4000);

    setTimeout(() => {
      this._crateBot(3, '3', 'Инна', 'Инна Гомес', 'female');
      this.setGameState('new-round');
    }, 6000);

    setTimeout(() => {
      this._crateBot(4, '4', 'Джессика', 'Джессика Альба', 'female');
      this._store.chat.sendLocalMessage('4', 'Всем привет!');
      this._roundOne();
    }, 7000);
  }

  _createBotsFromFemale() {
    setTimeout(() => {
      this._crateBot(1, '5', 'Дмитрий', 'Дмитрий Певцов', 'male');
    }, 2500);

    setTimeout(() => {
      this._crateBot(2, '6', 'Камерон', 'Камерон Диаз', 'female');
      this._store.chat.sendLocalMessage('6', 'Алоха!');
    }, 4000);

    setTimeout(() => {
      this._crateBot(3, '7', 'Бенедикт', 'Бенедикт Камбербэтч', 'male');
      this.setGameState('new-round');
    }, 6000);

    setTimeout(() => {
      this._crateBot(4, '8', 'Александр', 'Александр Домогаров', 'male');
      this._store.chat.sendLocalMessage('8', 'Здравствуйте все! Рад вас видеть.');
      this._roundOne();
      //this.setStep('acceptGift');
    }, 7000);
  }

  _roundOne() {
    this.setActiveSeat(3);

    setTimeout(() => this._rotateSelector(2), 1000);
    setTimeout(() => this._kissing(), 6000);
    setTimeout(() => {
      this.setTargetSeat(null);
      this._roundTwo();
    }, 12000);
  }

  _roundTwo() {
    this.setActiveSeat(4);
    this.setRounds(4);
    //return this.setStep('acceptGift');

    setTimeout(() => this._rotateSelector(2), 1000);
    setTimeout(() => {
      this.setTargetSeat(null);
      this._roundThree();
    }, 12000);
  }

  _roundThree(action) {
    if(!action) {
      this.setActiveSeat(0);
      this.setRounds(3);
      this.setStep('playerTurnReady');
    }

    if(action === 'rotate') {
      setTimeout(() => this._rotateSelector(3), 100);
      setTimeout(() => this.setStep('playerTargetSelected'), 4500);
    }
  }

  _roundFour() {
    this.setActiveSeat(1);
    this.setRounds(2);

    setTimeout(() => this._rotateSelector(2), 1000);
    setTimeout(() => {
      if(this._store.user.sex === 1) {
        this.receiveGift(this._store.user.id, '3', '5');
      } else {
        this.receiveGift(this._store.user.id, '3', '1');
      }
      this._kissing();
    }, 6000);
    setTimeout(() => {
      this.setTargetSeat(null);
      this._roundFive();
    }, 12000);
  }

  _roundFive() {
    this.setActiveSeat(2);
    this.setRounds(1);
    this.setStep('acceptGift');

    setTimeout(() => this._rotateSelector(4), 1000);
    setTimeout(() => this._kissing(), 6000);
    setTimeout(() => {
      this.setTargetSeat(null);

      if(this._store.user.sex === 1) {
        this.receiveGift('6', '28', '8');
      } else {
        this.receiveGift('4', '28', '2');
      }
      this.setRounds(0);
    }, 12000);
  }



  _rotateSelector(seat) {
    this.setTargetSeat(null);
    this.setTargetSelector(seat);
    this.setRotateCookie(true);

    setTimeout( () => {
      this.setRotateCookie(false);
      this.setTargetSeat(seat);
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

  exit() {
    if(this._step === 'endTutorial') {
      this._store.chat.setMode('global');
      this._store.inventory.setMode('global');
      this._store.app.stageLobby();
    }
  }

  _accentItem(selector, ) {
    const item = document.querySelector(selector);
    if(item) item.classList.add('accent-item');
  }

  _disAccentAll() {
    const items = document.querySelectorAll('.accent-item');
    let count = items.length;

    while(count--) {
      items[count].classList.remove('accent-item');
    }
  }
}

export default TutorialStore;