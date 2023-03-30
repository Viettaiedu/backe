const express = require('express');
const { verify } = require('../middleware/verify');
const {getUsersRequest ,addFriendsToRequest , deleteRequest} = require('../controllers/friendRequest');
const router = express.Router();

router.get('/' ,verify,  getUsersRequest);
router.post('/' ,verify,  addFriendsToRequest);
router.delete('/' ,verify,  deleteRequest);
module.exports = router;