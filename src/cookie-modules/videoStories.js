import common from "../config/common";

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
};

class VideoStories {
  constructor() {
    this._app_id = null;
    this._width = window.screen.width;
    this._height = window.screen.height;
    this._btidge = null;
    this._uid = null;
    this._os = null;
    this._scale = null;

    this._fontSize = 12;

    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext("2d");
    this._ctx.save();
  }

  /**
   * Инициализирует объект для дальнейшей работы
   * @param {number} app_id - id приложения VK
   * @param {*} bridge - VK Bridge
   * @param {number|string} uid - user id
   * @param {string} os - ось устройства (в iOS не нужно масштабировать)
   */
  init(app_id, bridge, uid, os) {
    if(this._init) return;

    this._app_id = app_id;
    this._btidge = bridge;
    this._uid = uid;
    this._os = os;
    this._scale = os === 'iOs' ? 1 : window.devicePixelRatio;

    this._init = true;
  }

  /**
   * Открывает редактор историй для предсказаний
   * @param {string} predict - текст предсказния
   * @param {=string} type - тип прдесказания ( blue | dark-purple | light-blue | light-green | light-purple | orange ),
   * без типа - случайное
   */
  openPredictStoryBox(predict, type) {
    if(!this._init) return;
    let url;

    const array = ['blue', 'dark-purple', 'light-blue', 'light-green', 'light-purple', 'orange'];
    const types = {
      'blue': 'https://bottle.cookieapp.ru:4444/public/stories/blue.mp4',
      'dark-purple': 'https://bottle.cookieapp.ru:4444/public/stories/dark-purple.mp4',
      'light-blue': 'https://bottle.cookieapp.ru:4444/public/stories/light-blue.mp4',
      'light-green': 'https://bottle.cookieapp.ru:4444/public/stories/light-green.mp4',
      'light-purple': 'https://bottle.cookieapp.ru:4444/public/stories/light-purple.mp4',
      'orange': 'https://bottle.cookieapp.ru:4444/public/stories/orange.mp4',
      'default': 'https://bottle.cookieapp.ru:4444/public/stories/stories-1.mp4'
    };

    url = types[type];
    if(!url) url = common.randomFromArray(array);

    this._processing(url, predict);
  }

  _processing(url, predict) {
    this._fontSize = 12 + 2 * ((this._width - 320) / 680);
    this._openStoryBox(url, this._createButton(), this._createPredict(predict));
  }

  /**
   * Создает изображение кнопки
   * @return { {width, height, blob} } - объект, сожержаий: ширину, высоту и изображение в base64
   * @private
   */
  _createButton() {
    const button = {};

    this._ctx.restore();

    button.width = (this._width * 0.9) * this._scale;
    button.height = (this._height * 0.083) * this._scale;

    this._canvas.width = button.width;
    this._canvas.height = button.height;

    //this._ctx.roundRect(0, 0, button.width, button.height, 15 * this._scale);
    //this._ctx.fillStyle = 'rgba(0,0,0,0.005)';
    //this._ctx.fill();

    button.blob = this._canvas.toDataURL();

    return button;
  }

  /**
   * Создает изображение с заданным текстом
   * @param {string} text - текст сообщения
   * @return { {width, height, blob} } - объект, сожержаий: ширину, высоту и изображение в base64
   * @private
   */
  _createPredict(text) {
    const predict = {};
    let data = {}, offset;

    this._ctx.restore();
    this._fontSize = this._fontSize * this._scale;

    predict.width = (this._width * 0.6) * this._scale;
    predict.height = (this._height * 0.14) * this._scale;

    this._canvas.width = predict.width;
    this._canvas.height = predict.height;

    //this._ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    //this._ctx.fillRect(0, 0, predict.width, predict.height);

    data = this._pretend(text);

    this._fontSize = data.font;

    this._ctx.font = `bold ${Math.floor(data.font) - 2}px Gotham Pro`;
    this._ctx.textAlign = "center";
    this._ctx.fillStyle = 'black';

    offset = data.strings.length * data.font - (data.font * 1.5);
    offset = predict.height / 2 - offset / 2;

    data.strings.forEach((phrase, index) => {
      this._ctx.fillText(phrase, predict.width / 2, data.font * index + offset, predict.width - 10);
    });

    predict.blob = this._canvas.toDataURL();

    return predict;
  }

