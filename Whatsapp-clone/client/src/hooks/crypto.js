import CryptoJS from 'crypto-js';

export const encryptText = (text) => {
  console.log(process.env.SECRET_KEY);
  const encryptedText = CryptoJS.AES.encrypt(
    text,
    process.env.REACT_APP_SECRET_KEY
  ).toString();

  return { encryptedText };
};

export const decryptText = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.REACT_APP_SECRET_KEY
  );
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  return { decryptedText };
};
