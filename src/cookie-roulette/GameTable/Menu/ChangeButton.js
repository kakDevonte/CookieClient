import React, {useState} from 'react';
import common from "../../../config/common";

function ChangeButton({remain, click}) {
  const [classTooltip, setClassTooltip] = useState('tooltip center-X');

  const showTooltip = () => {
    setClassTooltip('tooltip center-X opened');

    setTimeout(() => {
      setClassTooltip('tooltip center-X');
    }, 2000);
  };

  if(remain) {
    return (
      <div className="change-table" onClick={ () => showTooltip() }>
        <span className="center-screen">{ remain }</span>
        <div className={classTooltip}>
          До смены стола: { common.wordEnding(remain, ['ход', 'хода', 'ходов']) }
          <div className="arrow-up center-X" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="change-table active" onClick={ click }>
        <i className="center-screen" />
      </div>
    );
  }
}

export default ChangeButton;