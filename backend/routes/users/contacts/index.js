const express = require('express');
const authMiddleware = require('../../../middleware/auth');
const add = require('./add');

const router = express.Router({
  mergeParams: true
});

router.use(authMiddleware);

router.post('/', add);

module.exports = router;
