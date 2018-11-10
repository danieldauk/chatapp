const winston = require('winston');
const { validateMessage, Message } = require('../../model/message');

module.exports = async (req, res) => {
  const validationResult = validateMessage(req.body);
  if (validationResult.error) {
    res.status(400).json({
      error: validationResult.error.details[0].message
    });
    return;
  }


  try {

  } catch (error) {
    // if error occurs during saving to db - return error
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
