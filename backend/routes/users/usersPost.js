const winston = require('winston');
const hashPassword = require('../../utils/hashPassword');
const { validateUser, User } = require('../../model/users');

module.exports = async (req, res) => {
  const validationResult = validateUser(req.body);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message,
    });
    return;
  }

  const { userName, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({
    userName,
    password: hashedPassword,
  });

  try {
    // check if user exists in database
    const doesUserExist = !!await User.find({ userName }).count();
    if (doesUserExist) {
      res.status(400).json({
        error: 'Given username exists',
      });
      return;
    }
    // if user does not exist - save in database
    const result = await user.save();
    res.json(result);
  } catch (error) {
    // if error occurs during saving to db - return error
    winston.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
