import React, { useEffect } from "react";

function EndTutorial({ store, tutorial }) {
  const style = {};
  if (store.app.size.game.height > 600) style.top = 145;

  useEffect(() => {
    store.amplitude.trackTutorialStep("Changed Table");
    tutorial._disAccentAll();
    tutorial._accentItem(".change-table");
  }, []);

  return (
    <div className="end-tutorial-step info center-X" style={style}>
      <div className="arrow-end-tutorial" />
      <span className="info-header">Смени стол</span>
      <p>Давай подберем комнату где больше игроков.</p>
    </div>
  );
}

export default EndTutorial;
