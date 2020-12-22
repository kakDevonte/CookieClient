import './css/loading.css';

import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {useHistory} from 'react-router-dom';

function Loading({store}) {
  const history = useHistory();

  useEffect(() => {
    const tid = setTimeout(() => {
        history.push('/');
      }, 30000);

    return () => {
      clearTimeout(tid);
    };
  }, []);

  return (
    <section className="loading-screen">
      <span>Подключаемся</span>
      <i className="center-screen" />
    </section>
  );
}

export default inject('store')( observer(Loading) );