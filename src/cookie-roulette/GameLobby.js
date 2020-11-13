import React from "react";

class GameLobby extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <section className="lobby">
        <div className="message">
          <header>Ищем стол</header>
          <span>подождите немного</span>
        </div>
        <i className="cookie center-screen" />
        <i className="kiss kiss-one" />
        <i className="kiss kiss-two" />
        <i className="kiss kiss-three" />
        <i className="kiss kiss-four" />
      </section>
    );
  }
}

export default GameLobby