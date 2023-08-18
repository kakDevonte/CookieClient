import './css/adult.css';

import React from "react";
import {inject, observer} from "mobx-react";

function DeleteProfile({store}) {

    return (
        <section className="lobby sbg-bottle">
            <div className="message message-date">
                <header>Профиль удалён</header>
            </div>
            <div className="image-date">
                <i className="cookie center-screen" />
                <i className="kiss kiss-one" />
                <i className="kiss kiss-two" />
                <i className="kiss kiss-three" />
                <i className="kiss kiss-four" />
            </div>
            <span className="text-date">Мы будем ждать вас снова</span>
        </section>
    );
}

export default inject('store')( observer(DeleteProfile) );