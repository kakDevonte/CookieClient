import './css/shop.scss';
import fiveCoin from '../../images/coin/five-coin.png';

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


const saleItems = [
    {
        item_id: 1,
        title: '2000 монет',
        photo_url: '',
        cookie: 2000,
        promotion: 4000,
        count: 6000,
        price: 269
    },{
        item_id: 2,
        title: '500 монет',
        photo_url: '',
        cookie: 500,
        promotion: 1000,
        count: 1500,
        price: 59
    },{
        item_id: 3,
        title: '300 монет',
        photo_url: '',
        cookie: 300,
        promotion: 600,
        count: 900,
        price: 47
    },{
        item_id: 4,
        title: '100 монет',
        photo_url: '',
        cookie: 100,
        promotion: 200,
        count: 300,
        price: 16
    },{
        item_id: 5,
        title: '50 монет',
        photo_url: '',
        cookie: 50,
        promotion: 100,
        count: 150,
        price: 8
    },{
        item_id: 6,
        title: '30 монет',
        photo_url: '',
        cookie: 30,
        promotion: 60,
        count: 90,
        price: 5
    },
]


function Shop({store}) {

    const onClickBuy = async (index) => {
        const result = await bridge.send("VKWebAppShowOrderBox", {
            type: 'item',
            item: String(index)
        });
    }
//store.shop.toggleShopPanel()
    return (//+ store.shop.state
        <div className={"shop-main opened"}>
            <div className={"shop-root center-X"}>
                <div className="shop-container">
                    <header>
                        <span>Магазин</span>
                        <i className="close-button" onClick={() => store.history.goBack()}></i>
                    </header>
                    <div className="tabs-content custom-scroll">
                        {shopArr.map((item, index) => <Pack key={index} onClick={onClickBuy} {...item} index={index}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const Pack = ({cookie, promotion, price, onClick, index}) => {

    return (
        <div className="pack hard-pack">
            <div className="pack-icon">
                <img src={fiveCoin}/>
            </div>
            <div className="pack-info">
                <div className="pack-text">
                    {cookie} монет
                </div>
                <div className="pack-text gold-text">
                    +{promotion} по акции
                </div>
                <div className="pack-buy-button" onClick={() => onClick(index)}>{price} голосов</div>
            </div>
        </div>
    )
}

export default inject('store')( observer(Shop) );
