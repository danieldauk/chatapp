const winston = require('winston');
const { User } = require('../../../model/user');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');


module.exports = async (req, res) => {
  // check if token's user id is the same as endpoint's id
  if (req.user._id !== req.params.userId) {
    res.status(403).json({
      error: "Removing contacts from another user's account is not allowed"
    });
    return;
  }
  const validationResult = validateObjectId(req.body.userId);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  try {
    // check if contact (user) with given id exists
    const contactToBeRemoved = await User.findOne({
      _id: req.body.userId
    });
    if (!contactToBeRemoved) {
      res.status(404).json({
        error: 'User not found'
      });
      return;
    }

    // check if user does not exist inside contacts array
    const contact = await User.findOne({
      _id: req.user._id,
      contacts: contactToBeRemoved._id
    });
    // if user does not exist - return error
    if (!contact) {
      res.status(400).json({
        error: 'User does not exist in contacts list'
      });
      return;
    }

    // if user exists - remove user and return removed user
    await User.updateOne(
      {
        _id: req.user._id
      },
      {
        $pull: {
          contacts: contactToBeRemoved._id
        }
      }
    );
    res.json({
      message: 'User successfully removed from contacts list'
    });
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
