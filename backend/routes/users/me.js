const winston = require('winston');
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  let user;
  try {
    if (req.query.contacts === 'true') {
      user = await User.findOne({
        _id: req.user._id
      }, {
        password: 0
      }).populate('contacts');
    } else {
      user = await User.findOne({
        _id: req.user._id
      }, {
        password: 0
      });
    }
    res.json(user);
  } catch (error) {
    // if error occurs during saving to db - return error
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
