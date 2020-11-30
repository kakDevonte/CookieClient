import {makeObservable, observable, action, reaction} from "mobx";

class GameStore {

  _state = null;
  _round = null;
  _kissWindow = 'closed';
  _turnsRemain = 0;

  _rotateCookie = false;

  _active = null;
  _activeSeat = null;
  _activePlayer = null;
  _activeKiss = null;

  _target = null;
  _targetSeat = null;
  _targetSelector = null;
  _targetPlayer = null;
  _targetKiss = null;

  _kissResult = null;
  _timerDecision = null;
  _showRoundResult = false;

  constructor (store) {
    makeObservable(this, {
      _state: observable,
      _round: observable,
      _kissWindow: observable,
      _turnsRemain: observable,
      _rotateCookie: observable,
      _activeSeat: observable,
      _activePlayer: observable,
      _activeKiss: observable,
      _targetSeat: observable,
      _targetSelector: observable,
      _targetPlayer: observable,
      _targetKiss: observable,
      _kissResult: observable,
      _showRoundResult: observable,

      setState: action,
      setRound: action,
      setKissWindow: action,
      setTurnsRemain: action,
      setRotateCookie: action,
      setActiveSeat: action,
      setActivePlayer: action,
      setActiveKiss: action,
      setTargetSeat: action,
      setTargetSelector: action,
      setTargetPlayer: action,
      setTargetKiss: action,
      setKissResult: action,
      setShowRoundResult: action
    });

    this._store = store;

    reaction(() => this.activeKiss, () => this.calculateKissResult());
    reaction(() => this.targetKiss, () => this.calculateKissResult());
    reaction(() => this.kissWindow, () => this.autoDecision());
  }

  get state() { return this._state; }
  get round() { return this._round; }
  get kissWindow() { return this._kissWindow; }
  get turnsRemain() { return this._turnsRemain; }
  get rotateCookie() { return this._rotateCookie; }

  get active() { return this._active; }
  get activeSeat() { return this._activeSeat; }
  get activePlayer() { return this._activePlayer; }
  get activeKiss() { return this._activeKiss; }

  get target() { return this._target; }
  get targetSeat() { return this._targetSeat; }
  get targetSelector() { return this._targetSelector; }
  get targetPlayer() { return this._targetPlayer; }
  get targetKiss() { return this._targetKiss; }

  get kissResult() { return this._kissResult; }
  get showRoundResult() { return this._showRoundResult; }

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

  setTurnsRemain(turn) {
    if(turn === this._turnsRemain) return;
    this._turnsRemain = turn;
  }

  setRotateCookie(state) {
    if(state === this._rotateCookie) return;
    this._rotateCookie = state;
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

  setShowRoundResult(show) {
    if(show === this._showRoundResult) return;
    this._showRoundResult = show;
  }

  //////////////////////////////////////////////////////////////////////////

  calculateKissResult() {
    if(this.activeKiss != null && this.targetKiss != null) {
      this.setKissResult(this.activeKiss && this.targetKiss);
      setTimeout(() => this.setKissWindow('closed'), 2500);
    }
  }

  updateActivePlayer(uid) {
    const player = this._store.table.findPlayer(uid);

    if(player) {
      this._active = player;
      this.setActivePlayer(player.id);
      this.setActiveSeat(player.seat);
    } else {
      this._store.socket.emit('active-not-found', this._store.table.id);
    }
  }

  autoDecision(){
    this._timerDecision = setTimeout(() => {
      if(this.kissWindow === 'opened') {
        this.clickDecision(false, true);
      }
    }, 5100);
  }

  clickDecision(result, auto) {
    const
      uid = this._store.user.id,
      tid = this._store.table.id;

    let data;

    if(this._timerDecision) clearTimeout(this._timerDecision);

    if(this.activePlayer === uid) {
      if(this.activeKiss !== null) return;
      this.setActiveKiss(result);

      data = { kiss: result, tid, active: true, auto};
    } else {
      if(this.targetKiss !== null) return;
      this.setTargetKiss(result);

      data = { kiss: result, tid, uid, active: false, auto};
    }

    this._store.socket.emit('receive-kiss-result', data);
  }

  kissRequest(){
    this.setKissWindow('opened');
  }

  updateKiss(active, kiss) {
    if(active) {
      this.setActiveKiss(kiss);
    } else {
      this.setTargetKiss(kiss);
    }
  }

  rotateSelector() {
    //console.log('Start rotate cookie !!!');
    this.setRotateCookie(true);
    setTimeout( () => {
      //console.log('End rotate cookie !!!');
      this.setRotateCookie(false);

      //this._store.socket.emit('next-round');
    }, 3000);
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

  updateGameData(game){
    const table = this._store.table;

    this.setState(game.state);
    this.setRound(game.round);
    this.calculateTurnRemain();

    if(game.state === 'next-round'){
      this._active = null;
      this.setActivePlayer(game.player[0]);
      //this.setActiveSeat(null);
      this.setActiveKiss(game.player[2]);

      this._target = null;
      this.setTargetPlayer(game.target[0]);
      //this.setTargetSeat(null);
      setTimeout(() => this.setTargetSeat(null), 1000);
      this.setTargetKiss(game.target[2]);
    }else{
      if(game.player[0]) {
        this._active = table.findPlayer(game.player[0]);
      }

      if(this._active) {
        this.setActivePlayer(game.player[0]);
        this.setActiveSeat(this._active.seat);
        this.setActiveKiss(game.player[2]);
      }

      if(game.target[0]) {
        this._target = table.findPlayer(game.target[0]);
      }

      if(this._target) {
        this.setTargetPlayer(game.target[0]);
        this.setTargetSeat(this._target.seat);
        this.setTargetSelector(this._target.seat);
        this.setTargetKiss(game.target[2]);
      }
    }

    this.setKissResult(game.result);
  }

  doShowRoundResult(result) {
    if(!result) return;
    this.setShowRoundResult(true);
  }
}

export default GameStore