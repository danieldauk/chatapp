const express = require('express');
const authMiddleware = require('../../middleware/auth');
const get = require('./get');
const getAll = require('./getAll');
const create = require('./create');
const addParticipant = require('./participants/add');

const router = express.Router();
router.use(authMiddleware);

router.get('/', getAll);
router.get('/:conversationId', get);
router.post('/', create);

router.post('/:conversationId/participants', addParticipant);
// router.delete('/:conversationId/participants', removeParticipant);

// TODO:
// POST: '/conversation/conversationId/participants/:participantId' -> add participant to conversation
// DELETE:'/conversation/conversationId/participants/:participantId'-> remove participant from conversation


module.exports = router;
