const express = require('express');
const authMiddleware = require('../../middleware/auth');
const getOrCreate = require('./getOrCreate');
const get = require('./get');
// const create = require('./create');

const router = express.Router();
router.use(authMiddleware);

router.get('/', getOrCreate);
router.get('/:conversationId', get);
// router.post('/', create);


module.exports = router;
