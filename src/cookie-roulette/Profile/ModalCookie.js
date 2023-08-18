import "./css/ModalCookie.css";

import React from "react";
import { inject, observer } from "mobx-react";

const ModalCookie = ({ store }) => {
  return (
    <div className={"cookie-main" + store.user.stateModal}>
      <div className={"cookie-root center-X"}>
        <div className="cookie-container">
          <span className="text-cookie">
            Вы получили {store.user.cookieCount} монет
          </span>
          <div className="btns">
            <button
              className="btn-delete"
              onClick={() => store.user.toggleModal()}
            >
              Хорошо
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(ModalCookie));