  /**
   * Открывает радактор историй
   * @param {string} url
   * @param { {width, height, blob} } button
   * @param { {width, height, blob} } predict
   * @private
   */
  _openStoryBox(url, button, predict) {
    this._btidge.send("VKWebAppShowStoryBox", {
      background_type : "video",
      url : url,
      locked: true,
      stickers: [
        {
          sticker_type: "renderable",
          sticker: {
            content_type: "image",
            blob: button.blob,
            transform: {
              gravity: "center_bottom",
              translation_y: -0.125
            },
            can_delete: false,
            clickable_zones: [
              {
                action_type: "app",
                action: {
                  app_id: this._app_id,
                  app_context: "sp=" + this._uid
                },
                // action_type: 'link',
                // action: {
                //   link: "https://vk.com/cookiesapp#sp=" + this._uid
                // },
                clickable_area: [
                  {x: 0, y: 0},
                  {x: button.width, y: 0},
                  {x: button.width, y: button.height},
                  {x: 0, y: button.height},
                ]
              }
            ]
          }
        },
        {
          sticker_type: "renderable",
          sticker: {
            content_type: "image",
            blob: predict.blob,
            transform: {
              rotation: 1,
              gravity: "center",
              translation_y: -0.118,
              translation_x: 0.1
            },
            can_delete: false
          }
        }
      ]
    });
  }

  /**
   * Подбирает необходимый размер шрифта и кол-во строк для предсказания.
   * @param {string} message - строка текста
   * @param {=string} scale - начальный масштаб
   * @return {{strings: array, scale: string, font: number}}
   * @private
   */
  _pretend(message, scale) {
    let length, strings, font;

    if(!scale) {
      length = message.length;

      if(length < 32) {
        scale = 'giant';
      } else if(length < 52) {
        scale = 'bigger';
      } else if(length < 76) {
        scale = 'big';
      } else if(length < 110) {
        scale = 'large';
      } else {
        scale = 'normal';
      }
    }

    if(scale === 'giant') {
      font = this._fontSize * 2.4;
      strings = split(message, 14);

      if(strings.length > 2) {
        return this._pretend(message, 'bigger');
      }
    }

    if(scale === 'bigger') {
      font = this._fontSize * 2.1;
      strings = split(message, 16);

      if(strings.length > 3) {
        return this._pretend(message, 'big');
      }
    }

    if(scale === 'big') {
      font = this._fontSize * 1.65;
      strings = split(message, 18);

      if(strings.length > 4) {
        return this._pretend(message, 'large');
      }
    }

    if(scale === 'large') {
      font = this._fontSize * 1.3;
      strings = split(message, 21);

      if(strings.length > 5) {
        return this._pretend(message, 'normal');
      }
    }

    if(scale === 'normal') {
      font = this._fontSize;
      strings = split(message, 24);
    }

    return {font, strings, scale};


    function split(text, limit) {
      let i, length;
      let line, counter, word;
      let result = [''];

      text = text.split(' ');
      line = 0;
      counter = 0;

      for(i = 0, length = text.length; i < length; i++) {
        word = text[i];

        counter += word.length;

        if(counter > limit) {
          line++;
          counter = 0;
          result[line] = '';
        }

        result[line] += word + ' ';
        counter++;
      }

      return result;
    }
  }
}

/**
 * Готовый объект для постинга предсказний а сторис
 * init( app_id, bridge, uid, os ) - инициализация
 * openPredictStoryBox( predict, type ) - постинг
 */
export default new VideoStories();