import {action, makeObservable, observable} from "mobx";
import Collection from "../../helpers/Collection";

class TableStore {

  _id = null;
  _players = new Map();
  _groups = {
    male: 0,
    female: 0
  };

  constructor (store) {
    makeObservable(this, {
      _id: observable,
      _players: observable,

      id: action,
      setPlayer: action,
      updatePlayers: action,
    });
    this._store = store;
  }

  //////////////////////////////////////////////////////////////////

  get id() { return this._id; }
  get players() { return this._players; }

  getPlayer(index) { return this._players.get(index); }
  findPlayer(uid) { return Collection.findOne(this.players, uid, 'id'); }

  //////////////////////////////////////////////////////////////////

  set id(id) { this._id = id; }

  put(tid) { this.id = tid; }
  setPlayer(index, object) { this._players.set(index, object); }

  updatePlayers(tid, players){

    if(tid === this.id) {

      players.forEach((player, index) => {
        let update;
        const current = this.getPlayer(index);

        if(player){
          if(player.id === this._store.user.id) {
            player.itsMe = true;
          }

          if(!current) {
            update = true;
          }

          if(current && current.id !== player.id) {
            update = true;
          }
        } else {
          if(current) update = true;
        }

        if(update) this._players.set(index, player);
      });
    }
  }

  update(tid, groups, players) {
    this._groups = groups;
    this.updatePlayers(tid, players);
  }
}

export default TableStore;