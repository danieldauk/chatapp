const winston = require('winston');
const { User } = require('../../../../model/user');
const { SocketEventsEnum } = require('../../../../utils/enumerators');

module.exports = async (socket, userId) => {
  try {
    const contacts = await User.findOne(
      {
        _id: userId
      },
      {
        _id: 0,
        contacts: 1
      }
    ).populate([
      {
        path: 'contacts.contact',
        select: 'username avatar'
      },
      {
        path: 'contacts.conversation',
        populate: {
          path: 'participants',
          select: 'username avatar'
        }
      }
    ]);
    socket.emit(SocketEventsEnum.RESPONSE_CONTACTS, contacts);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
