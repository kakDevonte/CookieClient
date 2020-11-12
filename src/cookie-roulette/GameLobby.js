import React from "react";

class GameLobby extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <section className="lobby">
        <div className="cookie center-screen" />
        <div className="kiss kiss-one" />
        <div className="kiss kiss-two" />
        <div className="kiss kiss-three" />
        <div className="kiss kiss-four" />
      </section>
    );
  }
}

export default GameLobby