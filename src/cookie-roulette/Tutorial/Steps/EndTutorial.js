import React, {useEffect} from 'react';

function EndTutorial({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.change-table');
  }, []);

  return (
    <div className="end-tutorial-step info center-X" >
      <span className="info-header">Смени стол</span>
      <p>Давай подберем комнату где больше игроков.</p>
    </div>
  );
}

export default EndTutorial;