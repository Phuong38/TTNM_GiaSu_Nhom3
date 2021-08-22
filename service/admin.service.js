const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Excel = require('exceljs');
const fs = require("fs")
const path = require("path")
var XlsxTemplate = require('xlsx-template');
const multer = require('multer');
const LopHoc = mongoose.model('LopHoc');
const GiaSu = mongoose.model('GiaSu');
const User = mongoose.model('User');
const MonHoc = mongoose.model('MonHoc');
const TheCanCuoc = mongoose.model('TheCanCuoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');

// get quản lý lớp học
module.exports.index = async function() {
    return await LopHoc.find({ tinhtrang: false }).exec();
}

//get quản lý phiếu đăng ký thuê gia sư
module.exports.indexLopMoi = async function() {
    return await LopHoc.find({ tinhtrang: true }).exec();
}

//get quản lý gia sư
module.exports.indexGiaSu = async function() {
    return await GiaSu.find().exec();
}

//get quản lý môn học
module.exports.indexMonHoc = async function() {
    return await MonHoc.find().exec();
}

//get thêm phiếu đăng ký thuê gia sư
module.exports.indexLopMoiCreate = async function (){
    return await LopHoc.find().exec();
}

// post thêm phiếu đăng ký thuê gia sư và sửa phiếu đăng ký thuê gia sư
module.exports.createLopMoi = async function (req){
    var lophoc = new LopHoc();
    lophoc.tenphuhuynh = req.body.tenphuhuynh;
    lophoc.sdt = req.body.sdt;
    lophoc.diachi = req.body.diachi;
    lophoc.diachiemail = req.body.diachiemail;
    lophoc.sobuoi = req.body.selectpicker;
    lophoc.monhoc = req.body.monhoc;
    lophoc.lophoc = req.body.lophoc;
    var arr = req.body.option.map(item => (Array.isArray(item) && item[1]) || null);
    var option = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            option += arr[i] + " ,";
        }
    }
    console.log(option);
    lophoc.thoigian = option;
    lophoc.buoicothehoc = req.body.buoicothehoc;
    lophoc.yeucaugiasu = req.body.yeucaugiasu;
    lophoc.ghichu = req.body.ghichu;
    lophoc.gioitinh = req.body.gioitinh;
    lophoc.hocluc = req.body.hocluc;
    console.log(lophoc);

    await lophoc.save((err, doc) => {
        return err;
    });
}

// get sửa phiếu đăng ký thuê gia sư
module.exports.editLopMoi = async function(id) {
    return await LopHoc.findOne({ _id: id }).exec();
}

// post sửa phiếu đăng ký thuê gia sư
module.exports.PostEditLopMoi = async function(req) {
    var arr = req.body.option.map(item => (Array.isArray(item) && item[1]) || null);
    var option = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        option += arr[i] + " ,";
      }
    }
    console.log(req.body.id);
    await LopHoc.updateOne({ _id: req.body.id },
      {
        $set: {
          tenphuhuynh: req.body.tenphuhuynh,
          sdt: req.body.sdt,
          diachi: req.body.diachi,
          diachiemail: req.body.diachiemail,
          sobuoi: req.body.selectpicker,
          monhoc: req.body.monhoc,
          lophoc: req.body.lophoc,
          thoigian: option,
          buoicothehoc: req.body.buoicothehoc,
          yeucaugiasu: req.body.yeucaugiasu,
          ghichu: req.body.ghichu,
          gioitinh: req.body.gioitinh,
          hocluc: req.body.hocluc,
  
        }
      },
      { new: true }).exec();
}

// delete gia sư 
module.exports.deleteGiaSu = function(id) {
    GiaSu.findByIdAndRemove(id, (err, doc) => {
        return err;
    });
}

// export excel gia sư
module.exports.GiaSuExportExcel = async function (req, res) {
    let workbook = new Excel.Workbook();
    var giasus = await GiaSu.find().exec();

    let worksheet = workbook.addWorksheet('Gia Sư');
    worksheet.columns = [
        { header: 'Tên', key: 'tengiasu' },
        { header: 'SDT', key: 'sdt' },
        { header: 'Email', key: 'email' },
        { header: 'Giới Tính', key: 'gioitinh' },
        { header: 'Năm sinh', key: 'namsinh' },
        { header: 'Trường Học', key: 'truonghoc' },
        { header: 'Nghành Học', key: 'nghanhhoc' },
        { header: 'Thời gian bắt đầu', key: 'thoigianbatdau' },
        { header: 'Thời gian kết thúc', key: 'thoigianketthuc' },
    ]
    worksheet.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length
    });
    worksheet.getRow(1).font = { bold: true };
    giasus.forEach((e, index) => {
        var thecancuocs =   TheCanCuoc.findOne({ _id: e.id_TheCanCuoc },(err, user) => {
        if (err) {
            res.status(500).send(err)
        } else {
            console.log(user);
        }
    });
        var vitris =   ViTriGiaSu.findOne({ _id: e.id_ViTri },(err, user) => {
        if (err) {
            res.status(500).send(err)
        } else {
            console.log(user);
        }
    });
        console.log(thecancuocs)
        worksheet.addRow({
        tengiasu: e.tengiasu, sdt: e.sdt, email: e.email, gioitinh: e.gioitinh, namsinh: e.namsinh, truonghoc: e.truonghoc, nghanhhoc: e.nghanhhoc,
        thoigianbatdau: e.thoigianbatdau, thoigianketthuc: e.thoigianketthuc
        });

    });
    const totalNumberOfRows = worksheet.rowCount;
    // Add the total Rows
    worksheet.addRow([
        '',
        'Total',
        {
        formula: totalNumberOfRows - 1,
        }
    ]);
    await workbook.xlsx.writeFile('GiaSu.xlsx');
}

