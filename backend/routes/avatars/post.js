const { User } = require('../../model/users');
const avatarUpload = require('../../middleware/avatarUpload');

module.exports = (req, res) => {
  avatarUpload(req, res, (error) => {
    if (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  // TODO: add avatar file name to user document

  // if everything went fine - send success message
  res.json({
    message: 'File uploaded successfully',
  });
};
