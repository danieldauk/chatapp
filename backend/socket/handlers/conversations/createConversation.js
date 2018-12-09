const winston = require('winston');
const {
  Conversation,
  validateConversation
} = require('../../../model/conversation');
const { User } = require('../../../model/user');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId, participants) => {
  // check data validity
  const validationResult = validateConversation(participants);
  if (validationResult.error) {
    socket.emit(SocketEventsEnum.ERROR, {
      error: validationResult.error.details[0].message
    });
    return;
  }
  const { participants: participantsArray } = participants;
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

    // check if conversation with given participant exist
    const conversation = await Conversation.findOne({
      $and: [
        {
          participants: {
            $size: participantsArray.length
          }
        },
        {
          participants: {
            $all: participantsArray
          }
        }
      ]
    }).populate('participants', 'username avatar');
    // if conversation exist - return conversation
    if (conversation) {
      socket.emit(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, conversation);
      return;
    }
    // if conversation does not exist - create and return conversation
    const newConversation = new Conversation(participants);
    const result = await newConversation.save();
    await Conversation.populate(result, {
      path: 'participants',
      select: 'username avatar'
    });
    socket.emit(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, result);
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
