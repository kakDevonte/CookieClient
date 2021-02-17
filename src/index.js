import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import CookieRoulette from "./App";
import { Provider } from 'mobx-react';
import Store from "./store";

ReactDOM.render((
  <BrowserRouter>
    <Provider store={new Store('windows', null, 'vk')}>
        <CookieRoulette />
    </Provider>
  </BrowserRouter>
), document.querySelector("#root"));

// import VKTest from "./cookie-modules/VKTest";
//
// ReactDOM.render((
//   <VKTest />
// ), document.querySelector("#root"));
