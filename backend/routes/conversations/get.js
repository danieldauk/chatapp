const winston = require('winston');
const { Conversation } = require('../../model/conversation');
const validateObjectId = require('../../utils/sharedJoiSchemas/validateObjectId');

module.exports = async (req, res) => {
  const { conversationId } = req.params;
  // check if conversationId is valid id
  const validationResult = validateObjectId(conversationId);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  try {
    // check if conversation with given id exists
    const conversation = await Conversation.findOne({
      _id: conversationId
    }).populate('participants', 'username avatar');

    // if conversation does not exist - return error
    if (!conversation) {
      res.status(404).json({
        error: 'Conversation does not exist'
      });
      return;
    }
    // check if requesting user is present in the conversation
    let isUserFound = false;
    conversation.participants.forEach((participant) => {
      if (participant._id.toString() === req.user._id) {
        isUserFound = true;
      }
    });
    // if conversation does not include requesting user id - return 403
    if (!isUserFound) {
      res.status(403).json({
        error:
          'Requesting conversations that do not include requesting user id is not allowed.'
      });
      return;
    }
    res.json(conversation);
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
