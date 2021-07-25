var express = require('express');

var controller = require('../controllers/dangkytaikhoan.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/',controller.create);
router.get('/activateUser',controller.active);
module.exports = router;