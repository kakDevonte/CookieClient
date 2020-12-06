import './css/game-lobby.css';

import React from "react";
import {inject, observer} from "mobx-react";

function GameLobby({store}) {
  return (
    <section className="lobby">
      <div className="message">
        <header>Ищем стол</header>
        <span>подождите немного</span>
      </div>
      <i className="cookie center-screen" />
      <i className="kiss kiss-one" />
      <i className="kiss kiss-two" />
      <i className="kiss kiss-three" />
      <i className="kiss kiss-four" />
    </section>
  );
}

export default inject('store')( observer(GameLobby) );