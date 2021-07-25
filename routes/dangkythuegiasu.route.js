var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/dangkythuegiasu.controller');



var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/', controller.index);
router.post('/',controller.create);
module.exports = router;
