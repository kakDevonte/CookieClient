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

    const profile = {
        photo: store.profile.myProfile ? store.user.data.photo_200 : store.profile.data.photo,
        fullName: store.profile.myProfile ? store.user.data.first_name + ' ' + store.user.data.last_name : store.profile.data.fullName,
        kisses: store.profile.myProfile ? store.user.data.kissCounter : store.profile.data.kissCounter,
        gifts: store.profile.myProfile ? store.user.data.giftsCounter : store.profile.data.giftsCounter,
    }

    return (
        <div className={"profile" + store.profile.state}>
            <div className="profile-page">
                <header>
                    <i className="back-btn" onClick={() => store.profile.toggleProfile()}/>
                    <div className="title center-X">Профиль</div>
                </header>
                <div className="custom-scroll-profile">
                    <div className="photo-container">
                          <img className="photo-low center-XY" src={profile.photo} />
                          <img className="photo-normal center-XY" src={profile.photo} />
                          <div className="bottom-black-bg"></div>
                          <span className="name">{profile.fullName}</span>
                        </div>
                        <div className="content-container">
                            {store.profile.myProfile ? <div className="cookies-counter">
                                {store.user.data.cookieCounter}
                                <img src={cookieIcon}/>
                                <div className="shop-button" onClick={() => store.shop.toggleShopPanel()}></div>
                            </div> : <div></div>}
                            <div className="user-counters">
                                <article>
                                    <img src={kiss}/>
                                    <span className="title">Кол-во поцелуев:</span>
                                    <span className="gold-text">{profile.kisses}</span>
                                </article>
                                <article>
                                    <img src={giftIcon}/>
                                    <span className="title">Кол-во полученных подарков:</span>
                                    <span className="gold-text">{profile.gifts}</span>
                                </article>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default inject('store')( observer(Profile) );
