const express = require('express');
const avatarUpload = require('../../middleware/avatarUpload');
const post = require('./post');

const router = express.Router();

router.post('/', avatarUpload, post);

module.exports = router;
