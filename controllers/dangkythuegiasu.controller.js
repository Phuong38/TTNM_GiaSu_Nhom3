const mongoose = require('mongoose');
const LopHoc = mongoose.model('LopHoc');
const MonHoc = mongoose.model('MonHoc');
const service = require('../service/dangkythuegiasu.service');


module.exports.index = async function(req, res) {
  var monhocs = await service.index();
  res.render('dangkythuegiasu/index',{
    monhocs : monhocs
  });
};

module.exports.create=  function(req, res){
  var err = service.create(req);
  console.log(1);
  if (!err){
    console.log(req.body.tenphuhuynh);
      res.redirect('/danhsachlopmoi');
  }
  else {
    console.log(2);
      if (err.name == 'ValidationError') {
        console.log(3);
        console.log(err);
          res.render('dangkythuegiasu/index', {
              lopmoi: req.body
          });
      }
      else{
        console.log(1);
        console.log('Error during record insertion : ' + err);
      }
          
  }
};