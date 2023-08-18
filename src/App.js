import "./fonts/GothamPro/stylesheet.css";
import "./css/common.css";

import "core-js/features/map";
import "core-js/features/set";

import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

import GameLobby from "./cookie-roulette/Lobby/GameLobby";
import GameTable from "./cookie-roulette/GameTable/GameTable";
import Loading from "./cookie-roulette/Loading/Loading";
import ErrorScreen from "./cookie-roulette/Errors/ErrorScreen";
import Tutorial from "./cookie-roulette/Tutorial/Tutorial";
import Adult from "./cookie-roulette/Adult/Adult";
import DeleteProfile from "./cookie-roulette/DeleteProfile/DeleteProfile";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Profile from "./cookie-roulette/Profile/Profile";
import Shop from "./cookie-roulette/Shop/Shop";
import RatingPanel from "./cookie-roulette/Rating/Rating";

const CookieRoulette = ({ store }) => {
  store.history = useHistory();
  store.location = useLocation();

  useEffect(() => {
    //const token = await instance.get(`token/`);//${store.user}
    store.user
      .auth()
      .then(() => {
        store.app.keep(false);
        store.socket.connect();
      })
      .catch((e) => {
        console.log(e);
      });
    //store.user.setToken(token.data.token);

    return () => {
      if (store.app.keepConnect === false) store.app.closeApp();
    };
  }, []);

  const background = store.location.state && store.location.state.background;

  if (store.user.isDelete) {
    return (
      <div className="cookie-roulette" style={store.app.size.game}>
        <DeleteProfile />
      </div>
    );
  }

  return (
    <div className="cookie-roulette" style={store.app.size.game}>
      <Switch location={background || store.location}>
        <Route path="/game">
          <GameTable />
        </Route>
        <Route path="/adult">
          <Adult />
        </Route>
        <Route path="/lobby">
          <GameLobby />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/rating">
          <RatingPanel />
        </Route>
        <Route path="/delete">
          <DeleteProfile />
        </Route>
        <Route path="/connection">
          <Loading />
        </Route>
        <Route path="/tutorial">
          <Tutorial />
        </Route>
        <Route path="/error">
          <ErrorScreen />
        </Route>
      </Switch>
      <Switch location={store.location}>
        <Route path="/shop">
          <Shop />
        </Route>
      </Switch>
    </div>
  );
};

export default inject("store")(observer(CookieRoulette));
