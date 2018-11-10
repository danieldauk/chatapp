const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const apiObjectIdSchema = {
  objectId: Joi.objectId().required()
};

const validateObjectId = objectId => Joi.validate({ objectId }, apiObjectIdSchema);

module.exports = validateObjectId;
