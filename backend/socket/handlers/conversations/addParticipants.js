const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const { SocketEventsEnum } = require('../../../utils/enumerators');
const { User } = require('../../../model/user');
const { Message } = require('../../../model/message');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');

module.exports = async (socket, userId, { participants, conversationId }) => {
  // check data validity
  const validationResult = validateObjectId(conversationId);
  if (validationResult.error) {
    socket.emit(SocketEventsEnum.ERROR, {
      error: validationResult.error.details[0].message
    });
    return;
  }
  try {
    // check if given conversation exists
    const conversation = await Conversation.findOne({ _id: conversationId });
    if (!conversation) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'Conversation not found'
      });
      return;
    }
    // check if given conversation includes userId
    let isUserFound = false;
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() === userId) {
        isUserFound = true;
      }
    });
    if (!isUserFound) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'Conversation participant list does not include given user id'
      });
      return;
    }

    // add participants to conversation
    const addedParticipants = [];
    const addedParticipantsIds = [];

    const addParticipant = async (newParticipantId) => {
      let isParticipantFound = false;
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() === newParticipantId.toString()) {
          isParticipantFound = true;
        }
      });
      if (!isParticipantFound) {
        await Conversation.updateOne(
          { _id: conversationId },
          {
            $push: { participants: newParticipantId },
            $pull: { removedParticipants: newParticipantId }
          }
        );
        const participant = await User.findOne(
          {
            _id: newParticipantId
          },
          {
            username: 1
          }
        );
        addedParticipants.push(participant.username);
        addedParticipantsIds.push(participant._id);
      }
    };
    /* eslint-disable */
    for (const participant of participants ) {
      await addParticipant(participant);
    }
    /* eslint-enable */
    // if no participants were added - return message
    if (addedParticipants.length === 0) {
      socket.emit(SocketEventsEnum.RESPONSE_ADD_PARTICIPANTS, {
        message: 'No participants were added to conversation'
      });
      return;
    }

    const updatedConversation = await Conversation.findOne({ _id: conversationId }).populate([
      {
        path: 'participants',
        select: 'username avatar'
      },
      {
        path: 'removedParticipants',
        select: 'username avatar'
      }
    ]);
    // notify added participants about conversation
    addedParticipantsIds.forEach((participantId) => {
      socket.to(participantId).emit(SocketEventsEnum.USER_ADDED_TO_CONVERSATION, updatedConversation);
    });
    // create entry in conversation history
    const entry = new Message({
      content: `${addedParticipants.join(', ')} has joined the conversation.`,
      conversationId
    });
    const message = await entry.save();

    // notify requesting user about successful operation completion
    socket.emit(SocketEventsEnum.RESPONSE_ADD_PARTICIPANTS, updatedConversation);
    socket.emit(SocketEventsEnum.RECEIVE_MESSAGE, message);
    // notify conversation participants about added participants
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() !== userId) {
        socket.to(participantId).emit(SocketEventsEnum.RECEIVE_MESSAGE, message);
        socket.to(participantId).emit(SocketEventsEnum.PARTICIPANT_ADDED_TO_CONVERSAITON, updatedConversation);
      }
    });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
