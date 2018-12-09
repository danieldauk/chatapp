const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId) => {
  try {
    const conversations = await Conversation.find({
      // check for all conversations with requesting userId
      // check if converation have more than two participants
      $and: [{ participants: userId }, { 'participants.2': { $exists: true } }]
    }).populate('participants', 'username avatar');

    socket.emit(SocketEventsEnum.RESPONSE_CONVERSATIONS, conversations);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
