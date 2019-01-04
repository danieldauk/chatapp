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
    const contactToBeRemoved = await User.findOne(
      {
        _id: contactId
      },
      { _id: 1 }
    );
    if (!contactToBeRemoved) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'User not found'
      });
      return;
    }
    // check if user does not exist inside contacts array
    const contact = await User.findOne(
      {
        _id: userId,
        'contacts.contact': contactToBeRemoved._id
      },
      { _id: 1 }
    );
    // if user does not exist - return error
    if (!contact) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'User does not exist in contacts list'
      });
      return;
    }
    // if user exists - remove user from user's contacts array
    await User.updateOne(
      {
        _id: userId
      },
      {
        $pull: {
          contacts: { contact: contactToBeRemoved._id }
        }
      }
    );
    // remove current user from contacts's contacts array
    await User.updateOne(
      {
        _id: contactToBeRemoved._id
      },
      {
        $pull: {
          contacts: { contact: userId }
        }
      }
    );
    socket.emit(SocketEventsEnum.RESPONSE_REMOVE_CONTACT, {
      message: 'User was successfully removed from contacts list'
    });
    socket
      .to(contactToBeRemoved._id)
      .emit(SocketEventsEnum.RESPONSE_REMOVE_CONTACT, {
        message: 'User was successfully removed from contacts list'
      });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
