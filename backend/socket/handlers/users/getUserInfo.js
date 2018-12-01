const winston = require('winston');
const { User } = require('../../../model/user');
const { SocketEventsEnum } = require('../../../utils/enumerators');

module.exports = async (socket, userId) => {
  try {
    const user = await User.findOne(
      {
        _id: userId
      },
      {
        password: 0,
        __v: 0
      }
    );
    socket.emit(SocketEventsEnum.RESPONSE_USER_INFO, user);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
