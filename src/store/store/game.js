import {makeObservable, observable, action} from "mobx";

import common from "../../config/common";
import Collection from "../../helpers/Collection";

class GameStore {

  _currentTurn = null;
  _currentTarget = 0;
  _turnRemain = 0;


  _kissDecision = {
    stage: 'closed',
    current: {
      player: null,
      result: null,
    },
    target: {
      player: null,
      result: null
    }
  };

  // _game = {
  //   state: null,
  //   round: null,
  //   player: [],
  //   target: [],
  //   result: null
  // };

  constructor (store) {
    this.getPlayer = this.getPlayer.bind(this);
    //this._players.set('getPlayer', this.getPlayer);

    makeObservable(this, {
      _currentTurn: observable,
      _currentTarget: observable,
      _turnRemain: observable,
      _kissDecision: observable,
      _game: observable,

      setCurrentTurn: action,
      setCurrentTarget: action,
      setTurnRemain: action,
      setStageDecision: action,
      updateDecisionResult: action
    });

    this._store = store;
    this._socket = null;

    this._connect();
  }

  _connect() {
    this._socket = io(process.env.REACT_APP_SOCKET_SERVER);
  }

  get tid() {
    return this._tid;
  }





  get kissDecision() {
    return this._kissDecision;
  }

  get currentTurn() {
    return this._currentTurn;
  }

  get currentTarget() {
    return this._currentTarget;
  }

  get turnRemain() {
    return this._turnRemain;
  }

  updateDecisionResult(group, result, player){
    this._kissDecision[group].result = result;

    if(player) this._kissDecision[group].player = player;
  }

  setTurnRemain(count){
    this._turnRemain = count;
  }

  updateCurrentPlayer () {
    const player = this._store.table.findPlayer(uid);

    if(player) this.setCurrentTurn(player.seat);
  }


  kissQuestion(seat){
    this.setCurrentTarget(seat);

    this.updateDecisionResult('target', null, this._store.table.getPlayer(seat));

    setTimeout( () => {
      this.setStageDecision('open');
    }, 1000);
  }

  setCurrentTurn(index){
    this._currentTurn = index;
  }

  setCurrentTarget(target){
    this._currentTarget = target;
  }

  setStageDecision(stage){
    this._kissDecision.stage = stage;
  }

  calculateTurnRemain(){
    const
      store = this._store,
      uid = store.user.id;

    let index, current, my, result;


    index = 0;

    for(const player of store.players.values()) {
      if(player !== null){
        if(this.currentTurn === index){
          current = index;
        }

        if(uid === player.id){
          my = index;
        }
        index++;
      }
    }

    result = my - current;
    result = !isNaN(result) && result > -1 ? result : index - 1;

    //console.log('Turns!:', result);

    this.setTurnRemain(result);
  }



  _startGame(current) {
    if(current === null) return;
    if(this.currentTurn === current) return;

    const player = Collection.takeOne(this._players, current);

    if(player === null) return;
    if(player.id !== this._store.user.data.id) return;
    if(this._isPlayersReady()) return;

    this.setCurrentTurn(current);
    this.updateDecisionResult('current', null, player);

    setTimeout(() => {
      this._rotateRoulette();
    }, 1000);
  }

  _rotateRoulette(){
    const data = {
      tid: this.tid,
      uid: this._store.user.data.id
    };

    console.log("Rotate roulette!");

    this._socket.emit('rotate-roulette', data);
  }

  updateGameData(game){

  }

}

export default GameStore