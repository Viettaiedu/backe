const express = require('express');
const { verify } = require('../middleware/verify');
const {getConversations, addConversation, getConversation } = require('../controllers/conversation');
const router = express.Router();

router.get('/' , verify,getConversations );
router.get('/:conversationId' , verify,getConversation );
router.post('/' , verify,addConversation );
module.exports = router;