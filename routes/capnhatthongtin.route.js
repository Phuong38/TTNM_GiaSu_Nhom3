var express = require('express');

var controller = require('../controllers/capnhatthongtin.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/lop-da-nhan', controller.lopdanhan);
router.post('/', controller.capnhatthongtin);

router.get('/vi-tri-gia-su', controller.vitrigiasu);
router.get('/the-can-cuoc', controller.thecancuoc);
router.post('/vi-tri-gia-su', controller.postvitrigiasu);
router.post('/the-can-cuoc', controller.postthecancuoc);
module.exports = router;