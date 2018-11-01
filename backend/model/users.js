const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
    unique: true,
  },
  hash: {
    type: String,
    minlength: 6,
    require: true,
  },
});

const User = mongoose.model('User', userSchema);

const apiUserSchema = {
  userName: Joi.required().min(2).max(30).string(),
  hash: Joi.required().min(6).string(),
};

const validateUser = user => Joi.validate(user, apiUserSchema);

module.exports.validateUser = validateUser;
module.exports.User = User;
