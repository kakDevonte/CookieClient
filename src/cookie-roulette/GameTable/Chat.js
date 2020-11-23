import '../../css/chat.css'

import React from 'react';

class Chat extends React.Component{
  constructor(props) {
    super(props);

    this._n = 'colored-3';
  }

  render() {
    return (
      <article className="chat">
        <header>
          <div className="selected">Общий чат</div>
          <div>
            <span>Личные сообщения <em>10</em></span>
          </div>
        </header>
        <section className="messages">
          <article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
          <article className="message"><legend><span className={this._n}>Василий</span> говорит: </legend>Привет мир!</article>
          <article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
          <article className="message my-message"><legend>Вы говорите: </legend>фроыво оыырвфры оымвоывр мы нып овиоы пы впыом нвп офыавымпфо авфым пафывр мрыфм </article>
          <article className="message"><legend><span className={this._n}>Василий</span> говорит: </legend>Привет мир!</article>
          <article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
          <article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
          <article className="message"><legend><span className={this._n}>Василий</span> говорит: </legend>Привет мир!</article>
          <article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
        </section>
        <footer>
          <input type="text" value="" placeholder="Написать в чат" onChange={() => {}}/>
          <input type="button" value="►"/>
        </footer>
      </article>
    );
  }
}

export default Chat;