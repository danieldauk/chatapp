const express = require('express');
const usersPost = require('./usersPost');

const router = express.Router();

router.post('/', usersPost);

module.exports = router;
