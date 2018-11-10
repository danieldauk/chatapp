const winston = require('winston');
const { Conversation } = require('../../model/conversation');

module.exports = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    }).populate('participants', 'username avatar');
    res.json({
      conversations
    });
  } catch (error) {
    winston.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};
