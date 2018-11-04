const Joi = require('joi');

const apiCredentialsSchema = {
  username: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(6).required()
};

const validateCredentials = credentials => Joi.validate(credentials, apiCredentialsSchema);

module.exports = validateCredentials;
