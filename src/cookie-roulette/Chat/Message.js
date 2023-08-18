import "./css/message.css";

import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import common from "../../config/common";
import icon from "../../images/warning-icon.png";

const Message = ({ store, message, container }) => {
  useEffect(() => {
    if (container) container.scrollTop = container.scrollHeight;
  }, []);

  const isTutor = store.app.stage !== "tutorial";
  const onClickComplain = (mess) => {
    store.chat.setReport({
      id: message.from.id,
      text: message.text,
      date: message.date,
    });
    store.chat.toggleModal();
  };

  if (message.from.id === "server-greetings") {
    return (
      <article
        title={common.getNormalDate(message.date, false, true)}
        className="message"
      >
        <div>
          <span className="colored-greetings">{message.text}</span>
        </div>
        {/*<img className="complain-btn" src={icon}/>*/}
      </article>
    );
  }

  if (message.from.id === "server-gift") {
    return (
      <article
        title={common.getNormalDate(message.date, false, true)}
        className="message gift"
      >
        <div>
          <i className="center-Y" />
          <span>{message.text}</span>
        </div>
      </article>
    );
  }

  if (store.user.id === message.from.id) {
    return (
      <article
        title={common.getNormalDate(message.date, false, true)}
        className="message my-message"
      >
        <div>Вы говорите: </div>
        <span>{message.text}</span>
      </article>
    );
  }

  if (message.to) {
    return (
      <article
        title={common.getNormalDate(message.date, false, true)}
        className="message"
      >
        <div>
          <span className={"colored-" + message.from.seat}>
            {message.from.name}:
          </span>{" "}
        </div>
        <span>{message.text}</span>
        {message.text !== "Игрок покинул стол" && isTutor && (
          <img
            className="complain-btn"
            src={icon}
            onClick={() => onClickComplain(message)}
          />
        )}
      </article>
    );
  }

  return (
    <article
      title={common.getNormalDate(message.date, false, true)}
      className="message"
    >
      <div>
        <span className={"colored-" + message.from.seat}>
          {message.from.fullName}:{" "}
        </span>
      </div>
      <span>{message.text}</span>
      {isTutor && (
        <img
          className="complain-btn"
          src={icon}
          onClick={() => onClickComplain(message)}
        />
      )}
    </article>
  );
};

export default inject("store")(observer(Message));
