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
    let queries = [];
    conversations.forEach((conversation) => {
      const query = Message.findOne(
        {
          conversationId: conversation._id
        },
        {
          _id: 0,
          content: 1,
          conversationId: 1
        }
      )
        .lean()
        .sort({ createdAt: -1 });
      // push promises to array
      queries.push(query.exec());
    });
    // wait for all queries to resolve
    const lastMessages = await Promise.all(queries);
    // load unread messages count for each conversation
    queries = [];
    conversations.forEach((conversation) => {
      const query = Message.find(
        {
          conversationId: conversation._id,
          readBy: { $ne: userId },
          sender: { $ne: userId }
        },
        {
          _id: 0,
          conversationId: 1
        }
      )
        .lean();
      // push promises to array
      queries.push(query.exec());
    });
    // wait for all queries to resolve
    const unreadMessagesArrays = await Promise.all(queries);
    // flatten array
    let unreadMessages = [];
    if (unreadMessagesArrays.length !== 0) {
      unreadMessages = unreadMessagesArrays.reduce((result, unreadConversationMessages) => result.concat(unreadConversationMessages));
    }
    // assign for each conversation last conversation message and unread messages count
    const updatedConversations = conversations.map((conversation) => {
      const unreadConversationMessages = unreadMessages.filter(unreadMessage => unreadMessage.conversationId.toString() === conversation._id.toString()).length;
      const foundLastConversationMessage = lastMessages.find((message) => {
        if (message) {
          return (
            message.conversationId.toString() === conversation._id.toString()
          );
        }
        return false;
      });
      return {
        ...conversation,
        unreadMessages: unreadConversationMessages,
        lastConversationMessage: foundLastConversationMessage || null
      };
    });
    socket.emit(SocketEventsEnum.RESPONSE_CONVERSATIONS, updatedConversations);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
