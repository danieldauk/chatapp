const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const { Message } = require('../../../model/message');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId, conversationId) => {
  // check if conversationId is valid id
  const validationResult = validateObjectId(conversationId);
  if (validationResult.error) {
    socket.emit(SocketEventsEnum.ERROR, {
      error: validationResult.error.details[0].message
    });
    return;
  }

  try {
    // check if conversation with given id exists
    const conversation = await Conversation.findOne({
      _id: conversationId
    });

    // if conversation does not exist - return error
    if (!conversation) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'Conversation not found'
      });
      return;
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
      socket.emit(SocketEventsEnum.ERROR, {
        error:
          'Requesting messages from conversation that do not include requesting user id is not allowed.'
      });
      return;
    }
    // if all checks are successful - return all messages linked to the conversation
    const messages = await Message.find({ conversationId });
    socket.emit(SocketEventsEnum.RESPONSE_MESSAGES, messages);
    // update all unread messages readBy array with requesting user Id
    await Message.updateMany({
      conversationId,
      readBy: { $ne: userId }
    },
    {
      $push: { readBy: userId }
    });
    // TODO: emit event to all participants to update updatedMessages
    conversation.participants.forEach((participantId) => {
      const messagesData = {
        conversationId,
        userId
      };
      if (participantId.toString() !== userId) {
        socket.to(participantId).emit(SocketEventsEnum.MESSAGES_READ, messagesData);
      } else {
        socket.emit(SocketEventsEnum.MESSAGES_READ, messagesData);
      }
    });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
