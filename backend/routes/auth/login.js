const winston = require('winston');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { User } = require('../../model/user');
const validateCredentials = require('../../utils/auth/validateCredentials');

module.exports = async (req, res) => {
  const validationResult = validateCredentials(req.body);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }

  const { username, password } = req.body;
  let user;
  try {
    user = await User.findOne({
      username
    });
  } catch (error) {
    // if error occurs during saving to db - return error
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }

  // if user does not exist - send error
  if (!user) {
    res.status(400).json({
      error: 'Invalid username or password.'
    });
    return;
  }

  // if password is incorrect - send error
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({
      error: 'Invalid username or password.'
    });
    return;
  }
  const certPath = path.join(__dirname, '/../../id_rsa');
  const cert = fs.readFileSync(certPath);
  const token = jwt.sign({
    _id: user.id
  }, cert, {
    algorithm: 'RS256'
  });
  res.json({
    token
  });
};
