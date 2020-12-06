import React from 'react';
import {inject, observer} from "mobx-react";

import Messages from "./Messages";
import Input from "./Input";
import Talk from "./Talk";

function PersonalChat({store, active}) {
  return (
    <section className={'personal-chat ' + active}>
      <section className="personal-chats">
        {/*<Talk />*/}
      </section>
      <section className={ 'personal-content' + store.chat.talkState }>
        <div className="pc-header">
          <div onClick={ () => store.chat.clickBackToPersonalMessages() }><i/>Назад</div>
          <div>{ store.chat.talkPlayer.name }</div>
        </div>
        <Messages messages={ store.chat.personalMessages } />
        <footer>
          <Input />
          <input type="button" value="►" onClick={ () => store.chat.send({key: 'Enter'}) }/>
        </footer>
      </section>
  </section>
);
}

export default inject('store')( observer(PersonalChat) );