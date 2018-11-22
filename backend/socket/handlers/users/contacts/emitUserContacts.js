const winston = require('winston');
const { User } = require('../../../../model/user');

module.exports = async (userId) => {
  try {
    const contacts = await User.findOne(
      {
        _id: userId
      },
      {
        _id: 0,
        contacts: 1
      }
    ).populate('contacts');
    return contacts;
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    return {
      error: 'Internal server error'
    };
  }
};
