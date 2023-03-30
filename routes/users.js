const express = require('express');
const {getUser,  updateUser, getUsers} = require('../controllers/user');
const {verify} = require('../middleware/verify');
const router = express.Router();

router.get('/find/:userId' ,getUser);
router.get('/' , verify, getUsers);
router.patch('/update' , verify,updateUser);
module.exports = router;