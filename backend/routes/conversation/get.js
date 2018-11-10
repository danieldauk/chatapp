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

    // if messages parameter does not exist - return conversation only
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
    // if conversation exist - return conversation
    res.json(conversation);
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
