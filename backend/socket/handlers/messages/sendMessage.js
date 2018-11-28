const winston = require('winston');
const { validateMessage, Message } = require('../../../model/message');
const { Conversation } = require('../../../model/conversation');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (userId, { conversationId, content }, socket) => {
  // validate data
  const validationResult = validateMessage({
    content,
    conversationId
  });
  if (validationResult.error) {
    return {
      error: validationResult.error.details[0].message
    };
  }
  try {
    // check if conversation exists
    const conversation = await Conversation.findOne({
      _id: conversationId
    });

    if (!conversation) {
      return {
        error: 'Conversation not found'
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
          'Adding messages to conversations that do not include requesting user id is not allowed.'
      };
    }
    // if all checks are successfull - add message
    const message = new Message({
      sender: userId,
      content,
      conversationId
    });
    const result = await message.save();
    // send message to all conversation participants
    conversation.participants.forEach((participant) => {
      const participantId = participant.toString();
      if (userId === participantId.toString()) {
        socket.emit(SocketEventsEnum.RECEIVE_MESSAGE, result);
        return;
      }
      socket
        .to(participantId.toString())
        .emit(SocketEventsEnum.RECEIVE_MESSAGE, result);
    });
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    return {
      error: error.message
    };
  }
};
