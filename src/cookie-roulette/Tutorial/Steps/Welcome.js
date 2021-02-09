import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function Welcome({store}) {

  useEffect(() => {
    store.tutorial.crateUser();
  }, []);

  return (
    <div className="welcome-step info center-XY">
      <span className="info-header">Добро пожаловать в бутылочку</span>
      <p>
        Здесь вы можете крутить бутылочку, знакомиться,
        общаться в чате, дарить подарки и найти свою вторую
        половинку
      </p>
      <p>
        Это специальный обучающий стол, здесь мы научим тебя играть в нашу бутылочку
      </p>
      <p>
        Наши гости уже готовы к нам присоедениться, так что давай начнем обучение
      </p>
      <div
        className="welcome-step button-proceed-tutorial center-X"
        onClick={ () => store.tutorial.nextStep('gameStart') }>
        Вперед, начинаем!
      </div>
    </div>
  );
}

export default inject('store')( observer(Welcome) );