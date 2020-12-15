import './css/gift-group.css';

import React from 'react';
import {inject, observer} from "mobx-react";

import Gift from "./Gift";


function Group({store, group, type}) {

  const content = () => {
    const m = [];

    group.gifts.forEach((value, key) => {
      m.push(<Gift data={value} key={key} type={type}/>);
    });

    return m;
  };

  return (
    <section className="gift-group">
      <header>{group.name}</header>
      <div className="gifts">
        { content() }
      </div>
    </section>
  );
}

export default inject('store')( observer(Group) );