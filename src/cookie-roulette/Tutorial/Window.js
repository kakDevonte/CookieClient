import './css/tutorial.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function TutorialWindow({store}) {

  const clickProceed = () => {
    if(store.app.stage === "tutorial") {
      return () => {
        store.app.stageLobby();
      };
    } else {
      return () => {};
    }
  };

  return (
    <div className="tutorial-window">
      <header>Об игре</header>
      <section className="content-wrapper custom-scroll">
        <div className="content">
          <header>Добро пожаловать в Бутылочку!</header>
          <p>Здесь вы можете крутить бутылочку, знакомиться, общаться в чате, дарить подарки и найти свою вторую половинку</p>

          <p className="part-header">Меню игры</p>
          <div className="sample sample-menu center-X" />
          <p>
            Здесь находтся разные елементы управления,
            кнопка возврата в печеньку, счетик ваших печенек и поцелуев,
            кнопка магазина, кнопка смены стола,
            управление приложением от VK
          </p>

          <p className="part-header">Игровой стол</p>
          <div className="sample sample-game-table center-X" />
          <p>
            За ним находитесь вы и игроки, все по очереди крутят бутылочку,
            которая случайно выбирает другого игрока противоположного пола,
            с котрым вы сможете поцеловаться (т.е. обменяться знаками внимания), если захотите.
          </p>

          <p className="part-header">Общий чат</p>
          <div className="sample sample-chat center-X" />
          <p>
            Это игровой чат, в нем общаются все игроки сидящие за столом,
            также в нем видна информация о подарках сделанных игроками.
          </p>

          <p className="part-header">Личные чаты</p>
          <div className="sample sample-personal-chats center-X" />
          <p>
            Здесь находятся список ваших личных бесед с игроками,
            эти чаты видят только вы и тот с кем вы общаетесь. Для того что
            бы написать кому то, нажмите на его портрет на столе и нажмите кнопку "Личное сообщение",
            или же просто выберите существующий диалог, нажав на него в этом списке.
          </p>

          <p className="part-header">Подарки и функции</p>
          <div className="sample sample-inventory center-X" />
          <p>
            Нажав на портрет игрока на столе, откроется это меню, в котором вы можете
            посмотреть профиль игрока, написать ему личное сообщение или же сделать подарок.<br/>
            Если вы хотите сделать подарок выберите его и нажмите на него,
            если у вас достаточно печенек (или это ваш подарок и коллекции),
            вам будет предложено его подарить. Если вы согласисили все увидят как вы подарили
            кому-то подарок и в чате появится сообщение об этом.
          </p>

          <p className="part-header">Смена стола</p>
          <div className="sample sample-change-table center-X" />
          <p>
            Если же вы устали, заскучали или вам просто не нравятся игроки за этим столом,
            вы можете лгко сменить стол на другой нажав кнопку сверху в меню, и вы увидите этт вопрос.<br/>
            Решились? - Смели жмите да, игра подберет вам новый стол и новую компанию.
          </p>

          <p style={{fontSize: '120%', textAlign: 'center'}}>Знакомтесь, общайтесь, развлекайтесь, дарите друг другу подарки - вперед, начните играть сейчас!</p>
        </div>
      </section>
      <footer>
        <div className="proceed-button" onClick={ clickProceed() }>Хорошо, мне все ясно!</div>
      </footer>
    </div>
  );
}

export default inject('store')( observer(TutorialWindow) );