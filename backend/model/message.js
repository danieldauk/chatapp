const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    modifiedAt: {
      type: Date
    },
    readBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

const apiMessageSchema = {
  conversationId: Joi.objectId().required(),
  content: Joi.string()
    .min(1)
    .required()
};

const validateMessage = message => Joi.validate(message, apiMessageSchema);

module.exports.validateMessage = validateMessage;
module.exports.Message = Message;
