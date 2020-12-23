import {makeObservable, observable, action, reaction} from "mobx";

class GameStore {

  _state = null;
  _round = null;
  _kissWindow = 'closed';
  _changeTableWindow = '';
  _turnsRemain = 0;

  _rotateCookie = false;
  _allowClickRotate = false;

  _active = null;
  _activeSeat = null;
  _activePlayer = null;
  _activeKiss = null;

  _target = null;
  _targetSeat = null;
  _targetSelector = null;
  _previousTargetSelector = 0;
  _targetPlayer = null;
  _targetKiss = null;

  _kissResult = null;
  _receivedGifts = [];
  _timerDecision = null;

  constructor (store) {
    makeObservable(this, {
      _state: observable,
      _round: observable,
      _kissWindow: observable,
      _changeTableWindow: observable,
      _turnsRemain: observable,
      _rotateCookie: observable,
      _allowClickRotate: observable,
      _activeSeat: observable,
      _activePlayer: observable,
      _activeKiss: observable,
      _targetSeat: observable,
      _targetSelector: observable,
      _targetPlayer: observable,
      _targetKiss: observable,
      _kissResult: observable,
      _receivedGifts: observable,

      setState: action,
      setRound: action,
      setKissWindow: action,
      setChangeTableWindow: action,
      setTurnsRemain: action,
      setRotateCookie: action,
      setActiveSeat: action,
      setAllowClickRotate: action,
      setActivePlayer: action,
      setActiveKiss: action,
      setTargetSeat: action,
      setTargetSelector: action,
      setTargetPlayer: action,
      setTargetKiss: action,
      setKissResult: action,
      addReceivedGift: action,
      removeReceivedGift: action
    });

    this._store = store;

    //reaction(() => this.activeKiss, () => this.calculateKissResult());
    //reaction(() => this.targetKiss, () => this.calculateKissResult());
    reaction(() => this.kissWindow, () => this.autoDecision());
  }

  get state() { return this._state; }
  get round() { return this._round; }
  get kissWindow() { return this._kissWindow; }
  get changeTableWindow() { return this._changeTableWindow; }
  get turnsRemain() { return this._turnsRemain; }
  get rotateCookie() { return this._rotateCookie; }
  get allowClickRotate() { return this._allowClickRotate; }

  get active() { return this._active; }
  get activeSeat() { return this._activeSeat; }
  get activePlayer() { return this._activePlayer; }
  get activeKiss() { return this._activeKiss; }

  get target() { return this._target; }
  get targetSeat() { return this._targetSeat; }
  get targetSelector() { return this._targetSelector; }
  get previousTargetSelector() { return this._previousTargetSelector; }
  get targetPlayer() { return this._targetPlayer; }
  get targetKiss() { return this._targetKiss; }

  get kissResult() { return this._kissResult; }
  get giftReceived() { return this._receivedGifts; }

  //////////////////////////////////////////////////////////////////////////

  setState(state) {
    if(state === this._state) return;
    this._state = state;
  }

  setRound(round) {
    if(round === this._round) return;
    this._round = round;
  }

  setKissWindow(state) {
    if(state === this._kissWindow) return;
    this._kissWindow = state;
  }

  setChangeTableWindow(state) {
    if(state === this._changeTableWindow) return;
    this._changeTableWindow = state;
  }

  setTurnsRemain(turn) {
    if(turn === this._turnsRemain) return;
    this._turnsRemain = turn;
  }

  setRotateCookie(state) {
    if(state === this._rotateCookie) return;
    this._rotateCookie = state;
  }

  setAllowClickRotate(allow) {
    if(allow === this._allowClickRotate) return;
    this._allowClickRotate = allow;
  }

  setActiveSeat(seat) {
    if(seat === this._activeSeat) return;
    this._activeSeat = seat;
  }

  setActivePlayer(player) {
    if(player === this._activePlayer) return;
    this._activePlayer = player;
  }

  setActiveKiss(kiss) {
    if(kiss === this._activeKiss) return;
    this._activeKiss = kiss;
  }

  setTargetSeat(seat) {
    if(seat === this._targetSeat) return;
    this._targetSeat = seat;
  }

  setTargetSelector(seat) {
    if(seat === this._targetSelector) return;
    this._previousTargetSelector = this._targetSelector ? this._targetSelector : 0;
    this._targetSelector = seat;
  }

  setTargetPlayer(player) {
    if(player === this._targetPlayer) return;
    this._targetPlayer = player;
  }

  setTargetKiss(kiss) {
    if(kiss === this._targetKiss) return;
    this._targetKiss = kiss;
  }

  setKissResult(result) {
    if(result === this._kissResult) return;
    this._kissResult = result;
  }

  addReceivedGift(gift) {
    let i, length, free;

    for(i = 0, length = this._receivedGifts.length; i < length; i++){
      if(this._receivedGifts[i] === null) {
        free = i;
        break;
      }
    }

    if(!free) free = length;
    this._receivedGifts[free] = gift;

    return free;
  }

  removeReceivedGift(index) {
    this._receivedGifts[index] = null;
  }

  //////////////////////////////////////////////////////////////////////////

  clickConfirmChangeTable() {
    this._store.app.openBackLayer();
    this.setChangeTableWindow(' opened');
  }

