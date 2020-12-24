class common {
  static randomiseUser(user) {
    const names = [
      null,
      ['Маша', 'Алена', 'Ирина', 'Марина', 'Люда', 'Таня'],
      ['Кирилл', 'Максим', 'Григорий', 'Федор', 'Петя', 'Василий']
    ];

    user.sex = this.randomNumber(1, 2);
    user.id = 'random_' + Date.now();
    user.first_name = this.randomFromArray( names[user.sex] );
  }

  static randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  static randomFromArray(array) {
    return array[ this.randomNumber(0, array.length - 1) ];
  }

  static getNormalDate(date, fullYear, time, utc, array){
    let options, day, month, year, hour, minute;

    if(date === 0) return ' - ';
    options = {};

    if(time === true){
      options.hour12 = false;
      options.hour = "2-digit";
      options.minute = "2-digit";
    }

    if(utc === true){
      options.timeZone = "UTC";
    }

    date = new Date(date);

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear().toString();

    if(day < 10) day = "0" + day;
    if(month < 10) month = "0" + month;

    if(fullYear !== true){
      year = year.charAt(2) + year.charAt(3);
    }

    if(time === true){
      hour = date.getHours();
      minute = date.getMinutes();

      if(hour < 10) hour = "0" + hour;
      if(minute < 10) minute = "0" + minute;

      return array ? [day, month, year, hour, minute] : `${day}.${month}.${year} ${hour}:${minute}`;
    }
    return array ? [day, month, year] : `${day}.${month}.${year}`;
  }

  /**
   *
   * @param {HTMLElement} active
   * @param {HTMLElement} target
   * @param {boolean} isActive
   * @return {[number, number]}
   */
  static calculateMovePosition(active, target, isActive) {
    let left, top;

    active = active.getBoundingClientRect();
    target = target.getBoundingClientRect();

    left = parseInt(active.x - target.x, 10);
    top = parseInt(active.y - target.y, 10);

    if(left < 0) left = left * -1;
    if(top < 0) top = top * -1;

    if(isActive) {
      if(active.x > target.x) left = left * -1;
      if(active.y > target.y) top = top * -1;
    }else {
      if(active.x < target.x) left = left * -1;
      if(active.y < target.y) top = top * -1;
    }

    return [left, top];
  }
}

export default common;
