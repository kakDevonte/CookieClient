/**
 * Класс расширяющий Map с дополнительными методами для работы с индексами коллекции
 * remove() take() extract()
 */
class Collection {
  /**
   * Удаляет элементы коллекции по индексу
   * @param map {Map} - словарь Map
   * @param start {number} - начальный индекс
   * @param count {=number} - количество удаляемых элементов (по умолчанию 1)
   * @returns {number} - количество удаленных элементов
   */
  static remove(map, start, count = 1) {
    let
      key,
      i = 0,
      deleted = 0;

    for(key of map.keys()) {
      if(i === start) {
        map.delete(key);

        deleted++;
        start++;
        count--;

        if(count === 0) return deleted;
      }
      i++;
    }

    return deleted;
  }

  /**
   * Возвращает элементы из коллекции по индексу
   * @param map {Map} - словарь Map
   * @param start {number} - начальный индекс
   * @param count {=number} - количество нужных элементов (по умолчанию 1)
   * @param extract {=boolean} - используйте extract()
   * @returns {[]} - массив требуемых элементов
   */
  static take(map, start, count = 1, extract = false) {
    let
      key,
      i = 0,
      elements = [];

    for(key of map.keys()) {
      if(i === start) {
        elements.push( map.get(key) );
        if(extract) map.delete(key);

        start++;
        count--;

        if(count === 0) return elements;
      }
      i++;
    }

    return elements;
  }

  /**
   * Получает один элемент из коллекции
   * @param map - словарь Map
   * @param index - искомый индекс
   * @returns {*}
   */
  static takeOne(map, index){
    return Collection.take(map, index, 1)[0];
  }

  /**
   * Получает последний элемент из коллекции
   * @param map
   * @returns {*}
   */
  static takeLast(map) {
    const index = map.size - 1;
    return Collection.take(map, index, 1)[0];
  }

  /**
   * Извлекает элементы из коллекции по индексу, изменяя коллекцию
   * @param map {Map} - словарь Map
   * @param start {number} - начальный индекс
   * @param count {=number} - количество нужных элементов (по умолчанию 1)
   * @returns {[]} - массив извлеченных элементов
   */
  static extract(map, start, count = 1) {
    return this.take(map, start, count, true);
  }

  /**
   * Находит один елемент в коллекции и возвращает его или null
   * @param map {Map}
   * @param value {*}
   * @param key {string}
   * @returns {[item, index]}
   */
  static findOne(map, value, key) {
    let index, item;

    if(key) {
      for([index, item] of map.entries()) {
        if(item && item[key] === value) return [item, index];
      }
    } else {
      for([index, item] of map.entries()) {
        if(item === value) return [item, index];
      }
    }

    return [null, null];
  }
}

export default Collection;