const bcrypt = require("bcryptjs");
const {generateRandomString} = require('./stringHelper');
module.exports = {
  comparePass(pass, hash) {
    return bcrypt.compare(pass, hash)
      .then(result => result)
      .catch(err => {
        throw new Error(err.message);
      });
  },

  encryptPass(pass) {
    return bcrypt.hash(pass, 10);
  },

  generatePass(length) {
    return generateRandomString(length);
  }

}