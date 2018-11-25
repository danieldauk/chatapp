const winston = require('winston');
const { Conversation, validateConversation } = require('../../../model/conversation');
const { User } = require('../../../model/user');

module.exports = async (userId, participants) => {
  // check data validity
  const validationResult = validateConversation(participants);
  if (validationResult.error) {
    return {
      error: validationResult.error.details[0].message
    };
  }
  const { participants: participantsArray } = participants;
  console.log(participantsArray);
  // check if participants array includes requesting user id
  if (!participantsArray.includes(userId)) {
    return {
      error:
        'Creating conversations that do not include requesting user id is not allowed.'
    };
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
      return {
        error: `Following users where not found in the database: ${notFoundUsers}`
      };
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
    });
    // if conversation exist - return conversation
    if (conversation) {
      return conversation;
    }
    // if conversation does not exist - create and return conversation
    const newConversation = new Conversation(participants);

    const result = await newConversation.save();
    return result;
  } catch (error) {
    winston.error(error);
    return {
      error: error.message
    };
  }
};
