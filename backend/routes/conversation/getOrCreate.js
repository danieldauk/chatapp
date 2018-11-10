const winston = require('winston');
const { Conversation } = require('../../model/conversation');
const validateObjectId = require('../../utils/sharedJoiSchemas/validateObjectId');

module.exports = async (req, res) => {
  // check if participant id is present in query
  const { participant } = req.query;
  const currentUserId = req.user._id;

  // if participant id is not present in query - return error
  if (!participant) {
    res.status(400).json({
      error: 'Participant id is required.'
    });
    return;
  }

  // if participant id is present in query - check id validity
  const validationResult = validateObjectId({ userId: req.query.participant });
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  try {
    // check if conversation with given participant exist
    const conversation = await Conversation.findOne({
      $and: [
        { participants: { $size: 2 } },
        { participants: { $all: [participant, currentUserId] } }
      ]
    });
    // if conversation exist - return conversation
    if (conversation) {
      res.json(conversation);
      return;
    }
    // if conversation does not exist - create and return conversation
    const newConversation = new Conversation({
      participants: [
        currentUserId,
        participant
      ]
    });

    const result = await newConversation.save();
    res.json(result);
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
