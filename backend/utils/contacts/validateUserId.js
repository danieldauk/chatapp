const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const apiUserIdSchema = {
  userId: Joi.objectId().required()
};

const validateUserId = userId => Joi.validate(userId, apiUserIdSchema);

module.exports = validateUserId;
