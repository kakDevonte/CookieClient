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
        this._disAccentAll();
        this._accentItem('.roulette-table');
        this.updateKissData('kiss', true);
        setTimeout(() => this.updateKissData('kiss', false), 1500);
      }
    }
  }

  clickRotateCookie() {
    if(this._step !== "playerTurn") return;

    this.setAllowClickRotate(false);
    //this.closeShadowLayer();
    this._disAccentAll();
    this._accentItem('.roulette-table');

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
      'Александр Дмитриев': 'https://sun9-58.userapi.com/impg/2Tw6BkwXuFf0WlBEDbQlz14ZGWMYg2UE5V6REg/qnlOx7LUA6o.jpg?size=200x200&quality=96&proxy=1&sign=a6a7cc3b761e2f55d45ea552543c2f5f',
      'Максим Куролесов': 'https://sun9-30.userapi.com/impg/n3w7oUzN_yJ6JCzRi4wGoyhHTqo-q1GEiWywuw/xssioUp4JuI.jpg?size=200x200&quality=96&proxy=1&sign=455cb3b2e3486f86451985942d28ab2f',
      'Дарина Ломова': 'https://sun9-65.userapi.com/impg/A6RKpFX8JKkQk-ZxX0Bgr1a2H6uvTVtwxdruzg/1kebdGyRy3w.jpg?size=200x200&quality=96&proxy=1&sign=35dc509add705a3454186a0ed78f06d0',
      'Дмитрий Волков': 'https://sun9-56.userapi.com/impg/gBp-BQCV121doZdH5oQmDjjsPLQSibfvqvkmgg/EUHUy_d_kQI.jpg?size=200x200&quality=96&proxy=1&sign=82de5baf5dcc19d4c66524880610d0ed',
      'Инна Шилова': 'https://sun9-33.userapi.com/impg/CZpsljJolgTgT7kkqbYXOZHrdxCHENE6cNskmw/Vew6VNuvWTU.jpg?size=200x200&quality=96&proxy=1&sign=b2eb305b3cf7c863553b9a81013e4e99',
      'Елизавета Дворцова': 'https://sun9-5.userapi.com/impg/iiiAEtIBHgCqy17F3ha7gvpneuO_Tl6FRLSFrw/FSGEssylv0Q.jpg?size=200x200&quality=96&proxy=1&sign=68cadaa7b10b40c846a6d0feb3059c26',
      'Михаил Суров': 'https://sun9-55.userapi.com/impg/AL4_hDXmbVbV9oK8hyyjGLlnBjbr8Pjyv0JCRQ/Ayhu0IgvMjA.jpg?size=200x200&quality=96&proxy=1&sign=b587348d71c2f28a60a943996b12ee75',
      'Мария Кудряшова': 'https://sun9-76.userapi.com/impg/hhHCG8ZvXyfATRe7ftjfPmItkwVHcllIr7dAkA/wEtf-yJiyNE.jpg?size=200x200&quality=96&proxy=1&sign=dbd39f5608726c3c2b8034934e7b609d',
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
      this._crateBot(1, '1', 'Мария', 'Мария Кудряшова', 'female');
    }, 2500);

    setTimeout(() => {
      this._crateBot(2, '2', 'Михаил', 'Михаил Суров', 'male');
      this._store.chat.sendLocalMessage('2', 'Доброго времени суток.');
    }, 4000);

    setTimeout(() => {
      this._crateBot(3, '3', 'Инна', 'Инна Шилова', 'female');
      this.setGameState('new-round');
    }, 6000);

    setTimeout(() => {
      this._crateBot(4, '4', 'Дарина', 'Дарина Ломова', 'female');
      this._store.chat.sendLocalMessage('4', 'Всем привет!');
      this._roundTwo();
    }, 7000);
  }

  _createBotsFromFemale() {
    setTimeout(() => {
      this._crateBot(1, '5', 'Дмитрий', 'Дмитрий Волков', 'male');
    }, 2500);

    setTimeout(() => {
      this._crateBot(2, '6', 'Елизавета', 'Елизавета Дворцова', 'female');
      this._store.chat.sendLocalMessage('6', 'Алоха!');
    }, 4000);

    setTimeout(() => {
      this._crateBot(3, '7', 'Максим', 'Максим Куролесов', 'male');
      this.setGameState('new-round');
    }, 6000);

    setTimeout(() => {
      this._crateBot(4, '8', 'Александр', 'Александр Дмитриев', 'male');
      this._store.chat.sendLocalMessage('8', 'Здравствуйте все! Рад вас видеть.');
      this._roundTwo();
    }, 7000);
  }

  // _roundOne() {
  //   this.setActiveSeat(3);
  //
  //   setTimeout(() => this._rotateSelector(2), 1000);
  //   setTimeout(() => this._kissing(), 6000);
  //   setTimeout(() => {
  //     this.setTargetSeat(null);
  //     this._roundTwo();
  //   }, 12000);
  // }

  _roundTwo() {
    this.setActiveSeat(4);
    this.setRounds(4);
    //return this.setStep('acceptGift');

    setTimeout(() => this._rotateSelector(2), 1000);
    setTimeout(() => this._kissing(), 6000);
    setTimeout(() => {
      this.setTargetSeat(null);
      this._roundThree();
    }, 12000);
  }

  _roundThree(action) {
    if(!action) {
      this.setActiveSeat(0);
      this.setRounds(3);
      this.openShadowLayer();
      this.setStep('playerTurn');
    }

    if(action === 'rotate') {
      setTimeout(() => this._rotateSelector(3), 100);
      setTimeout(() => this.setStep('playerKiss'), 4500);
    }
  }

  _roundFour() {
    this.setActiveSeat(1);
    this.setRounds(2);

    setTimeout(() => this._rotateSelector(2), 1000);
    setTimeout(() => {

      if(this._store.user.data.sex === 1) {
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
    this.setStep('openInventory');

    setTimeout(() => this._rotateSelector(4), 1000);
    setTimeout(() => this._kissing(), 6000);
    setTimeout(() => {
      this.setTargetSeat(null);

      if(this._store.user.data.sex === 1) {
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