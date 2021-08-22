// const e = require('express');
const mongoose = require('mongoose');
const LopHoc = mongoose.model('LopHoc');
const service = require('../service/capnhatthongtin.service');

module.exports.index = async function (req, res) {
  console.log(res.locals.user);
  // var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  // console.log(count);
  // var giasu = await GiaSu.findOne({
  //   id_User: req.signedCookies.userId
  // }).exec();
  var count, giasu;
  count, giasu = await service.index(req);
  console.log(giasu);
  res.render('capnhatthongtin/hosothongtin', {
    user: res.locals.user,
    giasu: giasu,
    count: count
  });
};

module.exports.lopdanhan = async function (req, res) {
  var lophocs = await LopHoc.find({ giasu: req.signedCookies.userId }).exec();
  var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  var lophocs, count;
  lophocs, count = await service.lopdanhan(req);
  console.log(1111);
  console.log(lophocs);
  res.render('capnhatthongtin/lopdanhan', {
    lophocs: lophocs,
    count: count
  });
};

module.exports.thecancuoc = async function (req, res) {
//   var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
//   var giasu = await GiaSu.findOne({
//     id_User: req.signedCookies.userId
//   }).exec();
//   if(giasu.id_TheCanCuoc){
//     const tcc = await TheCanCuoc.findOne({_id: giasu.id_TheCanCuoc}).exec();
  
//   console.log("HIHI");
//   console.log(tcc);
//   res.render('capnhatthongtin/thecancuoc', {
//     thecancuoc : tcc,
//     count: count
//   });
// }else{
//   res.render('capnhatthongtin/thecancuoc', {
    
//     count: count
//   });
// }
  var tcc , count;
  tcc, count = await service.thecancuoc(req.signedCookies.userId);
  if (tcc){
    res.render('capnhatthongtin/thecancuoc', {
      thecancuoc : tcc,
      count: count
    });
  }
  else{
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
  var count, vt;
  count, vt = await service.vitrigiasu(req.signedCookies.userId);
  console.log("VT");
  console.log(vt);
  res.render('capnhatthongtin/vitrigiasu', {
    vitrigiasu : vt,
    count: count
  });
};

module.exports.postthecancuoc = async function (req, res) {
  console.log(req)
  var id_TheCanCuoc, err;
  id_TheCanCuoc, err = await service.postthecancuoc(req);
  if (!id_TheCanCuoc) {
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
  var id_ViTri, err;
  id_ViTri, err = await service.postvitrigiasu(req);
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
  var is_Eist, err;
  is_Eist, err = await service.capnhatthongtin(req);
  if (!is_Eist) {
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
