import './css/rating-list-item.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function RatingListItem({store, position, data}) {

  const openProfile = () => {
    store.profile.toggleMyProfile(data.id === store.user.id);
    store.profile.setData(data);
    store.app.keep(true);
    store.profile.toggleProfile();
  };

  const positionContent = () => {
    switch(position) {
      case 1:
        return <i className="gold center-XY" />;

      case 2:
        return <i className="silver center-XY" />;

      case 3:
        return <i className="bronze center-XY" />;

      case '>1000':
        return <span className="max-position center-XY">{position}</span>;

      default:
        return <span className="center-XY">{position}</span>;
    }
  };

  const style = { width: store.app.size.ratingListItem.height };
  const photo = { backgroundImage: `url('${data.photo}')` };

  if(!data.id) return <article className="rating-list-item" style={store.app.size.ratingListItem} />;

  const countOnType = () => {
    return data[store.rating.type];
  };

  return (
    <article className="rating-list-item" onClick={ () => openProfile() } style={store.app.size.ratingListItem} >
      <div className="r-position" style={style}> { positionContent() }</div>
      <div className="r-photo" style={style} >
        <i className="center-XY" style={photo} />
      </div>
      <span className="r-name center-Y">{ data.fullName }</span>
      <i className={ "r-kiss-icon rating-icon-" + store.rating.type } style={style} />
      <span className="r-kisses center-Y">{ countOnType() }</span>
      <div className="r-separator" />
    </article>
  );
}


export default inject('store')( observer(RatingListItem) );