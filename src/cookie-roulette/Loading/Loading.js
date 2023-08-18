import "./css/loading.css";

import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";

function Loading({ store }) {
  const history = useHistory();
  const [isOnline, setIsOnline] = React.useState(false);
  let interval = null;

  const InternetErrMessenger = () => setIsOnline(navigator.onLine === true);

  React.useEffect(() => {
    interval = setInterval(InternetErrMessenger, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (isOnline && store.socket.serverFail) {
      store.user.auth().then(() => {
        store.socket.connect();
      });
    }
  }, [isOnline]);
  //
  // useEffect(() => {
  //   const sid = setInterval(() => {
  //     if (isOnline && store.socket.serverFail) {
  //       store.user.auth().then(() => {
  //         store.socket.connect();
  //       });
  //     }
  //   }, 1500);
  //
  //   return () => {
  //     clearInterval(sid);
  //     //clearTimeout(tid);
  //   };
  // }, [isOnline]);

  return (
    <section className="loading-screen sbg-bottle">
      <span>Подключаемся</span>
      <i className="center-screen" />
    </section>
  );
}

export default inject("store")(observer(Loading));
