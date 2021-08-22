const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Excel = require('exceljs');
const fs = require("fs")
const path = require("path")
var XlsxTemplate = require('xlsx-template');
const LopHoc = mongoose.model('LopHoc');
const GiaSu = mongoose.model('GiaSu');
const User = mongoose.model('User');
const MonHoc = mongoose.model('MonHoc');
const TheCanCuoc = mongoose.model('TheCanCuoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');
// get quản lý lớp học
module.exports.index = async function (req, res) {
  var lophocs = await LopHoc.find({ tinhtrang: false }).exec();
  res.render('admin/index', {
    lophocs: lophocs
  });
};

//get quản lý phiêu đăng ký thuê gia sư
module.exports.indexLopMoi = async function (req, res) {
  var lophocs = await LopHoc.find({ tinhtrang: true }).exec();

  res.render('admin/adminlopmoi', {
    lophocs: lophocs
  });
};

// get quản lý qia sư
module.exports.indexGiaSu = async function (req, res) {
  var giasus = await GiaSu.find().exec();

  res.render('admin/admingiasu', {
    giasus: giasus
  });
};

//get quản lý môn học
module.exports.indexMonHoc = async function (req, res) {
  var monhocs = await MonHoc.find().exec();
  res.render('admin/adminmonhoc', {
    monhocs: monhocs
  });
};
// get thêm phiếu đăng ký thuê gia sư
module.exports.indexLopMoiCreate = async function (req, res) {
  var lophocs = await LopHoc.find().exec();

  res.render('admin/adminlopmoiCreate', {
    lophocs: lophocs
  });
};
// Post thêm phiêu đăng ký thuê gia sư và sửa phiếu đăng ký thuê gia sư
module.exports.createLopMoi = async function (req, res) {
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
    console.log(1);
    if (!err) {
      console.log(req.body.tenphuhuynh);
      res.redirect('/admin/lopmois');
    }
    else {
      console.log(2);
      if (err.name == 'ValidationError') {
        console.log(3);
        console.log(err);
        res.render('admin/adminlopmoiCreate', {

          lopmoi: req.body
        });
      }
      else {
        console.log(1);
        console.log('Error during record insertion : ' + err);
      }

    }
  });

};
//get sửa phiếu đăng ký thuê gia sư
module.exports.editLopMoi = async function (req, res) {
  var id = req.params.id;
  var lophoc = await LopHoc.findOne({ _id: id }).exec();

  res.render('admin/adminLopmoiEdit', {
    lophoc: lophoc
  });
};
// post sửa phiếu đăng ký thuê gia sư
module.exports.PostEditLopMoi = async function (req, res) {
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
  res.redirect('/admin/lopmois');
};
// delete gia sư
module.exports.deleteGiaSu = function (req, res) {
  GiaSu.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/admin/users');
    }
    else { console.log('Error in employee delete :' + err); }
  });
};
//export excel gia sư
module.exports.GiaSuExportExcel = async function (req, res) {
  try {
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
      // { header: 'Số thẻ căn cước', key: 'sothe' },
      // { header: 'Ngày cấp', key: 'ngaycap' },
      // { header: 'Hộ khẩu thường trú', key: 'hokhauthuongchu' },
      // { header: 'Vị trí gia sư', key: 'vitri' },
      // { header: 'Thành tích', key: 'thanhtich' },
      // { header: 'Kinh nghiệm', key: 'kinhnghiem' },
      // { header: 'Tài khoản', key: 'user' },

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
    res.redirect('/admin/giasus');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/giasus');
  }
};
//get quản lý tài khoản
module.exports.indexUser = async function (req, res) {
  var users = await User.find().exec();

  res.render('admin/admintaikhoan', {
    users: users
  });
};

// delete phieu dang ky lop moi
module.exports.deleteLopMoi = function (req, res) {
  LopHoc.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {

      res.redirect('/admin/lopmois');
    }
    else { console.log('Error in employee delete :' + err); }
  });
};

//User
// get edit user
module.exports.editUser = async function (req, res) {
  var id = req.params.id;
  var user = await User.findOne({ _id: id }).exec();

  res.render('admin/admintaikhoanEdit', {
    user: user
  });
};


//post edit user
module.exports.PostEditUser = async function (req, res) {
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
  res.redirect('/admin/users');
};

//delete user
module.exports.deleteUser = function (req, res) {
  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/admin/giasus');
    }
    else { console.log('Error in employee delete :' + err); }
  });
};
//export excel user
module.exports.UserExportExcel = async function (req, res) {
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
  res.redirect('/admin/users');
};

//Môn Học
// get edit môn học
module.exports.editMonHoc = async function (req, res) {
  var id = req.params.id;
  var monhoc = await MonHoc.findOne({ _id: id }).exec();

  res.render('admin/adminmonhocEdit', {
    monhoc: monhoc
  });
};

//post edit monhoc
module.exports.PostEditMonHoc = async function (req, res) {

  await MonHoc.updateOne({ _id: req.body.id },
    {
      $set: {
        tenmonhoc: req.body.tenmonhoc

      }
    },
    { new: true }).exec();
  res.redirect('/admin/monhocs');
};

//delete môn học
module.exports.deleteMonHoc = function (req, res) {
  MonHoc.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/admin/monhocs');
    }
    else { console.log('Error in employee delete :' + err); }
  });
};
// get thêm môn học
module.exports.createMonHoc = async function (req, res) {
  res.render('admin/adminmonhocCreate');
};
// Post thêm  môn học
module.exports.postCreateMonHoc = async function (req, res) {
  var monhoc = new MonHoc();
  monhoc.tenmonhoc = req.body.tenmonhoc;
  await monhoc.save((err, doc) => {
    if (!err) {
      res.redirect('/admin/monhocs');
    }
    else {
      if (err.name == 'ValidationError') {
        console.log(err);
        res.render('admin/adminmonhocCreate', {
          lopmoi: req.body
        });
      }
      else {
        console.log('Error during record insertion : ' + err);
      }
    }
  });

};
// export Excel
module.exports.exportExcel = async function (req, res) {
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
  res.redirect('/admin/lophocs');
};
// Lớp học
// delete Lớp học
module.exports.deleteLopHoc = function (req, res) {
  LopHoc.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/admin/lophocs');
    }
    else { console.log('Error in employee delete :' + err); }
  });
};

// get edit lớp học
module.exports.editLopHoc = async function (req, res) {
  var id = req.params.id;
  var lophoc = await LopHoc.findOne({ _id: id }).exec();

  res.render('admin/adminlophocEdit', {
    lophoc: lophoc
  });
};


//post edit lớp học
module.exports.PostEditLopHoc = async function (req, res) {
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
  res.redirect('/admin/lophocs');
};

