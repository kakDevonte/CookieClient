import React from 'react';
import {inject, observer} from "mobx-react";

import Messages from "./Messages";
import Input from "./Input";

function CommonChat({store, active}) {
  return (
    <section className={'common-chat ' + active}>
      <div className="common-content">
        <Messages messages={ store.chat.messages } />
        <footer>
          <Input />
          <input type="button" value="►" onClick={ () => store.chat.send({key: 'Enter'}) }/>
        </footer>
      </div>
    </section>
  );
}

export default inject('store')( observer(CommonChat) );