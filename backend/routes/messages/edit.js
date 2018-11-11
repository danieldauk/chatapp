const winston = require('winston');
const { Message } = require('../../model/message');
const validateObjectId = require('../../utils/sharedJoiSchemas/validateObjectId');
const validateEditMessageRequest = require('../../utils/messages/validateEditMessageRequest');

module.exports = async (req, res) => {
  // validate data
  const objectIdValidationResult = validateObjectId(req.params.messageId);
  if (objectIdValidationResult.error) {
    res.status(400).json({
      error: objectIdValidationResult.error.details[0].message
    });
    return;
  }
  const messageContentValidationResult = validateEditMessageRequest(req.body);
  if (messageContentValidationResult.error) {
    res.status(400).json({
      error: messageContentValidationResult.error.details[0].message
    });
    return;
  }

  const currentUserId = req.user._id;
  const { messageId } = req.params;

  try {
    // check if message exists
    const message = await Message.findOne({ _id: messageId });
    // if message does not exist - respond with 404 error
    if (!message) {
      res.status(404).json({
        error: 'Message not found'
      });
      return;
    }
    // check if sender of the message is requesting user
    const isSenderOfMessage = message.sender.toString() === currentUserId;
    // if requesting user is not the sender - respond with 403 error
    if (!isSenderOfMessage) {
      res.status(403).json({
        error: "Editing other users' messages is not allowed"
      });
      return;
    }
    // if all checks are successfull - remove message
    await Message.updateOne({ _id: message._id }, {
      content: req.body.content,
      isEdited: true,
      modifiedAt: new Date()
    });
    res.json({
      message: 'Message successfully modified'
    });
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
