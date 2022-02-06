const jwt = require("jsonwebtoken");
const {v4: uuid} = require("uuid");
const {JWT_EXP, JWT_SECRET} = require("../../../config/env.config");

module.exports = {
  generateJWT(payload = {}, expiration = JWT_EXP, secret = JWT_SECRET) {
    return jwt.sign(payload, secret, {expiresIn: expiration});
  },

  generateRefreshToken() {
    return uuid().replace(/-/g, '');
  },

  verifyJWT(token, secret = JWT_SECRET) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secret);

        return resolve(decoded);
      } catch (err) {
        return reject({message: err.message});
      }
    })
  },
}