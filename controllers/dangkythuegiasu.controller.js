var service = require('../service/dangkythuegiasu.service');

module.exports.index = async function(req, res) {
  var monhocs = await service.index();
  res.render('dangkythuegiasu/index',{
    monhocs : monhocs
  });
};

module.exports.create=  function(req, res){
  var err = service.create(req);
  if (!err){
    console.log(req.body.tenphuhuynh);
      res.redirect('/');
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
