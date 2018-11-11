const express = require('express');
const authMiddleware = require('../../middleware/auth');
const get = require('./get');
const getAll = require('./getAll');
const getMessages = require('./getMessages');
const create = require('./create');
const addParticipant = require('./participants/add');
const removeParticipant = require('./participants/remove');

const router = express.Router();
router.use(authMiddleware);

router.get('/', getAll);
router.get('/:conversationId', get);
router.get('/:conversationId/messages', getMessages);
router.post('/', create);

router.post('/:conversationId/participants', addParticipant);
router.delete('/:conversationId/participants', removeParticipant);

module.exports = router;
