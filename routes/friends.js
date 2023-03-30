const express = require('express');
const {getUserFriends ,getUserOthers ,addFriend} = require('../controllers/friend');
const {verify} = require('../middleware/verify');
const router = express.Router();

router.get('/' , verify,getUserFriends);
router.get('/others' , verify,getUserOthers);
router.post('/' , verify,addFriend);

module.exports = router;