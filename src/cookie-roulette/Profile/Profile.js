import './css/profile.css';

import cookieIcon from '../../images/cookie-icon.png';
import kiss from '../../images/kiss.svg';
import giftIcon from '../../images/gift-icon.png';

import React from 'react';
import {inject, observer} from "mobx-react";

const avatar = 'https://sun4-17.userapi.com/s/v1/ig2/dkJHbnaU6Z2Io248sz3j7nlBG6TcX7ksKBOegCgHw-ebEccr6nJmtWkTuHRa-zYOocSHfwQamU1wZyUtZmCs9THR.jpg?size=400x599&quality=95&crop=990,0,595,892&ava=1';
const cookieCount = 102;

const Profile = ({store}) => {
    console.log(store.user.data);
    console.log(store.user.data.first_name);
    //store.user.data.giftsCounter.receive
    //console.log(store.user.data.gifts);
    //store.user.updatePersonalInfo();
     //console.log('ЧЕЛОВЕК 1 = ', store.table.getPlayer(0));
    // console.log('ЧЕЛОВЕК 2 = ', store.table.getPlayer(1));
    // console.log('ЧЕЛОВЕК 3 = ', store.table.getPlayer(2));

    return (
        <div className={"profile" + store.profile.state}>
            <div className="profile-page">
                <header>
                    <i className="back-btn" onClick={() => store.profile.toggleProfile()}/>
                    <div className="title center-X">Профиль</div>
                </header>
                    <div className="custom-scroll-profile">
                        <div className="photo-container">
                          <img className="photo-low" src={store.user.data.photo_200} />
                          <img className="photo-normal" src={store.user.data.photo_200} />
                          <div className="bottom-black-bg"></div>
                          <span className="name">{store.user.data.first_name + ' ' + store.user.data.last_name}</span>
                        </div>
                        <div className="content-container">
                            <div className="cookies-counter">
                                {store.user.data.cookieCounter}
                                <img src={cookieIcon}/>
                                <div className="shop-button" onClick={() => store.shop.toggleShopPanel() }></div>
                            </div>
                            <div className="user-counters">
                                <article>
                                    <img src={kiss}/>
                                    <span className="title">Кол-во поцелуев:</span>
                                    <span className="gold-text">{store.user.data.kissCounter}</span>
                                </article>
                                <article>
                                    <img src={giftIcon}/>
                                    <span className="title">Кол-во полученных подарков:</span>
                                    <span className="gold-text">{store.user.data.giftsCounter}</span>
                                </article>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
};

export default inject('store')( observer(Profile) );
