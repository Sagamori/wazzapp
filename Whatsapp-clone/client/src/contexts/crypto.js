import CryptoJS from "crypto-js";

export const decryptText = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.REACT_APP_SECRET_KEY
  );
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  return { decryptedText };
};
export const encryptText = (text) => {
  const encryptedText = CryptoJS.AES.encrypt(
    text,
    process.env.REACT_APP_SECRET_KEY
  ).toString();

  return { encryptedText };
};
