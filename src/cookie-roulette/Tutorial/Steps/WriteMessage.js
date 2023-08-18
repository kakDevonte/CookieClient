import React, { useEffect } from "react";

function WriteMessage({ store, tutorial }) {
  const style = {};
  if (store.app.size.game.height > 600) style.bottom = 150;

  useEffect(() => {
    tutorial._disAccentAll();
    store.amplitude.trackTutorialStep("Sent Message");
    tutorial._accentItem(".personal-chat footer");
  }, []);

  return (
    <div className="write-message-step info center-X" style={style}>
      <span className="info-header">Отправь личное сообщение</span>
      <p style={{ textAlign: "center" }}>Напиши ответное сообщение игроку.</p>
      <div className="arrow-write-message" />
    </div>
  );
}

export default WriteMessage;
