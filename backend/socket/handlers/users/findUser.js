const winston = require('winston');
const { User } = require('../../../model/user');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId, username) => {
  // TODO: exclude people that are in pending friend request list
  try {
    const users = await User.find(
      {
        username: { $regex: username },
        // exclude result with requesting userId
        _id: { $ne: userId }
      },
      {
        avatar: 1,
        username: 1
      }
    );

    // check requesting user's contacts
    const contacts = await User.findOne(
      {
        _id: userId
      },
      {
        _id: 0,
        contacts: 1
      }
    ).populate({
      path: 'contacts',
      select: '_id'
    });
    const arrayOfContactsIds = contacts.contacts.map(contact => contact._id.toString());

    const filteredUsers = users.map((user) => {
      if (arrayOfContactsIds.includes(user._id.toString())) {
        return {
          ...user.toObject(),
          isFriend: true
        };
      }
      return {
        ...user.toObject(),
        isFriend: false
      };
    });
    socket.emit(SocketEventsEnum.RESPONSE_FIND_PEOPLE, filteredUsers);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
