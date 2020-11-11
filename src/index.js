import './common.css';
import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';

import GameLobby from "./cookie-roulette/GameLobby";
import UserProfile from "./cookie-roulette/UserProfile";
import GameTable from "./cookie-roulette/GameTable/GameTable";

//import bridge from "@vkontakte/vk-bridge";

//bridge.send("VKWebAppInit");

const $user = {
  "id": 281254431,
  "first_name": "Григорий",
  "last_name": "Семенов",
  "sex": 2,
  "city": {
    "id": 2801,
    "title": "Обь"
  },
  "country": {
    "id": 1,
    "title": "Россия"
  },
  "photo_100": "https://sun4-16.userapi.com/impf/c622220/v622220431/1ef0b/eE9frixxpWQ.jpg?size=100x0&quality=88&crop=192,311,496,496&sign=31cd07ba2fcad66bfc4602072c1d2843&ava=1",
  "photo_max_orig": "https://sun4-16.userapi.com/impf/c622220/v622220431/1ef0b/eE9frixxpWQ.jpg?size=0x0&quality=90&crop=192,311,496,600&sign=1653ca457df49480da802d9a069c3c14&ava=1",
  "bdate": "27.11.1989",
  "photo_200": "https://sun4-16.userapi.com/impf/c622220/v622220431/1ef0b/eE9frixxpWQ.jpg?size=200x0&quality=88&crop=192,311,496,496&sign=9c9ca8248bd9bfb451ca681507c9f8db&ava=1",
  "timezone": 7
};


class CookieRoulette extends React.Component{
  constructor(props){
    super(props);

    this._socket = null;

    this.state = {
      gameStage: 'lobby',
      users: []
    };

    this._sockets();
  }

  _sockets(){
    this._socket = io('http://localhost:5000/');
    //this._socket = io('https://chat-test-irs-server.herokuapp.com/?user=' + this._user.id);

    this._socket.on('request-info', ()=>{
      this._socket.emit('user-info', $user);
      this._onLobby();
    });

    this._socket.on('receive-users', (response)=>{
      this.setState({
        gameStage: 'table',
        users: response
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
      default:
        return <GameLobby />;
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
