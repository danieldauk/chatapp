const express = require('express');
const create = require('./create');

// nested routes
const contacts = require('./contacts');

const router = express.Router();

// nested routes
router.use('/:userId/contacts', contacts);


router.post('/', create);

module.exports = router;
