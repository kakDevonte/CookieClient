import './css/rating.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import RatingListItem from "./RatingListItem";
import RatingList from "./Rating-list";

function Rating({store}) {

  const buttons = () => {
    const name = {
      today: '',
      week: '',
      month: ''
    };

    name[store.rating.period] = 'active';

    return (
      <div className="rating-period">
        <span className={name.day} onClick={ () => store.rating.requestRatingData('day') }>Сегодня</span>
        <span className={name.week} onClick={ () => store.rating.requestRatingData('week') }>За неделю</span>
        <span className={name.month} onClick={ () => store.rating.requestRatingData('month') }>За месяц</span>
      </div>
    );
  };

  return (
    <section className={'rating-panel sbg-bottle-light' + store.rating.state}>
      <header className="header-menu-rating">
        <i className="close-rating-bottle center-Y" onClick={ () => store.rating.toggleRatingPanel() } />
        <span className="center-XY">Самые зацелованные</span>
      </header>
      <div className="rating-type">
        <span onClick={ () => store.rating.setType('kisses') }>Поцелуи</span>
        <span onClick={ () => store.rating.setType('gifts') }>Подарки</span>
      </div>
      { buttons() }
      <RatingList list={store.rating.ratingList} />
      <div className="your-rating-position" style={store.app.size.ratingListItem}>
        <RatingListItem position={store.rating.myRating.position} data={store.rating.myRating} />
      </div>
    </section>
  );
}

export default inject('store')( observer(Rating) );