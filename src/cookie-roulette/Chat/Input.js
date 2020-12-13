import './css/chat-input-text.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function Input({store, to}) {
  return (
    <input
      type="text"
      value={ store.chat.text }
      placeholder={!to ? 'Написать в чат' : 'Личное сообщение'}
      onKeyPress={ event => store.chat.send(event, to) }
      onChange={ event => store.chat.input(event, to) }
    />
  );
}

export default inject('store')( observer(Input) );