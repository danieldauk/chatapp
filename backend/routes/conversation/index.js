const express = require('express');
const authMiddleware = require('../../middleware/auth');
const getOrCreate = require('./getOrCreate');
// const create = require('./create');

const router = express.Router();
router.use(authMiddleware);

router.get('/', getOrCreate);
// router.post('/:id', create);


module.exports = router;
