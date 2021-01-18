import './css/talk-time-message.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import common from "../../config/common";

function TalkTimeMessage({count, date}) {
  const style = {};

  if(count) style.display = "none";
  date = common.getNormalDate(date, false, true, false, true);

  return (
    <span style={ style } className="talk-date">{ date[3] + ':' + date[4] }</span>
  );
}

export default inject('store')( observer(TalkTimeMessage) );