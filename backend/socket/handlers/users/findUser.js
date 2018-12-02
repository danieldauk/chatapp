const winston = require('winston');
const { User } = require('../../../model/user');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId, username) => {
  console.log(username);
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
    socket.emit(SocketEventsEnum.RESPONSE_FIND_PEOPLE, users);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
