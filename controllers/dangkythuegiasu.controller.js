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
      res.redirect('/');
  }
  console.log(option);
  lophoc.thoigian= option;
  lophoc.buoicothehoc= req.body.buoicothehoc;
  lophoc.yeucaugiasu= req.body.yeucaugiasu;
  lophoc.ghichu= req.body.ghichu;
  lophoc.gioitinh= req.body.gioitinh;
  lophoc.hocluc= req.body.hocluc;
  console.log(lophoc);
  lophoc.save((err, doc) => {
      console.log(1);
      if (!err){
        console.log(req.body.tenphuhuynh);
          res.redirect('/danhsachlopmoi/'+lophoc.id);
      }
      else{
        console.log(1);
        console.log('Error during record insertion : ' + err);
      }
          
  });
}

