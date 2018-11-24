const winston = require('winston');
const { User } = require('../../../../model/user');
const validateObjectId = require('../../../../utils/sharedJoiSchemas/validateObjectId');


module.exports = async (userId, contactId) => {
  // TODO: add requesting user to contacts list of added user(contactId) and emit event to added user
  const validationResult = validateObjectId(contactId);
  if (validationResult.error) {
    return {
      error: validationResult.error.details[0].message
    };
  }

  try {
    // check if contact (user) with given id exists
    const contactToBeRemoved = await User.findOne({
      _id: contactId
    });
    if (!contactToBeRemoved) {
      return {
        error: 'User not found'
      };
    }

    // check if user does not exist inside contacts array
    const contact = await User.findOne({
      _id: userId,
      contacts: contactToBeRemoved._id
    });
    // if user does not exist - return error
    if (!contact) {
      return {
        error: 'User does not exist in contacts list'
      };
    }

    // if user exists - remove user and return success message
    await User.updateOne(
      {
        _id: userId
      },
      {
        $pull: {
          contacts: contactToBeRemoved._id
        }
      }
    );
    return {
      message: 'User successfully removed from contacts list'
    };
  } catch (error) {
    winston.error(error);
    return {
      error: error.message
    };
  }
};
