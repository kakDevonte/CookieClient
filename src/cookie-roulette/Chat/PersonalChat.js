import React from 'react';
import {inject, observer} from "mobx-react";

import Messages from "./Messages";
import Input from "./Input";

function PersonalChat({store, active}) {
  return (
    <section className={'personal-chat ' + active}>
      <section className="">Диалоги</section>
      <Messages messages={ store.chat.personalMessages } />
      <footer>
        <Input />
        <input type="button" value="►" onClick={ () => store.chat.send({key: 'Enter'}) }/>
      </footer>
  </section>
);
}

export default inject('store')( observer(PersonalChat) );