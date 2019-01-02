const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const { Message } = require('../../../model/message');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId) => {
  try {
    // check for all conversations with requesting userId
    const conversations = await Conversation.find({
      participants: userId
    })
      .populate([
        {
          path: 'participants',
          select: 'username avatar'
        },
        {
          path: 'removedParticipants',
          select: 'username avatar'
        }
      ])
      .lean();
    // load last conversation message for each contact
    /* eslint-disable */
    for (const conversation of conversations) {
      const lastConversationMessage = await Message.find(
        {
          conversationId: conversation._id
        },
        {
          _id: 0,
          content: 1
        }
      )
        .lean()
        .limit(1)
        .sort({ createdAt: -1 });
      if (lastConversationMessage[0]) {
        conversation.lastConversationMessage =
          lastConversationMessage[0].content;
      } else {
        conversation.lastConversationMessage = null;
      }
    }
    /* eslint-enable */
    socket.emit(SocketEventsEnum.RESPONSE_CONVERSATIONS, conversations);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
