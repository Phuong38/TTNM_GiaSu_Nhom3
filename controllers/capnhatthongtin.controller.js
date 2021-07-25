const mongoose = require('mongoose');
const GiaSu = mongoose.model('GiaSu');
const LopHoc = mongoose.model('LopHoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');
const TheCanCuoc = mongoose.model('TheCanCuoc');
module.exports.index = async function (req, res) {
  console.log(res.locals.user);
  var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  console.log(count);
  var giasu = await GiaSu.findOne({
    id_User: req.signedCookies.userId
  }).exec();
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
  console.log(1111);
  console.log(lophocs);
  res.render('capnhatthongtin/lopdanhan', {
    lophocs: lophocs,
    count: count
  });
};

module.exports.thecancuoc = async function (req, res) {
  var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  var giasu = await GiaSu.findOne({
    id_User: req.signedCookies.userId
  }).exec();
  if(giasu.id_TheCanCuoc){
    const tcc = await TheCanCuoc.findOne({_id: giasu.id_TheCanCuoc}).exec();
  
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
  var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
  var giasu = await GiaSu.findOne({
    id_User: req.signedCookies.userId
  }).exec();
  const vt = await ViTriGiaSu.findOne({_id: giasu.id_ViTri}).exec();
  console.log("VT");
  console.log(vt);
  res.render('capnhatthongtin/vitrigiasu', {
    vitrigiasu : vt,
    count: count
  });
};
module.exports.postthecancuoc = async function (req, res) {
  var thecancuoc = new TheCanCuoc();
  thecancuoc.sothe = req.body.sothe;
  var ngaycap = req.body.nam + "-" + req.body.thang + "-" + req.body.ngay;
  console.log(ngaycap);
  thecancuoc.ngaycap = ngaycap;
  thecancuoc.hokhauthuongchu = req.body.hokhauthuongchu;
  var gs = await GiaSu.findOne({
    id_User: req.signedCookies.userId
  }).exec();
  if (!gs.id_TheCanCuoc) {
    await thecancuoc.save((err, docs) => {
      if (!err) {
       
        GiaSu.updateOne({ id_User: req.signedCookies.userId },
          {
            $set: {
              id_TheCanCuoc: thecancuoc._id
            }
          },
          { new: true }).exec();
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
    });
  }
  else{
    await TheCanCuoc.updateOne({ _id: req.body.id },
      {
        $set: {
          sothe: req.body.sothe,
          ngaycap: ngaycap,
          hokhauthuongchu: req.body.hokhauthuongchu,
          
        }
      },
      { new: true }).exec();
    res.redirect('/cap-nhat-thong-tin/vi-tri-gia-su');
  }

};
module.exports.postvitrigiasu = async function (req, res) {
  var vitrigiasu = new ViTriGiaSu();
  vitrigiasu.vitri = req.body.tutor_kind;
  vitrigiasu.thanhtich= req.body.achieved;
  vitrigiasu.kinhnghiem= req.body.experience;
  var gs = await GiaSu.findOne({
    id_User: req.signedCookies.userId
  }).exec();
  if (!gs.id_ViTri) {
    await vitrigiasu.save((err, docs) => {
      if (!err) {
        GiaSu.updateOne({ id_User: req.signedCookies.userId },
          {
            $set: {
              id_ViTri: vitrigiasu._id
            }
          },
          { new: true }).exec();
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
    });
  }
  else{
    await ViTriGiaSu.updateOne({ _id: req.body.id },
      {
        $set: {
          vitri: req.body.tutor_kind,
          thanhtich: req.body.achieved,
          kinhnghiem: req.body.experience
          
        }
      },
      { new: true }).exec();
    res.redirect('/cap-nhat-thong-tin/vi-tri-gia-su');
  }


};
module.exports.capnhatthongtin = async function (req, res) {
  var giasu = new GiaSu();
  giasu.tengiasu = req.body.name;
  giasu.sdt = req.body.phone;
  giasu.email = req.body.email;
  giasu.gioitinh = req.body.gender;
  giasu.namsinh = req.body.birthday;
  giasu.truonghoc = req.body.college_name;
  giasu.nghanhhoc = req.body.college_major;
  var ngaybatdau = req.body.start_month + " - " + req.body.start_year;
  var ngayketthuc = req.body.end_month + " - " + req.body.end_year;
  giasu.thoigianbatdau = ngaybatdau;
  giasu.thoigianketthuc = ngayketthuc;
  giasu.id_User = req.signedCookies.userId;
  console.log(giasu);
  var gs = await GiaSu.findOne({
    id_User: req.signedCookies.userId
  }).exec();
  if (!gs) {
    await giasu.save((err, docs) => {
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
    });
  } else {
    console.log(333);
    await GiaSu.updateOne({ _id: req.body.id },
      {
        $set: {
          tengiasu: req.body.name,
          sdt: req.body.phone,
          email: req.body.email,
          gioitinh: req.body.gioitinh,
          namsinh: req.body.birthday,
          truonghoc: req.body.college_name,
          nghanhhoc: req.body.college_major,
          thoigianbatdau: ngaybatdau,
          thoigianketthuc: ngayketthuc,
        }
      },
      { new: true }).exec();
    res.redirect('/cap-nhat-thong-tin/the-can-cuoc');


  }
};
