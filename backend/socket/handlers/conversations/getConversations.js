const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId) => {
  try {
    const conversations = await Conversation.find({
      // check for all conversations with requesting userId
      // check if converation have more than two participants
      // or two participants and at least one removed participant
      $and: [{ participants: userId },
        {
          $or:
          [{
            'participants.2': { $exists: true }
          },
          {
            $and:
            [
              { 'participants.1': { $exists: true } },
              { 'removedParticipants.0': { $exists: true } }
            ]
          }]
        }]
    }).populate([
      {
        path: 'participants',
        select: 'username avatar'
      },
      {
        path: 'removedParticipants',
        select: 'username avatar'
      }
    ]);

    socket.emit(SocketEventsEnum.RESPONSE_CONVERSATIONS, conversations);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
