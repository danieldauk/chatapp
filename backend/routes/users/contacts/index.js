const express = require('express');
const authMiddleware = require('../../../middleware/auth');
const add = require('./add');
const remove = require('./remove');

const router = express.Router({
  mergeParams: true
});

router.use(authMiddleware);

router.post('/', add);
router.delete('/', remove);

module.exports = router;
