import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

const secret = process.env.REACT_APP_BOTTLE_SECRET;
const algorithm = process.env.REACT_APP_BOTTLE_ALGORITHM;

export function encryptData(data) {
  try {
    return sha256(data);
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function decryptData(encData) {
  try {
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
