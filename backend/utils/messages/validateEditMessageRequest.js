const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const apiMessageContentSchema = {
  content: Joi.string().min(1).required()
};

const validateEditMessageRequest = request => Joi.validate(request, apiMessageContentSchema);

module.exports = validateEditMessageRequest;
