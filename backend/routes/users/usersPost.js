const winston = require('winston');
const hashPassword = require('../../utils/hashPassword');
const { validateUser, User } = require('../../model/users');

module.exports = async (req, res) => {
  const validationResult = validateUser(req.body);
  if (validationResult.error) {
    res.status(400).json(validationResult.error.details);
    return;
  }

  const { userName, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({
    userName,
    password: hashedPassword,
  });

  try {
    const result = await user.save();
    res.json(result);
  } catch (error) {
    winston.error(error);
    res.status(500).json(error);
  }
};
