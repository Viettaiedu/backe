const express = require('express');
const { verify } = require('../middleware/verify');
const { getNotifications, addNotification} = require('../controllers/notification');
const router = express.Router();

router.get('/' , verify,getNotifications );
router.post('/' , verify,addNotification );

module.exports = router;