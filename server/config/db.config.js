const mongoose = require('mongoose');
const {DB_URI} = require('./env.config');

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error);
db.once("open", () => console.log("Successfully Connection on database: " + DB_URI));

module.exports = mongoose;
