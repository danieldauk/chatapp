const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const conversationSchema = new mongoose.Schema(
  {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    removedParticipants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    title: {
      type: String
    }
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

const apiConversationSchema = {
  participants: Joi.array().min(1).required().items(Joi.objectId()),
  title: Joi.string().min(1).required()
};

const validateConversation = conversation => Joi.validate(conversation, apiConversationSchema);

module.exports.validateConversation = validateConversation;
module.exports.Conversation = Conversation;
