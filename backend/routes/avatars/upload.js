const winston = require('winston');
const { User } = require('../../model/user');
const avatarUpload = require('../../middleware/avatarUpload');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id
    });
    if (!user) {
      res.status(400).json({
        error: 'User does not exist'
      });
      return;
    }
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
    return;
  }

  // catch multer errors
  avatarUpload(req, res, async (uploadError) => {
    if (uploadError) {
      res.status(500).json({
        error: uploadError.message
      });
      return;
    }
    try {
      await User.updateOne({
        _id: req.user._id
      }, {
        $set: {
          // production middleware is adding 'key' property, development - 'filename'
          avatar: req.file.filename || req.file.key
        }
      });
      // if everything went fine - send success message
      res.json({
        message: 'File uploaded successfully'
      });
    } catch (error) {
      winston.error(error);
      res.status(500).json({
        error: error.message
      });
    }
  });
};
