const winston = require('winston');
const { User } = require('../../model/user');
const avatarUpload = require('../../middleware/avatarUpload');

module.exports = async (req, res) => {
  avatarUpload(req, res, (error) => {
    if (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  try {
    const user = await User.findOne({
      _id: req.user._id
    });
    if (!user) {
      res.status(400).json({
        error: 'User does not exist'
      });
    }
    await User.updateOne({
      _id: req.user._id
    }, {
      $set: {
        avatar: req.file.filename
      }
    });
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
  // if everything went fine - send success message
  res.json({
    message: 'File uploaded successfully'
  });
};
