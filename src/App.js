import './fonts/GothamPro/stylesheet.css';
import './css/common.css';

import "core-js/features/map";
import "core-js/features/set";

import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";

import GameLobby from "./cookie-roulette/Lobby/GameLobby";
import GameTable from "./cookie-roulette/GameTable/GameTable";
import Loading from "./cookie-roulette/Loading/Loading";


const CookieRoulette = ({store}) => {

  useEffect(() => {
    store.app.keep(false);
    store.socket.connect();

    return () => {
      if(store.app.keepConnect === false) store.app.closeApp();
    };
  }, []);

  return (
    <div className="cookie-roulette" style={store.app.size.game}>
      {
        {
          connection: (<Loading />),
          lobby: (<GameLobby />),
          table: (<GameTable />),
        }[store.app.stage]
      }
    </div>
  )
};

export default inject('store')(observer(CookieRoulette));
