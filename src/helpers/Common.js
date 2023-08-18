import { _X, _y, _Y, c, m, n } from "../store";

const O = [13, 7, 4];

export const crypt = (data) => {
  let d = data;
  let i,
    o = 0,
    length,
    r = "";

  for (i = 0, length = d.length; i < length; i++) {
    o = 2;

    if (i % 2 === 0) o += 10;
    if (i % 5 === 0) o += 5;
    if (i % 7 === 0) o += 3;

    r += _X[_Y](d[_y](i) - o);
  }

  return r;
};

export const decrypt = (string) => {
  let i,
    length,
    char,
    result = "",
    t = "";

  for (i = 0, length = string.length; i < length; i++) {
    char = string[m](i);
    if (i > 0) {
      if (!(i % 2)) char -= O[0];
      if (!(i % 5)) char -= O[1];
      if (!(i % 7)) char -= O[2];
    }
    char = char - 97;
    char = char >= 0 ? (char > 9 ? char - 32 : char) : char + 32;
    t += char + "";

    if (t.length > 3) {
      result += c(n(t));
      t = "";
    }
  }

  try {
    result = JSON.parse(result);
  } catch (e) {
    return console.log("сломался", result);
  }
  return result;
};
//
// decrypt(string) {
//   try {
//     let i,
//       length,
//       o = 0,
//       result = "",
//       stats;
//
//     for (i = 0, length = string.length; i < length; i++) {
//       o = 2;
//       if (i % 2 === 0) o += 10;
//       if (i % 5 === 0) o += 5;
//       if (i % 7 === 0) o += 3;
//       result += String.fromCharCode(string.charCodeAt(i) + o);
//     }
//
//     // result = result.split("|");
//     return result;
//   } catch (e) {
//     return [];
//   }
// }
