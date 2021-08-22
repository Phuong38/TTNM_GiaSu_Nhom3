var admin_service = require('../service/admin.service');
// get quản lý lớp học
module.exports.index = async function (req, res) {
  // var lophocs = await LopHoc.find({ tinhtrang: false }).exec();
  var lophocs = await admin_service.index();
  res.render('admin/index', {
    lophocs: lophocs
  });
};

//get quản lý phiêu đăng ký thuê gia sư
module.exports.indexLopMoi = async function (req, res) {
  // var lophocs = await LopHoc.find({ tinhtrang: true }).exec();
  var lophocs = await admin_service.indexLopMoi();
  res.render('admin/adminlopmoi', {
    lophocs: lophocs
  });
};

// get quản lý qia sư
module.exports.indexGiaSu = async function (req, res) {
  // var giasus = await GiaSu.find().exec();
  var giasus = await admin_service.indexGiaSu();
  res.render('admin/admingiasu', {
    giasus: giasus
  });
};

//get quản lý môn học
module.exports.indexMonHoc = async function (req, res) {
  // var monhocs = await MonHoc.find().exec();
  var monhocs = await admin_service.indexMonHoc();
  res.render('admin/adminmonhoc', {
    monhocs: monhocs
  });
};
// get thêm phiếu đăng ký thuê gia sư
module.exports.indexLopMoiCreate = async function (req, res) {
  // var lophocs = await LopHoc.find().exec();
  var lophocs = await admin_service.indexLopMoiCreate();
  res.render('admin/adminlopmoiCreate', {
    lophocs: lophocs
  });
};
// Post thêm phiêu đăng ký thuê gia sư và sửa phiếu đăng ký thuê gia sư
module.exports.createLopMoi = async function (req, res) {
  var err = admin_service.createLopMoi(req);
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
};
//get sửa phiếu đăng ký thuê gia sư
module.exports.editLopMoi = async function (req, res) {
  var id = req.params.id;
  var lophoc = await admin_service.editLopMoi(id);

  res.render('admin/adminLopmoiEdit', {
    lophoc: lophoc
  });
};

// post sửa phiếu đăng ký thuê gia sư
module.exports.PostEditLopMoi = async function (req, res) {
  await admin_service.PostEditLopMoi(req);
  res.redirect('/admin/lopmois');
};

// delete gia sư
module.exports.deleteGiaSu = function (req, res) {
  var err = admin_service.deleteGiaSu(req.params.id);
  if (!err) {
    res.redirect('/admin/users');
  }
  else { console.log('Error in employee delete :' + err); }
};

//export excel gia sư
module.exports.GiaSuExportExcel = async function (req, res) {
  try {
    await admin_service.GiaSuExportExcel(req, res);
    res.redirect('/admin/giasus');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/giasus');
  }
};
//get quản lý tài khoản
module.exports.indexUser = async function (req, res) {
  var users = await admin_service.indexUser();

  res.render('admin/admintaikhoan', {
    users: users
  });
};

// delete phieu dang ky lop moi
module.exports.deleteLopMoi = function (req, res) {
  var err = admin_service.deleteLopMoi(req.params.id);
  if (!err) {

    res.redirect('/admin/lopmois');
  }
  else { console.log('Error in employee delete :' + err); }
};

//User
// get edit user
module.exports.editUser = async function (req, res) {
  var id = req.params.id;
  var user = await admin_service.editUser(id);

  res.render('admin/admintaikhoanEdit', {
    user: user
  });
};


//post edit user
module.exports.PostEditUser = async function (req, res) {
  await admin_service.PostEditUser(req);
  res.redirect('/admin/users');
};

//delete user
module.exports.deleteUser = function (req, res) {
  var err = admin_service.deleteUser(req.params.id)
  if (!err) {
    res.redirect('/admin/giasus');
  }
  else { console.log('Error in employee delete :' + err); }

};
//export excel user
module.exports.UserExportExcel = async function (req, res) {
  await admin_service.UserExportExcel();
  res.redirect('/admin/users');
};

//Môn Học
// get edit môn học
module.exports.editMonHoc = async function (req, res) {
  var id = req.params.id;
  var monhoc = await admin_service.editMonHoc(id);

  res.render('admin/adminmonhocEdit', {
    monhoc: monhoc
  });
};

//post edit monhoc
module.exports.PostEditMonHoc = async function (req, res) {

  await admin_service.PostEditMonHoc(req);
  res.redirect('/admin/monhocs');
};

//delete môn học
module.exports.deleteMonHoc = function (req, res) {
  var err = admin_service.deleteMonHoc(req.params.id);
  if (!err) {
    res.redirect('/admin/monhocs');
  }
  else { console.log('Error in employee delete :' + err); }
};
// get thêm môn học
module.exports.createMonHoc = async function (req, res) {
  res.render('admin/adminmonhocCreate');
};
// Post thêm  môn học
module.exports.postCreateMonHoc = async function (req, res) {
  var err = await admin_service.postCreateMonHoc(req);
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
};

// export Excel
module.exports.exportExcel = async function (req, res) {
  await admin_service.exportExcel();
  res.redirect('/admin/lophocs');
};


// Lớp học
// delete Lớp học
module.exports.deleteLopHoc = function (req, res) {
  var err = admin_service.deleteLopHoc(req.params.id);
  if (!err) {
    res.redirect('/admin/lophocs');
  }
  else { console.log('Error in employee delete :' + err); }
};

// get edit lớp học
module.exports.editLopHoc = async function (req, res) {
  var id = req.params.id;
  var lophoc = await admin_service.editLopHoc(id);

  res.render('admin/adminlophocEdit', {
    lophoc: lophoc
  });
};


//post edit lớp học
module.exports.PostEditLopHoc = async function (req, res) {
  await admin_service.PostEditLopHoc(req);
  res.redirect('/admin/lophocs');
};

