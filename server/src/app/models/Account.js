const {Schema, model} = require('../../../config/db.config');

const AccountSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  confirmedEmail: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmedPhone: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmationCodeEmail: {
    type: String,
    select: false,
  },
  confirmationCodePhone: {
    type: String,
    select: false,
  },
}, {versionKey: false, timestamps: true});

AccountSchema.index({email: "text"});

module.exports = model('Account', AccountSchema);