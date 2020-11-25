import {makeObservable, observable, action, reaction} from "mobx";

class GameStore {

  _state = null;
  _round = null;
  _kissWindow = 'closed';
  _turnsRemain = 0;

  _active = null;
  _activeSeat = null;
  _activePlayer = null;
  _activeKiss = null;

  _target = null;
  _targetSeat = null;
  _targetPlayer = null;
  _targetKiss = null;

  _kissResult = null;

  constructor (store) {
    makeObservable(this, {
      _state: observable,
      _round: observable,
      _kissWindow: observable,
      _turnsRemain: observable,
      _activeSeat: observable,
      _activePlayer: observable,
      _activeKiss: observable,
      _targetSeat: observable,
      _targetPlayer: observable,
      _targetKiss: observable,
      _kissResult: observable,

      setState: action,
      setRound: action,
      setKissWindow: action,
      setTurnsRemain: action,
      setActiveSeat: action,
      setActivePlayer: action,
      setActiveKiss: action,
      setTargetSeat: action,
      setTargetPlayer: action,
      setTargetKiss: action,
      setKissResult: action,
    });

    this._store = store;

    reaction(() => this.activeKiss, () => this.calculateKissResult());
    reaction(() => this.targetKiss, () => this.calculateKissResult());
  }

  get state() { return this._state; }
  get round() { return this._round; }
  get kissWindow() { return this._kissWindow; }
  get turnsRemain() { return this._turnsRemain; }

  get activeSeat() { return this._activeSeat; }
  get activePlayer() { return this._activePlayer; }
  get activeKiss() { return this._activeKiss; }

  get targetSeat() { return this._targetSeat; }
  get targetPlayer() { return this._targetPlayer; }
  get targetKiss() { return this._targetKiss; }

  get kissResult() { return this._kissResult; }

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

  //////////////////////////////////////////////////////////////////////////

  calculateKissResult() {
    if(this.activeKiss != null && this.targetKiss != null) {
      this.setKissResult(this.activeKiss && this.targetKiss);
      this.setKissWindow('closed');
    }
  }

  updateCurrentPlayer(uid) {
    const player = this._store.table.findPlayer(uid);

    //if(player) this.setCurrentTurn(player.seat);
  }

  clickDecision(result) {
    if(this.activePlayer === this._store.user.id) {
      this.setActiveKiss(result);
    } else {
      this.setTargetKiss(result);
    }
  }

  kissQuestion(seat){
    this.setKissWindow('opened');

    //this.updateDecisionResult('target', null, this._store.table.getPlayer(seat));

    // setTimeout( () => {
    //   this.setStageDecision('open');
    // }, 1000);
  }

  updateKiss(type, kiss) {
    if(type === 'active') {
      this.setActiveKiss(kiss);
    } else {
      this.setTargetKiss(kiss)
    }
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

  // _startGame(current) {
  //   if(current === null) return;
  //   if(this.currentTurn === current) return;
  //
  //   const player = Collection.takeOne(this._players, current);
  //
  //   if(player === null) return;
  //   if(player.id !== this._store.user.data.id) return;
  //   if(this._isPlayersReady()) return;
  //
  //   this.setCurrentTurn(current);
  //   this.updateDecisionResult('current', null, player);
  //
  //   setTimeout(() => {
  //     this._rotateRoulette();
  //   }, 1000);
  // }

  // _rotateRoulette(){
  //   const data = {
  //     tid: this.tid,
  //     uid: this._store.user.data.id
  //   };
  //
  //   console.log("Rotate roulette!");
  //
  //   this._socket.emit('rotate-roulette', data);
  // }

  updateGameData(game){
    const table = this._store.table;

    this.setState(game.state);
    this.setRound(game.round);

    this._active = table.findPlayer(game.player[0]);

    if(this._active) {
      this.setActivePlayer(game.player[0]);
      this.setActiveSeat(this._active.seat);
      this.setActiveKiss(game.player[2]);
    }

    this._target = table.findPlayer(game.target[0]);

    if(this._target) {
      this.setTargetPlayer(game.target[0]);
      this.setTargetSeat(this._target.seat);
      this.setTargetKiss(game.target[2]);
    }

    this.setKissResult(game.result);
  }

  // updateDecisionResult(group, result, player){
  //   this._kissDecision[group].result = result;
  //
  //   if(player) this._kissDecision[group].player = player;
  // }
}

export default GameStore