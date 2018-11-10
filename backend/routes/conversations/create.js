const winston = require('winston');
const {
  Conversation,
  validateConversation
} = require('../../model/conversation');
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  const currentUserId = req.user._id;
  // check data validity
  const validationResult = validateConversation(req.body);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  const { participants } = req.body;
  // check if participants array includes requesting user id
  if (!participants.includes(currentUserId)) {
    res.status(400).json({
      error:
        'Creating conversations that do not include requesting user id is not allowed.'
    });
    return;
  }
  try {
    // check if all participants exist in the database
    const notFoundUsers = [];
    /* eslint-disable */
    for (const participantId of participants) {
      const result = await User.findOne({ _id: participantId });
      if (!result) {
        notFoundUsers.push(participantId);
      }
    }
    /* eslint-enable */
    console.log(notFoundUsers);
    if (notFoundUsers.length !== 0) {
      res.status(400).json({
        error: `Following users where not found in the database: ${notFoundUsers}`
      });
      return;
    }

    // check if conversation with given participant exist
    const conversation = await Conversation.findOne({
      $and: [
        { participants: { $size: participants.length } },
        { participants: { $all: participants } }
      ]
    });
    // if conversation exist - return conversation
    if (conversation) {
      res.json(conversation);
      return;
    }
    // if conversation does not exist - create and return conversation
    const newConversation = new Conversation({
      participants
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
