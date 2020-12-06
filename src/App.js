import './fonts/GothamPro/stylesheet.css';
import './css/common.css';

import "core-js/features/map";
import "core-js/features/set";

import React from "react";
import {inject, observer} from "mobx-react";

import GameLobby from "./cookie-roulette/Lobby/GameLobby";
import GameTable from "./cookie-roulette/GameTable/GameTable";


const CookieRoulette = ({store}) => {
  return (
    <div className="cookie-roulette">
      {
        {
          connection: (<div className="please-wait" />),
          lobby: (<GameLobby />),
          table: (<GameTable />),
        }[store.app.stage]
      }
    </div>
  )
};

export default inject('store')(observer(CookieRoulette));
