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
    this.getPlayer = this.getPlayer.bind(this);

    makeObservable(this, {
      _id: observable,
      _players: observable,

      setId: action,
      setPlayer: action,
      updatePlayers: action,
      setKissed: action,
      addGift: action
    });
    this._store = store;
  }

  //////////////////////////////////////////////////////////////////

  get id() { return this._id; }
  get players() { return this._players; }

  getPlayer(index) { return this._players.get(index); }

  /**
   * @param uid {string}
   * @returns {[{id, name, photo, gender, kissed, gifted, seat, type}, number]}
   */
  findPlayer(uid) { return Collection.findOne(this.players, uid, 'id'); }

  //////////////////////////////////////////////////////////////////

  setId(id) { this._id = id; }
  setPlayer(index, object) { this._players.set(index, object); }

  /**
   * Устанавливает поцелуи игроку
   * @param {string|number} key - index или id ирока
   * @param {array} kissed
   */
  setKissed(key, kissed) {
    const player = this.player(key);

    if(!player) return;
    player.kissed = kissed;
  }

  /**
   * Добавляет подарок игроку
   * @param {string|number} key - index или id ирока
   * @param {object} gift
   */
  addGift(key, gift) {
    const player = this.player(key);

    if(!player || !gift) return;
    player.gifted.push(gift);
  }

  player(key){
    let player;

    player = this._players[key];
    if(player) return player;
    [player] = this.findPlayer(key);
    if(player) return player;

    return null;
  }

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