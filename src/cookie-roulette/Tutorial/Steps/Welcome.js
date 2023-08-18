import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

function Welcome({ store }) {
  useEffect(() => {
    store.tutorial.crateUser();
    store.tutorial.openShadowLayer();
  }, []);

  return (
    <div className="welcome-step info center-XY">
      <span className="info-header">Добро пожаловать!</span>
      <p>
        Здесь вы можете крутить бутылочку, знакомиться, общаться в чате, дарить
        подарки и найти свою вторую половинку.
      </p>
      <p>Давайте посмотрим, как это работает.</p>
      <div
        className="button-proceed-tutorial center-X"
        onClick={() => {
          store.amplitude.trackTutorialStep("Welcome Modal Started");
          store.tutorial.setStep("gameStart");
        }}
      >
        Начать!
      </div>
    </div>
  );
}

export default inject("store")(observer(Welcome));
