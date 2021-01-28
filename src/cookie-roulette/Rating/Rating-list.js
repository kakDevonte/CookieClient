import React from 'react';
import {inject, observer} from "mobx-react";
import RatingListItem from "./RatingListItem";

function RatingList({list}) {

  const content = () => {
    const m = [];

    if(list.length) {
      list.forEach((value, index) => {
        m.push(<RatingListItem position={index + 1} data={value} key={index} />);
      });
    } else {
      m.push(<div className="loading center-XY"  key={0}/>)
    }

    return m;
  };

  return (
    <div className="rating-list custom-scroll">
      { content() }
    </div>
  );
}

export default inject('store')( observer(RatingList) );