// get quản lý tài khoản
module.exports.indexUser = async function() {
    return await User.find().exec();
}

// delete phiếu đăng ký lớp mới
module.exports.deleteLopMoi = function(id) {
    LopHoc.findByIdAndRemove(id, (err, doc) => {
        return err;
    });
}

//user
// get edit user
module.exports.editUser = async function(id) {
    return await User.findOne({ _id: id }).exec();
}

// post edit user
module.exports.PostEditUser = async function (req){
    var password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: req.body.id },
    {
        $set: {
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
        id_Role: req.body.role

        }
    },
    { new: true }).exec();
}

//delete user 
module.exports.deleteUser = function (id) {
    User.findByIdAndRemove(id, (err, doc) => {
        return err;
    })
}

// export excel user
module.exports.UserExportExcel = async function() {
    let workbook = new Excel.Workbook();
    var users = await User.find().exec();

    let worksheet = workbook.addWorksheet('User');
    worksheet.columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Password', key: 'password' },
    { header: 'Active', key: 'active' },
    { header: 'Role', key: 'id_Role' },

    ]
    worksheet.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : column.header.length
    });
    worksheet.getRow(1).font = { bold: true };
    users.forEach((e, index) => {
    worksheet.addRow({
        name: e.name, email: e.email, password: e.password, active: e.active, id_Role: e.id_Role
    });
    });
    const totalNumberOfRows = worksheet.rowCount

    // Add the total Rows
    worksheet.addRow([
    '',
    'Total',
    {
        formula: totalNumberOfRows - 1,
    }

    ]);
    await workbook.xlsx.writeFile('TaiKhoan.xlsx');
}

// Mon hoc
// get edit mon hoc
module.exports.editMonHoc = async function (id) {
    return await MonHoc.findOne({ _id: id }).exec();
}

// post edit monhoc 
module.exports.PostEditMonHoc = async function(req) {
    await MonHoc.updateOne({ _id: req.body.id },
        {
            $set: {
            tenmonhoc: req.body.tenmonhoc

            }
        },
        { new: true }).exec();
}

// delete mon hoc
module.exports.deleteMonHoc = function(id) {
    MonHoc.findByIdAndRemove(id, (err, doc) => {
        return err;
    })
}

// post them mon hoc
module.exports.postCreateMonHoc = async function(tenmonhoc) {
    var monhoc = new MonHoc();
    monhoc.tenmonhoc = tenmonhoc;
    await monhoc.save((err, doc) => {
        return err;
    });
}

// export Excel
module.exports.exportExcel = async function() {
    let workbook = new Excel.Workbook();
    var lophocs = await LopHoc.find({ tinhtrang: false }).exec();

    let worksheet = workbook.addWorksheet('LopHoc');
    worksheet.columns = [
    { header: 'ID', key: '_id' },
    { header: 'Tên Phụ Huynh', key: 'tenphuhuynh' },
    { header: 'SDT', key: 'sdt' },
    { header: 'Địa chỉ', key: 'diachi' },
    { header: 'Số buổi', key: 'sobuoi' },
    { header: 'Thời gian', key: 'thoigian' },
    { header: 'Lớp Học', key: 'lophoc' },
    { header: 'Môn học', key: 'monhoc' },
    { header: 'Ca học', key: 'buoicothehoc' },
    { header: 'Gia Sư', key: 'giasu' }
    ]
    worksheet.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : column.header.length
    });
    worksheet.getRow(1).font = { bold: true };
    lophocs.forEach((e, index) => {
    worksheet.addRow({
        _id: e._id, tenphuhuynh: e.tenphuhuynh, sdt: e.sdt, diachi: e.diachi, sobuoi: e.sobuoi, thoigian: e.thoigian, lophoc: e.lophoc,
        monhoc: e.monhoc, buoicothehoc: e.buoicothehoc, giasu: e.giasu
    });
    });
    const totalNumberOfRows = worksheet.rowCount

    // Add the total Rows
    worksheet.addRow([
    '',
    'Total',
    {
        formula: totalNumberOfRows - 1,
    }

    ]);
    await workbook.xlsx.writeFile('LopHoc.xlsx');
}

// lop hoc
// delete Lop hoc
module.exports.deleteLopHoc = function (id) {
    LopHoc.findByIdAndRemove(id, (err, doc) => {
        return err;
    });
}

// get edit lop hoc
module.exports.editLopHoc = async function(id) {
    return await LopHoc.findOne({ _id: id }).exec();
}

// post edit lop hoc
module.exports.PostEditLopHoc = async function(req) {
    var arr = req.body.option.map(item => (Array.isArray(item) && item[1]) || null);
    var option = "";
    for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
        option += arr[i] + " ,";
    }
    }
    await LopHoc.updateOne({ _id: req.body.id },
    {
        $set: {
        tenphuhuynh: req.body.tenphuhuynh,
        sdt: req.body.sdt,
        diachi: req.body.diachi,
        diachiemail: req.body.diachiemail,
        sobuoi: req.body.selectpicker,
        monhoc: req.body.monhoc,
        lophoc: req.body.lophoc,
        thoigian: option,
        buoicothehoc: req.body.buoicothehoc,
        giasu: req.body.giasu

        }
    },
    { new: true }).exec();
}