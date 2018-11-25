const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const { Message } = require('../../../model/message');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');

module.exports = async (userId, conversationId) => {
  // check if conversationId is valid id
  const validationResult = validateObjectId(conversationId);
  if (validationResult.error) {
    return {
      error: validationResult.error.details[0].message
    };
  }

  try {
    // check if conversation with given id exists
    const conversation = await Conversation.findOne({
      _id: conversationId
    });

    // if conversation does not exist - return error
    if (!conversation) {
      return {
        error: 'Conversation does not exist'
      };
    }
    // check if requesting user is present in the conversation
    let isUserFound = false;
    conversation.participants.forEach((participant) => {
      if (participant.toString() === userId) {
        isUserFound = true;
      }
    });
    // if conversation does not include requesting user id - return 403
    if (!isUserFound) {
      return {
        error:
          'Requesting messages from conversation that do not include requesting user id is not allowed.'
      };
    }
    // if all checks are successful - return all messages linked to the conversation
    const messages = await Message.find({ conversationId });
    console.log(messages);
    return messages;
  } catch (error) {
    winston.error(error);
    return {
      error: error.message
    };
  }
};
