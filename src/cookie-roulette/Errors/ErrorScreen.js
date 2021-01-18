import './css/error.css';

import React from 'react';
import {useHistory} from "react-router-dom";
import {inject, observer} from "mobx-react";

function ErrorScreen({store}) {
  const history = useHistory();

  const errors = () => {
    const e = [];

    store.app.errors.forEach((error, n) => {
      e.push(<span key={n}>{error}</span>);
    });

    return e;
  };

  return (
    <section className="error-screen">
      <span>К сожалению,<br/>произошла ошибка...</span>
      <div>{ errors() }</div>
      <div onClick={ () => history.goBack() } className="goBackButton" >Вернуться назад</div>
    </section>
  );
}

export default inject('store')( observer(ErrorScreen) );