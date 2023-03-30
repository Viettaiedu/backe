const express = require('express');
const { verify } = require('../middleware/verify');
const {getConversations } = require('../controllers/conversation');
const router = express.Router();

router.get('/' , verify,getConversations );
module.exports = router;