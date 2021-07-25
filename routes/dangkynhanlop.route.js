var express = require('express');

var controller = require('../controllers/dangkynhanlop.controller');

var router = express.Router();

router.get('/:id', controller.index);
module.exports = router;