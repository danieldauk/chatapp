const winston = require('winston');
const { Conversation } = require('../../../model/conversation');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');
const { User } = require('../../../model/user');

module.exports = async (req, res) => {
  // check data validity
  const validationResult = validateObjectId(req.body.participantId);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  const { participantId } = req.body;
  const currentUserId = req.user._id;
  const { conversationId } = req.params;

  try {
    // check if given conversation exists
    const conversation = await Conversation.findOne({ _id: conversationId });
    if (!conversation) {
      res.status(404).json({
        error: 'Conversation not found'
      });
      return;
    }
    // check if participant exists in database as a user
    const participantToAdd = await User.findOne({ _id: participantId });
    if (!participantToAdd) {
      res.status(400).json({
        error: 'Participant is not found in the database'
      });
      return;
    }
    // check if given conversation includes requesting user id
    let isUserFound = false;
    conversation.participants.forEach((participant) => {
      if (participant.toString() === currentUserId) {
        isUserFound = true;
      }
    });
    // if conversation does not include requesting user id - return 403
    if (!isUserFound) {
      res.status(403).json({
        error:
          'Adding participants to conversations that do not include requesting user id is not allowed.'
      });
      return;
    }

    // check if given conversation includes participant id
    let isParticipantFound = false;
    conversation.participants.forEach((participant) => {
      if (participant.toString() === participantId) {
        isParticipantFound = true;
      }
    });
    // if conversation includes participant id - return 400
    if (isParticipantFound) {
      res.status(400).json({
        error: 'Participant is already included in the conversation'
      });
      return;
    }
    // add participant to conversation and return conversation
    await Conversation.updateOne(
      { _id: conversationId },
      { $push: { participants: participantId } }
    );
    res.json({
      message: 'Participant successfully added to conversation.'
    });
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
