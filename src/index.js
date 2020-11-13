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
      gameStage: 'connection',
      users: []
    };

    bridge.send('VKWebAppGetUserInfo').then((response)=>{
      $user = response;
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

    this._socket.on('receive-users', (response)=>{
      this.setState({
        users: response
      });
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
        return  <GameTable users={this.state.users}/>;

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

  render(){
    return (
      <div className="cookie-roulette">
        {this._stage()}
      </div>
    );
  }
}

ReactDOM.render(<CookieRoulette />, document.querySelector("#root"));
