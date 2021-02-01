import {makeObservable, observable, action, reaction} from "mobx";

class GameStore {

  _state = null;
  _round = null;
  _kissWindow = 'closed';
  _changeTableWindow = '';
  _turnTooltip = '';
  _turnsRemain = 0;
  _turnsBeforeChangeTable = 5;

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
  _kissRequestRound = -1;

  constructor (store) {
    makeObservable(this, {
      _state: observable,
      _round: observable,
      _kissWindow: observable,
      _changeTableWindow: observable,
      _turnTooltip: observable,
      _turnsRemain: observable,
      _turnsBeforeChangeTable: observable,
      _rotateCookie: observable,
      _allowClickRotate: observable,
      _activeSeat: observable,
      _activePlayer: observable,
      _activeKiss: observable,
      _targetSeat: observable,
      _targetSelector: observable,
      _previousTargetSelector: observable,
      _targetPlayer: observable,
      _targetKiss: observable,
      _kissResult: observable,
      _receivedGifts: observable,

      setState: action,
      setRound: action,
      setKissWindow: action,
      setChangeTableWindow: action,
      setTurnTooltip: action,
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
      removeReceivedGift: action,
      allowChangeTable: action
    });

    this._store = store;

    reaction(() => this.kissWindow, () => this.autoDecision());
  }

  get state() { return this._state; }
  get round() { return this._round; }
  get kissWindow() { return this._kissWindow; }
  get changeTableWindow() { return this._changeTableWindow; }
  get turnTooltip() { return this._turnTooltip; }
  get turnsRemain() { return this._turnsRemain; }
  get turnsBeforeChangeTable() { return this._turnsBeforeChangeTable; }
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

  setTurnTooltip(state) {
    if(state === this._turnTooltip) return;
    this._turnTooltip = state;
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

  allowChangeTable() {
    if(!this._turnsBeforeChangeTable) return;
    this._turnsBeforeChangeTable--;
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
    if(this.allowClickRotate) {
      this._store.socket.emit('player-rotated-roulette', this._store.table.id);
    } else{
      this.setTurnTooltip(' opened');
      setTimeout(() => this.setTurnTooltip(''), 2000);
    }
  }

  /**
   * Эмулириует нажатие на отрицательный ответ по истечении вермени
   */
  autoDecision() {
    if(this.kissWindow === 'closed') return;
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

    data = {
      kiss: result,
      uid,
      tid,
      round: this._kissRequestRound,
      active,
      auto
    };

    this._store.socket.emit('receive-kiss-result', data);
  }

  /**
   * Открытие окна для запроса поцелуя
   * @param {number} round - раунд в котором был запрос
   */
  kissRequest(round){
    this._kissRequestRound = round;
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

  rotateSelector(seat) {
    this.setAllowClickRotate(false);
    this.setTargetSelector(seat);
    this.setRotateCookie(true);
    this._store.amplitude.rotation();

    setTimeout( () => {
      this.setRotateCookie(false);
    }, 4000);
  }

  calculateTurnRemain(){
    let seat = 0, current, my, result;

    for(const player of this._store.table.players.values()) {
      if(player !== null){
        if(this.activeSeat === seat) current = seat;
        if(player.itsMe) my = seat;
        seat++;
      }
    }

    result = my - current;
    result = !isNaN(result) && result > -1 ? result : seat - current + my;
    this.setTurnsRemain(result);
  }

  /**
   * Приводит данные игры к начальному состоянию
   */
  clearGameState() {
    this.setState('game-cleared');
    this.setRound(0);
    this.setTurnsRemain('');

    this._store.table.update(
      this._store.table.id,
      {male: 0, female: 0},
      [null, null, null, null, null, null, null, null]
    );

    this._active = null;
    this.setActivePlayer(null);
    this.setActiveSeat(null);
    this.setActiveKiss(null);

    this._target = null;
    this.setTargetPlayer(null);
    this.setTargetSeat(null);
    this.setTargetKiss(null);

    this.setKissResult(null);
    this.setKissWindow('closed');
    this.setChangeTableWindow('');
    this.setTargetSelector(0);
    this.setAllowClickRotate(false);
    this.setRotateCookie(false);

    this._store.inventory.setState('');
    this._store.inventory.setSendGift(null);

    this._store.chat.setTalkPlayer({id: null});
    this._store.chat.setTalkState('');
    this._store.chat.setTypeChat('common');
    this._store.chat.updateMessages('clear');
    this._store.chat.setText('');

    // console.log('Game cleared!');
  }

  /**
   * Обновляем текущее состояние игры полученное от сервера
   * @param game - данные об игре от сервера
   */
  updateGameData(game){
    if(this.state === "pending" && game.state === 'target-selected') return;
    this.setState(game.state);
    this.setRound(game.round);

    if(game.state === "pending" || game.state === 'next-round') {
      this.setKissWindow('closed');
      this.setTurnTooltip('');
    }

    if(game.state === 'next-round'){
      this._active = null;
      this.setActivePlayer(game.player[0]);
      this.setActiveKiss(game.player[3]);

      this._target = null;
      this.setTargetPlayer(game.target[0]);
      this.setTargetKiss(game.target[3]);

      //if(this._round !== game.round)
        this.allowChangeTable();

      setTimeout(() => this.setTargetSeat(null), 1000);
    }else{
      this.setActiveUser(game.player[0]);
      this.setTargetUser(game.target[0]);

      this.setActivePlayer(game.player[0]);
      this.setActiveSeat(game.player[2]);
      this.setActiveKiss(game.player[3]);

      this.setTargetPlayer(game.target[0]);
      this.setTargetSeat(game.target[2]);
      this.setTargetKiss(game.target[3]);

      //this.setTargetSelector(game.target[2]);
    }

    if(game.state === 'active-selected') {
      this.calculateTurnRemain();
    }

    this.setKissResult(game.result);
  }

  setActiveUser(uid) {
    [this._active] = this._store.table.findPlayer(uid);
  }

  setTargetUser(uid) {
    [this._target] = this._store.table.findPlayer(uid);
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