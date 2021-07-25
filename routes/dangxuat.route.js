var express = require('express');

var controller = require('../controllers/dangxuat.controller');

var router = express.Router();

router.get('/', controller.logout);
module.exports = router;