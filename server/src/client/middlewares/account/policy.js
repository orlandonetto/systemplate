const Joi = require('joi');

const {sendValidationError} = require('../response');
const {verifyJWT} = require('../../../app/helpers/tokenHelper');
const {JWT_SECRET_SECONDARY} = require('../../../../config/env.config');

module.exports = {
  signUp(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      ddi: Joi.string().allow(null),
      phone: Joi.string().allow(null)
    };

    // Check Phone (Both with values)
    if (req.body.ddi || req.body.phone) {
      schema.ddi = Joi.string().required()
      schema.phone = Joi.string().required()
    }

    const {error} = Joi.object(schema).validate(req.body);

    // Error
    if (error) return sendValidationError(req, res, error);

    next();
  },

  signIn(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const {error} = schema.validate(req.body);

    // Error
    if (error) return sendValidationError(req, res, error);

    next();
  },

  refresh(req, res, next) {
    const schema = Joi.object({
      refreshToken: Joi.string().required(),
    });

    const {error} = schema.validate(req.body);

    // Error
    if (error) return sendValidationError(req, res, error);

    next();
  },

  authenticated(req, res, next) {
    const schema = Joi.object({
      authorization: Joi.string().required(),
    });

    const body = {
      authorization: req.headers['authorization']
    }

    const {error} = schema.validate(body);

    // Error
    if (error) return sendValidationError(req, res, error);

    verifyJWT(body.authorization)
      .then(data => {
        res.locals['authenticated'] = data;

        next();
      })
      .catch(err => {
        res.status(401).json({message: err.message});
      })
  },

  confirmation(req, res, next) {
    const isToken = !!req.body.token;

    const tokenSchema = Joi.object({
      token: Joi.string().required(),
    });

    const codeSchema = Joi.object({
      content: Joi.string().required(),
      code: Joi.string().required(),
    });

    const schema = isToken ? codeSchema : tokenSchema;

    const {error} = schema.validate(req.body);

    // Error
    if (error) return sendValidationError(req, res, error);

    // Token
    if (isToken) {
      verifyJWT(req.body.token, JWT_SECRET_SECONDARY)
        .then(data => {
          res.locals['confirmation'] = {
            code: data.code,
            content: data.content
          }

          next();
        })
        .catch(err => {
          res.status(400).json({message: "Falha ao realizar validação.", log: err.message});
        });
    }
    // Code
    else {
      res.locals['confirmation'] = {
        code: req.body.code,
        content: req.body.content
      }

      next();
    }
  },


}
