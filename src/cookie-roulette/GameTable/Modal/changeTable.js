import './css/change-table.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function ChangeTable({store}){

  return (
      <article className={ 'confirm-change-table center-screen' + store.game.changeTableWindow }>
        <div className="message-info">{store.user.data.first_name}, вы действительно хотите покинуть этот стол и поискать новый?</div>
        <div className="actions">
          <span onClick={ () => store.game.clickChangeTable(true) } >Сменить стол</span>
          <span onClick={ () => store.game.clickChangeTable(false) } >Отмена</span>
        </div>
      </article>
  );
}

export default inject('store')( observer(ChangeTable) );