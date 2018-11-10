const express = require('express');
const authMiddleware = require('../../middleware/auth');
const getOrCreate = require('./getOrCreate');
const get = require('./get');
const getAll = require('./getAll');
// const create = require('./create');

const router = express.Router();
router.use(authMiddleware);

router.get('/', getOrCreate);
router.get('/all', getAll);
router.get('/:conversationId', get);

// TODO:
// POST: '/' Data: participants array -> create conversation with given participants
// POST: '/conversation/conversationId/participants/:participantId' -> add participant to conversation
// DELETE:'/conversation/conversationId/participants/:participantId'-> remove participant from conversation


module.exports = router;
