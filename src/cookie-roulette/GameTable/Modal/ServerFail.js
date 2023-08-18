import "./css/server-fail.css";

import React from "react";
import { inject, observer } from "mobx-react";

function ServerFail({ store }) {
  const className = () => {
    if (store.socket.serverFail) return "server-fail center-screen opened";
    return "server-fail center-screen";
  };

  return <div className={className()}>Игровой сервер не отвечает</div>;
}

export default inject("store")(observer(ServerFail));
