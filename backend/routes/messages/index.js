const express = require('express');
const authMiddleware = require('../../middleware/auth');
const add = require('./add');
const edit = require('./edit');
const remove = require('./remove');

const router = express.Router();
router.use(authMiddleware);

router.post('/', add);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
