const winston = require('winston');
const { User } = require('../../../../model/user');
const validateObjectId = require('../../../../utils/sharedJoiSchemas/validateObjectId');

module.exports = async (userId, contactId) => {
  const validationResult = validateObjectId(contactId);
  if (validationResult.error) {
    return {
      error: validationResult.error.details[0].message
    };
  }

  try {
    // check if contact (user) with given id exists
    const newContact = await User.findOne({
      _id: contactId
    });
    if (!newContact) {
      return {
        error: 'User not found'
      };
    }

    // check if user does not exist inside contacts array
    const contact = await User.findOne({
      _id: userId,
      contacts: newContact._id
    });
    // if user exists - return error
    if (contact) {
      return {
        error: 'User already exists in contacts list'
      };
    }
    // if user does not exist - push contact to array
    await User.updateOne(
      {
        _id: userId
      },
      {
        $push: {
          contacts: newContact._id
        }
      }
    );
    return {
      message: 'User successfully added to contacts list'
    };
  } catch (error) {
    winston.error(error);
    return {
      error: error.message
    };
  }
};
