import '../../css/chat.css'

import React from 'react';

class Chat extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="chat">
        <header>
          <div>Общий чат</div>
          <div>Личные сообщения</div>
        </header>
        <section className="messages" />
        <footer>
          <input type="text" value="Написать в чат"/>
          <input type="button"/>
        </footer>
      </article>
    );
  }
}

export default Chat;