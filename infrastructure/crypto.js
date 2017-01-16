// Cache the crypto level privately
const bcrypt = require('bcrypt-nodejs');
const level  = 8;

export const encrypt = (text) => {
  const hash = bcrypt.hashSync(text, bcrypt.genSaltSync(level));

  return hash;
};

export const isMatch = (plainText, encryptedText) => {
  const isMatch = bcrypt.compareSync(plainText, encryptedText);

  return isMatch;
};
