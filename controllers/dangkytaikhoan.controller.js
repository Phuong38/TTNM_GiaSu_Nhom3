const service = require('../service/dangkytaikhoan.service');
const {sendEmail} = require('../helpers/utility');

module.exports.index = function(req, res) {
    res.render('dangky/index');
};

module.exports.active =  async function(req, res){
  let {email, secretKey} = req.query;
  try {
		// await activateUser(email, secretKey)
    await service.active(email, secretKey);
		res.redirect('/login');
	} catch(error) {
		res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
	}
      

};
module.exports.create=  async function(req, res){
  var err = await service.create(req);
  console.log(1);
  if (!err){
    console.log(req.body.hoten);
    sendEmail( req.body.email, req.body.password);
      res.redirect('/gia-su');
  }
  else {
    console.log(2);
      if (err.name == 'ValidationError') {
        console.log(3);
        console.log(err);
          res.render('dangky/index', {
              
              lopmoi: req.body
          });
      }
      else{
        console.log(1);
        console.log('Error during record insertion : ' + err);
      }
          
  }
  try {
    let {name, email, password} = req.body;
      await service.insertuser(name, email, password);
      res.redirect('/gia-su');
  } catch(error) {
    res.render('dangky/index', {
                  
      lopmoi: req.body
  });
  }
};  

// module.exports.