import './common.css';
import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';

import GameLobby from "./cookie-roulette/GameLobby";
import UserProfile from "./cookie-roulette/UserProfile";
import GameTable from "./cookie-roulette/GameTable/GameTable";

import bridge_moc from "@vkontakte/vk-bridge-mock";
import bridge_real from "@vkontakte/vk-bridge";


const bridge = process.env.NODE_ENV === 'production' ? bridge_real : bridge_moc;

bridge.send("VKWebAppInit");

let $user;


class CookieRoulette extends React.Component{
  constructor(props){
    super(props);

    this._socket = null;

    this.state = {
      tid: null,
      gameStage: 'connection',
      users: []
    };

    bridge.send('VKWebAppGetUserInfo').then((response)=>{
      $user = response;

      randomiseUser($user);

      $user.id = $user.id + '';
      this._sockets();
    });
  }

  _sockets(){
    this._socket = io(process.env.REACT_APP_SOCKET_SERVER);

    this._socket.on('request-info', ()=>{
      this._socket.emit('user-info', $user);
    });

    this._socket.on('connect-success', ()=>{
      this._onLobby();
    });

    this._socket.on('put-table', (res) => {
      this._onTable(res.uid, res.tid);
    });

    this._socket.on('update-players', (response) => {
      this._updateTablePlayers(response.tid, response.players);
    });

    this._socket.on('current-stage', (stage)=>{
      this.setState({
        gameStage: stage.current
      });
    });

    this._socket.on('console', (res)=> console.log(res));
  }

  _stage(){
    switch(this.state.gameStage){
      case 'table':
        return  <GameTable users={this.state.users} tid={this.state.tid}/>;

      case 'profile':
        return <UserProfile />;

      case 'lobby':
        return <GameLobby />;

      case 'connection':
      default:
        return <div className="please-wait" />;
    }
  }

  _onLobby(){
    if(this.state.gameStage !== 'lobby'){
      this.setState({gameStage: 'lobby'});
      this._socket.emit('in-lobby');
    }
  }

  _onTable(uid, tid){
    if(uid !== $user.id) return;
    if(this.state.gameStage === 'table') return;

    this.setState({
      tid: tid,
      gameStage: 'table'
    });

    this._socket.emit('in-table', tid);
  }

  _updateTablePlayers(tid, players){
    if(tid === this.state.tid){
      this.setState({
        users: players
      });
    }
  }

  render(){
    return (
      <div className="cookie-roulette">
        {this._stage()}
      </div>
    );
  }
}

ReactDOM.render(<CookieRoulette />, document.querySelector("#root"));


function randomiseUser(user) {
  const names = [
    null,
    ['Маша', 'Алена', 'Ирина', 'Марина', 'Люда', 'Таня'],
    ['Кирилл', 'Максим', 'Григорий', 'Федор', 'Петя', 'Василий']
  ];

  user.sex = randomNumber(1, 2);
  user.id = Date.now() + '';
  user.first_name = randomFromArray( names[user.sex] );
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function randomFromArray(array) {
  return array[ randomNumber(0, array.length - 1) ];
}