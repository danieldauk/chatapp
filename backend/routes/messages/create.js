const winston = require('winston');
const { validateMessage, Message } = require('../../model/message');
const { Conversation } = require('../../model/conversation');

module.exports = async (req, res) => {
  // validate data
  const validationResult = validateMessage(req.body);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  const currentUserId = req.user._id;

  try {
    // check if conversation exists
    const conversation = await Conversation.findOne({
      _id: req.body.conversationId
    });
    if (!conversation) {
      res.status(400).json({
        error: 'Conversation not found'
      });
      return;
    }
    // check if requesting user is present in the conversation
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
          'Adding messages to conversations that do not include requesting user id is not allowed.'
      });
      return;
    }
    // if all checks are successfull - add message
    const message = new Message({
      sender: currentUserId,
      content: req.body.content,
      conversationId: req.body.conversationId
    });
    await message.save();
    res.json({
      message: 'Message successfully created'
    });
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
