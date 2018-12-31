const winston = require('winston');
const {
  Conversation,
  validateConversation
} = require('../../../model/conversation');
const { User } = require('../../../model/user');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId, conversationData) => {
  // check data validity
  const validationResult = validateConversation(conversationData);
  if (validationResult.error) {
    socket.emit(SocketEventsEnum.ERROR, {
      error: validationResult.error.details[0].message
    });
    return;
  }
  const { participants: participantsArray } = conversationData;
  // check if participants array includes requesting user id
  if (!participantsArray.includes(userId)) {
    socket.emit(SocketEventsEnum.ERROR, {
      error:
        'Creating conversations that do not include requesting user id is not allowed.'
    });
    return;
  }
  try {
    // check if all participants exist in the database
    const notFoundUsers = [];
    /* eslint-disable */
    for (const participantId of participantsArray) {
      const result = await User.findOne({ _id: participantId });
      if (!result) {
        notFoundUsers.push(participantId);
      }
    }
    /* eslint-enable */
    if (notFoundUsers.length !== 0) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: `Following users where not found in the database: ${notFoundUsers}`
      });
      return;
    }

    const newConversation = new Conversation(conversationData);
    const result = await newConversation.save();
    await Conversation.populate(result, {
      path: 'participants',
      select: 'username avatar'
    });
    socket.emit(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, result);
    result.participants.forEach((participant) => {
      socket
        .to(participant._id)
        .emit(SocketEventsEnum.USER_ADDED_TO_CONVERSATION, newConversation);
    });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
