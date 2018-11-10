const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const apiObjectIdSchema = {
  userId: Joi.objectId().required()
};

const validateObjectId = userId => Joi.validate(userId, apiObjectIdSchema);

module.exports = validateObjectId;
