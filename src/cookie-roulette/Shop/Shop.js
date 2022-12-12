import './css/shop.css';
import cookies from '../../images/cookies.png';

import React from 'react';
import {inject, observer} from "mobx-react";

const array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Shop({store}) {
    return (
        <div className={"shop-main" + store.shop.state}>
            <div className={"shop-root center-X"}>
                <div className="shop-container">
                    <header>
                        <span>Магазин</span>
                        <i className="close-button" onClick={() => store.shop.toggleShopPanel() }></i>
                    </header>
                    <div className="tabs-content custom-scroll">
                        {array.map(item => <Pack key={item}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const Pack = () => {
    return (
        <div className="pack hard-pack">
            <div className="pack-icon">
                <img src={cookies}/>
            </div>
            <div className="pack-info">
                <div className="pack-text">
                    300 печенек
                </div>
                <div className="pack-text gold-text">
                    +150 по акции
                </div>
                <div className="pack-buy-button">5 голосов</div>
            </div>
        </div>
    )
}

export default inject('store')( observer(Shop) );
