import "./css/complain.css";

import React from "react";
import { inject, observer } from "mobx-react";

const ModalComplain = ({ store }) => {
  const [variableName, setVariableName] = React.useState("");

  const sendReport = () => {
    if (variableName === "") return;

    const { to, id, text, date } = store.chat.report;

    store.user.sendComplain({
      to: id,
      uid: store.user.id,
      text,
      date,
      cause: variableName,
    });
    setVariableName("");
    store.chat.toggleModal();
  };

  return (
    <div className={"complain-main" + store.chat.state}>
      <div className={"complain-root center-X"}>
        <div className="complain-container">
          <i
            className="close-button"
            onClick={() => {
              setVariableName("");
              store.chat.toggleModal();
            }}
          ></i>
          <div className="text-center">
            <span className="header">
              Отправить жалобу на:
              <br />
              <span className="color-name">{store.chat.report.name}</span>
            </span>
          </div>
          <div className="radio">
            <div>
              <input
                type="radio"
                value="Спам"
                name="complain"
                onChange={(e) => setVariableName("Спам")}
                checked={variableName === "Спам"}
              />{" "}
              Спам
            </div>
            <div>
              <input
                type="radio"
                value="Оскорбление"
                name="complain"
                onChange={(e) => setVariableName("Оскорбление")}
                checked={variableName === "Оскорбление"}
              />{" "}
              Оскорбление
            </div>
            <div>
              <input
                type="radio"
                value="Пользователь младше 18"
                name="complain"
                onChange={(e) => setVariableName("Пользователь младше 18")}
                checked={variableName === "Пользователь младше 18"}
              />{" "}
              Пользователь младше 18
            </div>
          </div>
          <button className="btn-complain" onClick={sendReport}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(ModalComplain));
