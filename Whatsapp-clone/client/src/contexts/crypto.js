import { CryptoJS } from 'crypto-js';

const decryptText = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.SECRET_KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  console.log(decryptedText, ' decryptedText');
  return { decryptedText };
};
const encryptText = (text) => {
  console.log(process.env.SECRET_KEY);
  const encryptedText = CryptoJS.AES.encrypt(
    text,
    process.env.SECRET_KEY
  ).toString();
  console.log(encryptedText, ' encryptedText');

  return { encryptedText };
};

module.exports = { encryptText, decryptText };
