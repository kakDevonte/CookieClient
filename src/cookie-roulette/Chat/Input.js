import "./css/chat-input-text.css";

import React from "react";
import { inject, observer } from "mobx-react";

function Input({ store, to }) {
  //const [isMyInputFocused, setIsMyInputFocused] = React.useState(false);

  return (
    <input
      type="text"
      maxLength="120"
      value={store.chat.text}
      placeholder={!to ? "Написать в чат" : "Личное сообщение"}
      onKeyPress={(event) => store.chat.send(event, to)}
      onChange={(event) => store.chat.input(event, to)}
      tabIndex="-1"
      // onKeyDown={(e) => {
      //   if (e.keyCode === 9) e.preventDefault();
      // }}
      // onBlur={() => store.app._calculateSizes(store.os)}
      // onFocus={() => setIsMyInputFocused(true)}
    />
  );
}

export default inject("store")(observer(Input));
