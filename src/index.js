import React from "react";
import ReactDOM from "react-dom";
import CookieRoulette from "./App";
import { Provider } from 'mobx-react';
import Store from "./store";

ReactDOM.render((
    <Provider store={new Store()}>
        <CookieRoulette />
    </Provider>
), document.querySelector("#root"));
