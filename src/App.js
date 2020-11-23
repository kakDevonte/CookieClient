import './fonts/GothamPro/stylesheet.css';
import './css/common.css';

import "core-js/features/map";
import "core-js/features/set";
import React, {useState, useEffect, useRef} from "react";
//import io from 'socket.io-client';

import GameLobby from "./cookie-roulette/GameLobby";
import UserProfile from "./cookie-roulette/UserProfile";
import GameTable from "./cookie-roulette/GameTable/GameTable";

//import common from "./config/common";
import {inject, observer} from "mobx-react";

//const socket = io(process.env.REACT_APP_SOCKET_SERVER);


const CookieRoulette = ({store}) => {

  const [gameStage, setGameStage] = useState('connection');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setGameStage(store.game.stage);
  }, [store.game.stage]);

  useEffect(() => {
    setUsers(store.game.players);
  }, [store.game.players]);

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
