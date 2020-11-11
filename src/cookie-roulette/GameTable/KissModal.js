import React from "react";

class KissModal extends React.Component{
  render(){
    return (
      <section className="kiss center-screen">
        <div className="info">
          <article className="player" />
          <article className="player" />
        </div>
        <div className="question">Поцелеуте?</div>
        <div className="actions">
          <input type="button" value="Да"/>
          <input type="button" value="Нет"/>
        </div>
      </section>
    );
  }
}

export default KissModal;