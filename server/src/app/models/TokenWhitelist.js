const {Schema, model} = require('../../../config/db.config');

const TokenWhitelistSchema = new Schema({
  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
}, {versionKey: false, timestamps: true});

TokenWhitelistSchema.index({refreshToken: "text"});

module.exports = model('TokenWhitelist', TokenWhitelistSchema);