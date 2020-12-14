import './css/gift-group.css';

import React from 'react';
import {inject, observer} from "mobx-react";

import Gift from "./Gift";


function Group({store, group, type}) {

  const content = () => {
    const m = [];

    group.forEach((value, key) => {
      m.push(<Gift gift={value} key={key} type={type}/>);
    });

    return m;
  };

  return (
    <section className="gifts">
      { content() }
    </section>
  );
}

export default inject('store')( observer(Group) );