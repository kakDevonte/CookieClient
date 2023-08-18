import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Route,
  Switch,
} from "react-router-dom";
import qs from "qs";
import VKTest from "./cookie-modules/VKTest";

import CookieRoulette from "./App";
import { Provider } from "mobx-react";
import Store from "./store";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "./cookie-roulette/Profile/Profile";
import Shop from "./cookie-roulette/Shop/Shop";
// "main": "../CookieBottleServer/src/index.js",
const str = qs.parse(window.location.href);

let os = "windows";
if (
  str.vk_platform === "mobile_ipad" ||
  str.vk_platform === "mobile_iphone" ||
  str.vk_platform === "mobile_iphone_messenger"
) {
  os = "iOS";
}
///  "homepage": "./",
ReactDOM.render(
  <BrowserRouter>
    <Provider store={new Store(os, null, "vk")}>
      <CookieRoulette />
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root")
);
// if (process.env.NODE_ENV === "development") {
//import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }

// ReactDOM.render(<VKTest />, document.querySelector("#root"));
