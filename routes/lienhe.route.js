var express = require('express');

var controller = require('../controllers/lienhe.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;