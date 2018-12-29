const winston = require('winston');
const mongoose = require('mongoose');
const { Conversation } = require('../../../model/conversation');
const { SocketEventsEnum } = require('../../../utils/enumerators');
const { User } = require('../../../model/user');
const { Message } = require('../../../model/message');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');

module.exports = async (socket, userId, conversationId) => {
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

    // check if given conversation includes requesting user id
    let isUserFound = false;
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() === userId) {
        isUserFound = true;
      }
    });
    // if conversation does not include requesting user id - return 403
    if (!isUserFound) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'Conversation participant list does not include given user id'
      });
      return;
    }
    // remove user from the conversation and return success message
    await Conversation.updateOne(
      { _id: conversationId },
      {
        $pull: { participants: userId },
        $push: { removedParticipants: userId }
      }
    );
    // create entrie in conversation history
    const user = await User.findOne(
      {
        _id: userId
      },
      {
        username: 1
      }
    );
    const entry = new Message({
      content: `${user.username} has left the conversation.`,
      conversationId
    });
    const message = await entry.save();

    socket.emit(SocketEventsEnum.RESPONSE_LEAVE_CONVERSATION, {
      message: 'User successfully removed from conversation.'
    });
    // notify conversation participants about removed user
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() !== userId) {
        socket.to(participantId).emit(SocketEventsEnum.PARTICIPANT_LEFT_CONVERSATION);
        socket.to(participantId).emit(SocketEventsEnum.RECEIVE_MESSAGE, message);
      }
    });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
