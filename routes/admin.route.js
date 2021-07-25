var express = require('express');

var controller = require('../controllers/admin.controller');

var router = express.Router();
//lớp học
router.get('/lophocs', controller.index);
//export excel
router.get('/lophocs/export', controller.exportExcel);
router.get('/lophocs/delete', controller.deleteLopHoc);
router.get('/lophocs/edit/:id', controller.editLopHoc);
router.post('/lophocs/edit/:id', controller.PostEditLopHoc);
//lớp mới
router.get('/lopmois', controller.indexLopMoi);
router.get('/lopmois/add', controller.indexLopMoiCreate);
//gia sư
router.get('/giasus', controller.indexGiaSu);
router.get('/monhocs', controller.indexMonHoc);
router.get('/giasus/export', controller.GiaSuExportExcel);

router.get('/users', controller.indexUser);
router.post('/lopmois/add',controller.createLopMoi);
router.get('/lopmois/edit/:id',controller.editLopMoi);
router.post('/lopmois/edit/:id',controller.PostEditLopMoi);
router.get('/lopmois/delete/:id',controller.deleteLopMoi);
//gia sư
router.get('/giasus/delete/:id',controller.deleteGiaSu);
// users
router.get('/users/edit/:id',controller.editUser);
router.post('/users/edit/:id',controller.PostEditUser);
router.get('/users/delete/:id',controller.deleteUser);
router.get('/users/export', controller.UserExportExcel);
// Môn học
router.get('/monhocs/add',controller.createMonHoc);
router.post('/monhocs/add',controller.postCreateMonHoc);
router.get('/monhocs/edit/:id',controller.editMonHoc);
router.post('/monhocs/edit/:id',controller.PostEditMonHoc);
router.get('/monhocs/delete/:id',controller.deleteMonHoc);
module.exports = router;