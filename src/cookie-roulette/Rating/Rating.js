import "./css/rating.css";

import React from "react";
import { inject, observer } from "mobx-react";
import RatingListItem from "./RatingListItem";
import RatingList from "./Rating-list";

function Rating({ store }) {
  const buttonsPeriod = () => {
    const name = {
      today: "",
      week: "",
      month: "",
    };

    name[store.rating.period] = "active";

    return (
      <div className="rating-period">
        <span
          className={name.day}
          onClick={() => store.rating.requestRatingData("day")}
        >
          Сегодня
        </span>
        <span
          className={name.week}
          onClick={() => store.rating.requestRatingData("week")}
        >
          За неделю
        </span>
        <span
          className={name.month}
          onClick={() => store.rating.requestRatingData("month")}
        >
          За месяц
        </span>
      </div>
    );
  };

  const buttonsType = () => {
    const type = {
      kisses: "",
      gifts: "",
    };

    type[store.rating.type] = "active";

    return (
      <div className="rating-type">
        <span
          className={type.gifts}
          onClick={() => store.rating.setType("gifts")}
        >
          Подарки
        </span>
        <span
          className={type.kisses}
          onClick={() => store.rating.setType("kisses")}
        >
          Поцелуи
        </span>
      </div>
    );
  };

  const header = () => {
    const text = {
      kisses: "Самые зацелованные",
      gifts: "Самые щедрые",
    };

    return text[store.rating.type];
  };
  //+ store.rating.state
  return (
    <section className={"rating-panel sbg-bottle-light opened"}>
      <header className="header-menu-rating">
        <i
          className="close-rating-bottle center-Y"
          onClick={() => store.history.goBack()}
        />
        <span className="center-XY">{header()}</span>
      </header>
      {buttonsType()}
      {buttonsPeriod()}
      <RatingList list={store.rating.ratingList} />
      <div
        className="your-rating-position"
        style={store.app.size.ratingListItem}
      >
        <RatingListItem
          position={store.rating.myRating.position}
          data={store.rating.myRating}
        />
      </div>
    </section>
  );
}

export default inject("store")(observer(Rating));
