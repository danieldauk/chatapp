const winston = require('winston');
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  let user;
  try {
    if (req.query.contacts === 'true') {
      user = await User.findOne(
        {
          _id: req.user._id
        },
        {
          password: 0
        }
      ).populate({
        path: 'contacts',
        select: 'username avatar'
      });
    } else {
      user = await User.findOne(
        {
          _id: req.user._id
        },
        {
          password: 0
        }
      );
    }
    res.json(user);
  } catch (error) {
    // if error occurs during db querying - return error
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
