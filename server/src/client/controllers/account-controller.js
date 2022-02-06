const Account = require('../../app/models/Account');
const TokenWhitelist = require('../../app/models/TokenWhitelist');
const {sendError} = require('../middlewares/response');
const {generateJWT, generateRefreshToken} = require('../../app/helpers/tokenHelper');
const {comparePass} = require('../../app/helpers/passHelper');

async function generateTokens(_id) {
  if (!_id) throw new Error("invalid _id");

  const accessToken = generateJWT({sub: _id})
  const refreshToken = generateRefreshToken();

  // Save a refresh token.
  await TokenWhitelist.updateOne({account: _id}, {$set: {refreshToken, account: _id}}, {upsert: true});

  return {accessToken, refreshToken}
}

module.exports = {
  async signUp(req, res) {
    try {
      const account = await Account.create(req.body);

      if (!account || !account._id) throw new Error("Fail to create Account.");

      const {accessToken, refreshToken} = await generateTokens(account._id);

      res.status(200).json({accessToken, refreshToken});
    } catch (err) {
      return sendError(req, res, 'sign-up account', err.message);
    }
  },

  async signIn(req, res) {
    try {
      const account = await Account.findOne({email: req.body.email}, {_id: 1, password: 1});

      // Check pass -> Throw Error if invalid.
      comparePass(req.body.password, account.password);

      const {accessToken, refreshToken} = await generateTokens(account._id);

      return res.status(200).json({accessToken, refreshToken});
    } catch (err) {
      return sendError(req, res, 'sign-in account', err.message);
    }
  },

  async signOut(req, res) {
    try {
      const _id = res.locals['authenticated'].sub;

      // Delete Refresh Token
      await TokenWhitelist.deleteOne({account: _id});

      return res.status(200).json({message: 'Successfully sign-out'});
    } catch (err) {
      return sendError(req, res, 'sign-out account', err.message);
    }
  },

  async refresh(req, res) {
    try {
      const element = await TokenWhitelist.findOne({refreshToken: req.body.refreshToken});

      // Not found.
      if (!element || !element.account)
        throw new Error("Unauthorized, refresh token not found or invalid.");

      const {accessToken, refreshToken} = await generateTokens(element.account._id || element.account);

      return res.status(200).json({accessToken, refreshToken});
    } catch (err) {
      return res.status(401).json({message: 'unauthorized.', log: err.message});
    }
  },

  async getAuthenticatedAccount(req, res) {
    try {
      const _id = res.locals['authenticated'].sub;

      const account = await Account.findById(_id);

      // Not found
      if (!account)
        throw new Error("Account is not found.");

      return res.status(200).json(account);
    } catch (err) {
      return sendError(req, res, 'get-auth', err.message);
    }
  },

  async confirmEmail(req, res) {
    try {
      const {content, code} = res.locals['confirmation'];

      // Account
      const account = await Account.findOne({email: content}, {_id: 1, confirmedEmail: 1, confirmationCodeEmail: 1});

      // Not found
      if (!account)
        throw new Error("Account not found.");

      // Already confirmed
      if (account.confirmedEmail)
        throw new Error("Email já confirmado.");

      // Invalid code
      if (account.confirmationCodeEmail.toUpperCase() !== code.toUpperCase())
        throw new Error("Código inválido.");

      // Confirming...
      await Account.updateOne({_id: account._id}, {$set: {confirmedEmail: true}});

      return res.status(200).json({});
    } catch (err) {
      return sendError(req, res, 'confirm-email', err.message);
    }
  },

}
