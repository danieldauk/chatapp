const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  content: {
    type: String,
    minlength: 1,
    required: true
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

const apiMessageSchema = {
  conversationId: Joi.objectId().required(),
  content: Joi.string().min(1).required()
};

const validateMessage = message => Joi.validate(message, apiMessageSchema);

module.exports.validateMessage = validateMessage;
module.exports.Message = Message;
