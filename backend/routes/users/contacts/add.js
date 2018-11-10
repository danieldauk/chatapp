const winston = require('winston');
const { User } = require('../../../model/user');
const validateObjectId = require('../../../utils/sharedJoiSchemas/validateObjectId');


module.exports = async (req, res) => {
  // check if token's user id is the same as endpoint's id
  if (req.user._id !== req.params.userId) {
    res.status(403).json({
      error: "Adding contacts to another user's account is not allowed"
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
    const newContact = await User.findOne({ _id: req.body.userId });
    if (!newContact) {
      res.status(404).json({
        error: 'User not found'
      });
      return;
    }

    // check if user does not exist inside contacts array
    const contact = await User.findOne({
      _id: req.user._id,
      contacts: newContact._id
    });
    // if user exists - return error
    if (contact) {
      res.status(400).json({
        error: 'User already exists in contacts list'
      });
      return;
    }
    // if user does not exist - push contact to array
    await User.updateOne(
      { _id: req.user._id },
      { $push: { contacts: newContact._id } }
    );
    res.json({
      message: 'User successfully added to contacts list'
    });
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
