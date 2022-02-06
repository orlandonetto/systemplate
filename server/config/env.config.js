require('dotenv').config({path: __dirname + '/../.env'});

module.exports = {
  PORT: process.env.PORT || 4000,
  DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/tictap',
  JWT_SECRET: process.env.JWT_SECRET || 'shhh1',
  JWT_SECRET_SECONDARY: process.env.JWT_SECRET_SECONDARY || 'shhh2',
  JWT_EXP: process.env.JWT_EXP || '1h',
}