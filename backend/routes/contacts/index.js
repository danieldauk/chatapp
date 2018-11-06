const express = require('express');
const authMiddleware = require('../../middleware/auth');
const post = require('./post');

const router = express.Router();
router.use(authMiddleware);

router.post('/', post);

module.exports = router;
