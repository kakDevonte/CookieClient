import React from 'react';
import {inject, observer} from "mobx-react";

function Input({store}) {
  return (
    <input
      type="text"
      value={ store.chat.text }
      placeholder="Написать в чат"
      onKeyPress={ event => store.chat.send(event) }
      onChange={ event => store.chat.input(event) }
    />
  );
}

export default inject('store')( observer(Input) );