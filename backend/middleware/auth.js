const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const auth = (req, res, next) => {
  let token = req.header('authorization');
  if (!token) {
    res.status(401).json({
      error: 'Access denied. No token provided.',
    });
    return;
  }
  try {
    token = token.replace('Bearer ', '');
    const certPath = path.join(__dirname, '../id_rsa.pub');
    const cert = fs.readFileSync(certPath);
    const payload = jwt.verify(token, cert);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = auth;
