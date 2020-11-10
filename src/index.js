import './common.css';
import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';
//import bridge from "@vkontakte/vk-bridge";

//bridge.send("VKWebAppInit");


class CookieRoulette extends React.Component{
  render(){
    return (
      <div className="cookie-roulette">

      </div>
    );
  }
}

ReactDOM.render(<CookieRoulette />, document.querySelector("#root"));
