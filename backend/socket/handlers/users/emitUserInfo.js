const winston = require('winston');
const { User } = require('../../../model/user');

module.exports = async (userId) => {
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
    return user;
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    return {
      error: 'Internal server error'
    };
  }
};
