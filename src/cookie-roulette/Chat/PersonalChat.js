import './css/personal-chat.css';

import React, {useRef} from 'react';
import {inject, observer} from "mobx-react";

import Messages from "./Messages";
import Input from "./Input";
import Talk from "./Talk";

function PersonalChat({store, active, talks}) {

  const container = useRef();
  const content = () => {
    const t = [];

    talks.forEach((value, key) => {
      t.push(<Talk data={value} key={key} container={container.current} />);
    });

    return t;
  };

  const style = ()=> {
    if(store.chat.talkClosed) return {display: 'none'};
    return {};
  };

  return (
    <section className={'personal-chat ' + active}>
      <section className="personal-chats" ref={container}>
        { content() }
      </section>
      <section className={ 'personal-content' + store.chat.talkState }>
        <div className="pc-header">
          <div onClick={ () => store.chat.clickBackToPersonalMessages() }><i/>Назад</div>
          <div>{ store.chat.talkPlayer.name }</div>
        </div>
        <Messages messages={ store.chat.personalMessages } />
        <footer style={ style() }>
          <Input to={store.chat.talkPlayer.id} />
          <input
            type="button"
            value="►"
            onClick={ () => store.chat.send({key: 'Enter'}, store.chat.talkPlayer.id)}
          />
        </footer>
      </section>
  </section>
);
}

export default inject('store')( observer(PersonalChat) );