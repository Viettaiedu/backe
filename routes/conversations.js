const express = require('express');
const { verify } = require('../middleware/verify');
const {getConversations, addConversation } = require('../controllers/conversation');
const router = express.Router();

router.get('/' , verify,getConversations );
router.post('/' , verify,addConversation );
module.exports = router;