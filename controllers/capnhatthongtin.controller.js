var service = require('../service/capnhatthongtin.service');
module.exports.index = async function (req, res) {
  var count, giasu;
  count, giasu = service.index(req);
  console.log(res.locals.user);
  res.render('capnhatthongtin/hosothongtin', {
    user: res.locals.user,
    giasu: giasu,
    count: count
  });
};

module.exports.lopdanhan = async function (req, res) {
  var lophocs, count;
  lophocs, count = await service.lopdanhan(req.signedCookies.userId);
  console.log(1111);
  console.log(lophocs);
  res.render('capnhatthongtin/lopdanhan', {
    lophocs: lophocs,
    count: count
  });
};

module.exports.thecancuoc = async function (req, res) {
  var tcc, count;
  tcc , count = service.thecancuoc(req.signedCookies.userId);
  if(tcc){
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
  var count, vt;
  count, vt = await service.vitrigiasu(req.signedCookies.userId);
  res.render('capnhatthongtin/vitrigiasu', {
    vitrigiasu : vt,
    count: count
  });
};


module.exports.postthecancuoc = async function (req, res) {
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
