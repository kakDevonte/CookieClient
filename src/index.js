import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import qs from 'qs';

import CookieRoulette from "./App";
import { Provider } from 'mobx-react';
import Store from "./store";

const parseStr = qs.parse(window.location.href);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={new Store(parseStr.vk_platform, null, 'vk')}>
        <CookieRoulette />
    </Provider>
  </BrowserRouter>
), document.querySelector("#root"));

// import VKTest from "./cookie-modules/VKTest";
//
// ReactDOM.render((
//   <VKTest />
// ), document.querySelector("#root"));
