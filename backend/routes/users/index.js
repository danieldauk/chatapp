const express = require('express');
const authMiddleware = require('../../middleware/auth');
const create = require('./create');
const me = require('./me');
// nested routes
const contacts = require('./contacts');

const router = express.Router();

// nested routes
router.use('/:userId/contacts', contacts);


router.post('/', create);
router.get('/me', authMiddleware, me);

module.exports = router;
