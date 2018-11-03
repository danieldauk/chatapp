const express = require('express');
const avatarUploadMiddleware = require('../../middleware/avatarUpload');
const authMiddleware = require('../../middleware/auth');
const post = require('./post');

const router = express.Router();
router.use(authMiddleware);

router.post('/', avatarUploadMiddleware, post);

module.exports = router;
