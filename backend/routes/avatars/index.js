const express = require('express');
const avatarUploadMiddleware = require('../../middleware/avatarUpload');
const authMiddleware = require('../../middleware/auth');
const upload = require('./upload');

const router = express.Router();
router.use(authMiddleware);

router.post('/', avatarUploadMiddleware, upload);

module.exports = router;
