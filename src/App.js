import './fonts/GothamPro/stylesheet.css';
import './css/common.css';

import "core-js/features/map";
import "core-js/features/set";
import React, {useState, useEffect, useReducer, useRef} from "react";
import io from 'socket.io-client';

import GameLobby from "./cookie-roulette/GameLobby";
import UserProfile from "./cookie-roulette/UserProfile";
import GameTable from "./cookie-roulette/GameTable/GameTable";

import common from "./config/common";
import {inject, observer} from "mobx-react";

const socket = io(process.env.REACT_APP_SOCKET_SERVER);


class watcher {
  constructor(stage) {
    this._ref = useRef(stage);

    useEffect(() => {
      this._ref.current = stage;
    },[stage]);

    return this;
  }

  get v(){
    return this._ref.current;
  }
}

const CookieRoulette = ({store}) => {

  const [gameStage, setGameStage] = useState('connection');
  const [users, setUsers] = useState([]);


  const gStage = new watcher(gameStage);

  //const [gameStage, setGameStage] = useReducer(changeGameStage, 'connection');


  function changeGameStage(state, gameStage){
    console.log('Old:', state, "New:", gameStage);
    return gameStage;
  }

  useEffect(() => {
    if (store.user.data) {
      console.log('useEffect user.data');
      loadSockets();
    }
  }, []);

  useEffect(() => {
    if (store.user.table) {
        console.log('table effect');
        socket.emit('in-table', store.user.table);
    }
  }, [store.user.table]);

  function loadSockets(){
    console.log("LOAD SOCETS");

    socket.on('request-info', () => {
      socket.emit('user-info', store.user.data);
    });

    socket.on('connect-success', successConnect_Socket);

    socket.on('put-table', putTable_Socket);

    socket.on('update-players', updatePlayers_Socket);

    socket.on('current-stage', (stage) => {
      setGameStage(stage.current);
    });

    socket.on('console', (res) => console.log(res));
  }

  function putTable_Socket(res) {
    console.log('put-table_Socket', gameStage);
    onTable(res.uid, res.tid);
  }

  function successConnect_Socket(){
    console.log('connect-success_Socket', gameStage);
    toLobby();
  }

  function updatePlayers_Socket(response) {
    console.log('update-player_Socket', gameStage);
    console.log('update-player_Watcher', gStage.v);
    updatePlayers(response.tid, response.players);
  }

  const toLobby = () => {
  console.log('toLobby', gameStage);
      if(gameStage !== 'lobby'){
          setGameStage('lobby');
          socket.emit('in-lobby');
      }
  };

  const onTable = (uid, tid) => {
      if(uid !== store.user.data.id) return;
      if(gameStage === 'table') return;

      store.user.table = tid;
      setGameStage('table');
  };

  const updatePlayers = (tid, players) => {
      if(tid === store.user.table) {
          players.forEach(player => {
              if(common.randomNumber(0, 1)) player.kissed.push(true);
              if(player.id === store.user.data.id) {
                  player.itsMe = true;
              }
          });

          setUsers(players)
      }
  };

  return (
      <div className="cookie-roulette">
          {
              {
                  connection: (<div className="please-wait" />),
                  lobby: (<GameLobby />),
                  profile: (<UserProfile />),
                  table: (<GameTable users={users} />),
              }[gameStage]
          }
      </div>
  )
};

export default inject('store')(observer(CookieRoulette));
