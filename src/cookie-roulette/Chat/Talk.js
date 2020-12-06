import React from 'react';
import {inject, observer} from "mobx-react";

function Talk({store}) {
  return (
    <article onClick={ () => store.chat.clickOpenTalk() }>
      <i />
      <div className="content">
        <span>Имя фамилия</span>
        <span>Текст сообщения</span>
      </div>
      <div className="counter">
        <em>10</em>
      </div>
    </article>
  );
}

export default inject('store')( observer(Talk) );