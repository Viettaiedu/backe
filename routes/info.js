const express = require('express');
const { verify } = require('../middleware/verify');
const {getInfo} = require('../controllers/info');
const router = express.Router();
router.get('/find/:userId' ,  verify ,  getInfo);
module.exports = router;