  clickChangeTable(decision) {
    this.setChangeTableWindow('');
    this._store.app.closeBackLayer();

    if(decision) {
      this._store.app.stageLobby(this._store.table.id);
    }
  }

  /**
   * Позволяет пользователю запустить вращение печеньки по клику
   */
  enableRotateClickHandler(){
    this.setAllowClickRotate(true);
  }

  /**
   *  Обработчик клика по центральной печеньке
   */
  clickRotateCookie() {
    if(!this.allowClickRotate) return;

    this._store.socket.emit('player-rotated-roulette', this._store.table.id);
  }

  /**
   * Эмулириует нажатие на отрицательный ответ по истечении вермени
   */
  autoDecision(){
    this._timerDecision = setTimeout(() => {
      if(this.kissWindow === 'opened') {
        this.clickDecision(false, true);
      }
    }, 5100);
  }

  /**
   * Отправка результа поцелуя на сервер
   * @param {boolean} result - результат
   * @param {boolean} auto - автоматически или руками
   */
  clickDecision(result, auto) {
    const
      uid = this._store.user.id,
      tid = this._store.table.id;

    let data, active;

    if(this._timerDecision) clearTimeout(this._timerDecision);

    if(this.activePlayer === uid) {
      if(this.activeKiss !== null) return;
      this.setActiveKiss(result);
      active = true;
    } else {
      if(this.targetKiss !== null) return;
      this.setTargetKiss(result);
      active = false;
    }

    data = { kiss: result, uid, tid, active, auto};
    this._store.socket.emit('receive-kiss-result', data);
  }

  /**
   * Открытие окна для запроса поцелуя
   */
  kissRequest(){
    this.setKissWindow('opened');
  }


  /**
   * Получаем ответ на поцелуй от сервера (бот ли или другой игрок)
   * @param {boolean} active - активный икрок или цель
   * @param {boolean} kiss - результат
   */
  updateKiss(active, kiss) {
    if(active) {
      this.setActiveKiss(kiss);
    } else {
      this.setTargetKiss(kiss);
    }
  }

  // Тут временно поменять логику и анимацию
  rotateSelector(seat) {
    this.setAllowClickRotate(false);
    this.setTargetSelector(seat);
    this.setRotateCookie(true);

    setTimeout( () => {
      this.setRotateCookie(false);
    }, 4000);
  }

  calculateTurnRemain(){
    const
      store = this._store,
      uid = store.user.id;

    let seat = 0, current, my, result;

    for(const player of store.table.players.values()) {
      if(player !== null){

        if(this.activeSeat === seat){
          current = seat;
        }

        if(uid === player.id){
          my = seat;
        }

        seat++;
      }
    }

    result = my - current;
    result = !isNaN(result) && result > -1 ? result : seat - 1;

    this.setTurnsRemain(result);
  }

  /**
   * Обновляем текущее состояние игры полученное от сервера
   * @param game - данные об игре от сервера
   */
  updateGameData(game){
    const table = this._store.table;

    this.setState(game.state);
    this.setRound(game.round);
    this.calculateTurnRemain();

    if(game.state === 'next-round'){
      this._active = null;
      this.setActivePlayer(game.player[0]);
      //this.setActiveSeat(null);
      this.setActiveKiss(game.player[3]);

      this._target = null;
      this.setTargetPlayer(game.target[0]);
      //this.setTargetSeat(null);
      setTimeout(() => this.setTargetSeat(null), 1000);
      this.setTargetKiss(game.target[3]);
    }else{
      if(game.player[0]) {
        [this._active] = table.findPlayer(game.player[0]);
      }

      if(this._active) {
        this.setActivePlayer(game.player[0]);
        this.setActiveSeat(this._active.seat);
        this.setActiveKiss(game.player[3]);
      }

      if(game.target[0]) {
        [this._target] = table.findPlayer(game.target[0]);
      }

      if(this._target) {
        this.setTargetPlayer(game.target[0]);
        this.setTargetSeat(this._target.seat);
        //this.setTargetSelector(this._target.seat);
        this.setTargetKiss(game.target[3]);
      }
    }

    this.setKissResult(game.result);
  }

  /**
   * Обновляет данные о поцелуях
   * @param response {{uid, kissed, counter}}
   */
  updateKissData({uid, kissed, counter}){
    if(!uid) return;
    if(!kissed) return;

    this._store.table.setKissed(uid, kissed);

    if(uid === this._store.user.id && counter) {
        this._store.user.setKissCounter(counter);
    }
  }

  /**
   * Установка общего результата поцелуя, закрытие окна
   * @param {boolean} result - результат от сервера
   */
  doShowRoundResult(result) {
    this.setKissResult(result);
    setTimeout(() => this.setKissWindow('closed'), 2500);
  }

  /**
   * Получение подарка игроком
   * @param uid
   * @param gift
   */
  receiveGift({uid, gift}){
    if(!uid) return;
    if(!gift) return;

    const index = this.addReceivedGift({
      active: this._store.table.findPlayer(gift.uid),
      target: this._store.table.findPlayer(uid),
      gift: this._store.inventory.gifts[gift.id],
      item: gift
    });

    setTimeout( () => {
      this.removeReceivedGift(index);
      this._store.table.addGift(uid, gift);
    }, 2100);
  }
}

export default GameStore