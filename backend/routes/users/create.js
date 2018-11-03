const winston = require('winston');
const hashPassword = require('../../utils/auth/hashPassword');
const { validateUser, User } = require('../../model/users');

module.exports = async (req, res) => {
  const validationResult = validateUser(req.body);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message,
    });
    return;
  }

  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    // check if user exists in database
    const doesUserExist = !!await User.find({ username }).count();
    if (doesUserExist) {
      res.status(400).json({
        error: 'Given username exists',
      });
      return;
    }
    // if user does not exist - save in database
    const result = await user.save();
    res.json({
      id: result._id,
      username: result.username,
    });
  } catch (error) {
    // if error occurs during saving to db - return error
    winston.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
