import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function Step({store}) {

  useEffect(() => {
    store.tutorial.crateUser();
  }, []);

  return (
    <div className="step-1 info center-XY">
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
        className="step-1 button-proceed-tutorial center-X"
        onClick={ () => store.tutorial.nextStepOne() }>
        Вперед, начинаем!
      </div>
    </div>
  );
}

export default inject('store')( observer(Step) );