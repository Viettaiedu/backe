const express = require('express');
const { verify } = require('../middleware/verify');
const {getChats, addChat } = require('../controllers/messenge');
const router = express.Router();

router.get('/:conversationId' , verify,getChats );
router.post('' , verify,addChat );
module.exports = router;