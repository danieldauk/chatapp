const express = require('express');
const authMiddleware = require('../../middleware/auth');
const upload = require('./upload');

const router = express.Router();
router.use(authMiddleware);

router.post('/', upload);

module.exports = router;
