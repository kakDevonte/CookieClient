import './css/error.css';

import React from 'react';
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

function ErrorScreen({store}) {

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
      <Link to={'/'}>Вернуться назад</Link>
    </section>
  );
}

export default inject('store')( observer(ErrorScreen) );