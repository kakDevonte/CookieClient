import React from "react";
import { inject, observer } from "mobx-react";
import RatingListItem from "./RatingListItem";

function RatingList({ store, list }) {
  const content = () => {
    const m = [];

    if (list.length) {
      list.forEach((value, index) => {
        m.push(
          <RatingListItem position={index + 1} data={value} key={index} />
        );
      });
    } else {
      m.push(<div className="loading-rating-list center-XY" key={0} />);
    }

    return m;
  };

  if (store.rating.error) {
    if (store.rating.error === "empty") {
      return (
        <div className="rating-list custom-scroll">
          <div className="error center-XY">
            <span>Никого еще нет</span>
            <br />
            <br />
            <span>станьте первым</span>
          </div>
        </div>
      );
    }
    return (
      <div className="rating-list custom-scroll">
        <div className="error center-XY">
          <span>Произошла ошибка</span>
          <br />
          <br />
          <span>данные не получены, попробуйте позже</span>
        </div>
      </div>
    );
  }

  return <div className="rating-list custom-scroll">{content()}</div>;
}

export default inject("store")(observer(RatingList));
