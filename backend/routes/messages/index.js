const express = require('express');
const authMiddleware = require('../../middleware/auth');
const create = require('./create');
const edit = require('./edit');
const remove = require('./remove');

const router = express.Router();
router.use(authMiddleware);

router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;