import React, {useEffect} from 'react';
import bridge from "@vkontakte/vk-bridge"

import VideoStories from './videoStories';

function VKTest({}) {
  useEffect(() => {
    test();
  }, []);

  const clickOpenStoryBox = () => {
    let message;

    //message = "Текстовая строка предсказания о длинном предложении которое нужно для измерения размера необходимого нам в чтобы вписать текст в контейнер.";
    //message = "Доверяйте, но проверяйте.";
    //message = "Вас ждет Любовь. Скоро, совсем скоро.";
    //message = "Привет всем миром предсказания, о том как хрен.";
    //message = "Вскоре дружба поможет вам стать лучше, выйти на новый уровень.";
    //message = "Вы добьетесь успеха, но этого окажется недостаточно. Не стесняйтесь требовать для себя большего.";
    //message = "Придется приложить усилия, чтобы сохранить мир в родном доме. Умения слушать и слышать других вам в ближайшем будущем очень пригодится.";
    message = "Переоценка ценностей болезненна, но иногда необходима. Будьте благодарны тому, кто подтолкнет вас в нужном направлении — это друг.";

    VideoStories.openPredictStoryBox(message);
  };

  const test = async () => {
    await bridge.send("VKWebAppInit");
    const data = await bridge.send('VKWebAppGetUserInfo', {});

    VideoStories.init(7694274, bridge, data.id, 'android');
  };

  return (
    <input type="button" value="Поделиться" onClick={ clickOpenStoryBox } />
  );
}

export default VKTest;

//vk-tunnel --insecure=1 --http-protocol=https --ws-protocol=wss --host=localhost --port=1088