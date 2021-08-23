const mongoose = require('mongoose');
const GiaSu = mongoose.model('GiaSu');
const LopHoc = mongoose.model('LopHoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');
const TheCanCuoc = mongoose.model('TheCanCuoc');
const service = require('../service/capnhatthongtin.service');


module.exports.index = async function (req, res) {
  console.log(res.locals.user);
  // var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  // console.log(count);
  // var giasu = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  var result = await service.index(req);
  var count = result.count;
  var giasu = result.giasu;
  console.log('index gia su controller');
  console.log(giasu);
  res.render('capnhatthongtin/hosothongtin', {
    user: res.locals.user,
    giasu: giasu,
    count: count
  });
};


module.exports.lopdanhan = async function (req, res) {
  // var lophocs = await LopHoc.find({ giasu: req.signedCookies.userId }).exec();
  // var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  var result = await service.lopdanhan(req);
  var lophocs = result.lophocs;
  var count = result.count;
  console.log(1111);
  console.log(lophocs);
  res.render('capnhatthongtin/lopdanhan', {
    lophocs: lophocs,
    count: count
  });
};


module.exports.thecancuoc = async function (req, res) {
  // var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  // var giasu = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  var result = await service.thecancuoc(req.signedCookies.userId);
  var giasu = result.giasu;
  var tcc = result.tcc;
  var count = result.count
  if(giasu.id_TheCanCuoc){
    // const tcc = await TheCanCuoc.findOne({_id: giasu.id_TheCanCuoc}).exec();
    console.log("HIHI");
    console.log(tcc);
    res.render('capnhatthongtin/thecancuoc', {
      thecancuoc : tcc,
      count: count
    });
  }else{
    res.render('capnhatthongtin/thecancuoc', {
      
      count: count
    });
  }
};


module.exports.vitrigiasu = async function (req, res) {
  // var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  // var giasu = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  // const vt = await ViTriGiaSu.findOne({_id: giasu.id_ViTri}).exec();
  var result = await service.vitrigiasu(req.signedCookies.userId);
  var count = result.count;
  var vt = result.vt;
  console.log("VT");
  console.log(vt);
  res.render('capnhatthongtin/vitrigiasu', {
    vitrigiasu : vt,
    count: count
  });
};


module.exports.postthecancuoc = async function (req, res) {
  // var thecancuoc = new TheCanCuoc();
  // thecancuoc.sothe = req.body.sothe;
  // var ngaycap = req.body.nam + "-" + req.body.thang + "-" + req.body.ngay;
  // console.log(ngaycap);
  // thecancuoc.ngaycap = ngaycap;
  // thecancuoc.hokhauthuongchu = req.body.hokhauthuongchu;
  // var gs = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  var result = await service.postthecancuoc(req);
  var gs_id_TheCanCuoc = result.id_TheCanCuoc;
  var err = err;
  if (!gs_id_TheCanCuoc) {
      if (!err) {
        res.redirect('/cap-nhat-thong-tin/vi-tri-gia-su');
      }
      else {
        console.log(2);
        if (err.name == 'ValidationError') {
          console.log(3);
          console.log(err);
          res.render('capnhatthongtin/thecancuoc');
        }
        else {
          console.log(4);
          console.log('Error during record insertion : ' + err);
        }
      }
  }
  else{
    res.redirect('/cap-nhat-thong-tin/vi-tri-gia-su');
  }

};


module.exports.postvitrigiasu = async function (req, res) {
  // var vitrigiasu = new ViTriGiaSu();
  // vitrigiasu.vitri = req.body.tutor_kind;
  // vitrigiasu.thanhtich= req.body.achieved;
  // vitrigiasu.kinhnghiem= req.body.experience;
  // var gs = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  var result = await service.postvitrigiasu(req);
  var id_ViTri = result.id_ViTri;
  var err = result.err;
  if (id_ViTri) {
    if (!err) {
      res.redirect('/cap-nhat-thong-tin/lop-da-nhan');
    }
    else {
      console.log(2);
      if (err.name == 'ValidationError') {
        console.log(3);
        console.log(err);
        res.render('capnhatthongtin/vitrigiasu');
      }
      else {
        console.log(4);
        console.log('Error during record insertion : ' + err);
      }

    }
  }
  else{
    res.redirect('/cap-nhat-thong-tin/vi-tri-gia-su');
  }


};

module.exports.capnhatthongtin = async function (req, res) {
  // var giasu = new GiaSu();
  // giasu.tengiasu = req.body.name;
  // giasu.sdt = req.body.phone;
  // giasu.email = req.body.email;
  // giasu.gioitinh = req.body.gender;
  // giasu.namsinh = req.body.birthday;
  // giasu.truonghoc = req.body.college_name;
  // giasu.nghanhhoc = req.body.college_major;
  // var ngaybatdau = req.body.start_month + " - " + req.body.start_year;
  // var ngayketthuc = req.body.end_month + " - " + req.body.end_year;
  // giasu.thoigianbatdau = ngaybatdau;
  // giasu.thoigianketthuc = ngayketthuc;
  // giasu.id_User = req.signedCookies.userId;
  // console.log(giasu);
  // var gs = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  var result = await service.capnhatthongtin(req);
  var gs = result.gs;
  var err = result.err;
  if (!gs) {
      if (!err) {
        console.log(req.body.tenphuhuynh);
        res.redirect('/cap-nhat-thong-tin/the-can-cuoc');
      }
      else {
        console.log(2);
        if (err.name == 'ValidationError') {
          console.log(3);
          console.log(err);
          res.render('capnhatthongtin/hosothongtin');
        }
        else {
          console.log(4);
          console.log('Error during record insertion : ' + err);
        }

      }
  } else {
    console.log(333);
    res.redirect('/cap-nhat-thong-tin/the-can-cuoc');
  }
};