const winston = require('winston');
const { User } = require('../../../../model/user');
const validateObjectId = require('../../../../utils/sharedJoiSchemas/validateObjectId');
const { SocketEventsEnum } = require('../../../../utils/enumerators');

module.exports = async (socket, userId, contactId) => {
  const validationResult = validateObjectId(contactId);
  if (validationResult.error) {
    socket.emit(SocketEventsEnum.ERROR, {
      error: validationResult.error.details[0].message
    });
    return;
  }

  try {
    // check if contact (user) with given id exists
    const contactToBeRemoved = await User.findOne({
      _id: contactId
    });
    if (!contactToBeRemoved) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'User not found'
      });
      return;
    }

    // check if user does not exist inside contacts array
    const contact = await User.findOne({
      _id: userId,
      contacts: contactToBeRemoved._id
    });
    // if user does not exist - return error
    if (!contact) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'User does not exist in contacts list'
      });
      return;
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
    socket.emit(SocketEventsEnum.RESPONSE_REMOVE_CONTACT, {
      message: 'User was successfully removed from contacts list'
    });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
