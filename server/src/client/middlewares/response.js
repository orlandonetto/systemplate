module.exports = {
  sendError(req, res, action = '', err) {
    res.status(400).json({err, message: `${action || 'request'} failed.`});
  },

  sendValidationError(req, res, err) {
    const {context, message} = err.details[0] ? err.details[0] : {};

    return res.status(400).json({invalid_key: context.key, message: message.replace(/"/g, '')});
  }
}