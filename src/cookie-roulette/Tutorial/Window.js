import './css/tutorial.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function TutorialWindow() {
  return (
    <div className="tutorial-window">
      <header>Об игре</header>
      <section className="content-wrapper custom-scroll">
        <div className="content">
          <header>Добро пожаловать в Бутылочку!</header>
          <p>Здесь вы можете крутить бутылочку, знакомиться, общаться в чате, дарить подарки и найти свою вторую половинку</p>
          <p className="part-header">Иигровой стол</p>
          <div className="sample-1 center-X" />
          <p>за ним находятся игроки, которые по очереди крутят бутылочку</p>
        </div>
      </section>
      <footer>
        <div className="proceed-button">Хорошо, мне все ясно!</div>
      </footer>
    </div>
  );
}

export default inject('store')( observer(TutorialWindow) );