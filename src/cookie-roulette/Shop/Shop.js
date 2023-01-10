import './css/shop.scss';
import cookies from '../../images/cookies.png';

import React from 'react';
import {inject, observer} from "mobx-react";
import bridge from "@vkontakte/vk-bridge";

const shopArr = [
    {
    cookie: 2000,
    promotion: 4000,
    price: 269
},{
    cookie: 500,
    promotion: 1000,
    price: 59
},{
    cookie: 300,
    promotion: 600,
    price: 47
},{
    cookie: 100,
    promotion: 200,
    price: 16
},{
    cookie: 50,
    promotion: 100,
    price: 8
},{
    cookie: 30,
    promotion: 60,
    price: 5
},
]

function Shop({store}) {

    const onClickBuy = async (count, price) => {
        const result = await bridge.send("VKWebAppShowOrderBox", {
            type: price,
            item: `Покупка ${count} печенек`
        });
        // if(result.status === "success") {
        if(result.success) {
            store.user.buyCookies(count);
        } else {
            return;
        }
    }

    return (
        <div className={"shop-main" + store.shop.state}>
            <div className={"shop-root center-X"}>
                <div className="shop-container">
                    <header>
                        <span>Магазин</span>
                        <i className="close-button" onClick={() => store.shop.toggleShopPanel() }></i>
                    </header>
                    <div className="tabs-content custom-scroll">
                        {shopArr.map((item, index) => <Pack key={index} onClick={onClickBuy} {...item}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const Pack = ({cookie, promotion, price, onClick}) => {

    return (
        <div className="pack hard-pack">
            <div className="pack-icon">
                <img src={cookies}/>
            </div>
            <div className="pack-info">
                <div className="pack-text">
                    {cookie} печенек
                </div>
                <div className="pack-text gold-text">
                    +{promotion} по акции
                </div>
                <div className="pack-buy-button" onClick={() => onClick(cookie + promotion, price)}>{price} голосов</div>
            </div>
        </div>
    )
}

export default inject('store')( observer(Shop) );
