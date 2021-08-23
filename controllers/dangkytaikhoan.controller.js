const {sendEmail} = require('../helpers/utility');
const service = require('../service/dangkytaikhoan.service');

const activateUser = async (email, secretKey) => {
  try {
      let foundUser = await service.getUser(email, secretKey);
      if (!foundUser) {
          throw "Không tìm thấy User để kích hoạt";
      }    
      if (foundUser.active === 0) {
          foundUser.active = 1;
          await foundUser.save();            
      } else {
          throw "User đã kích hoạt";//foundUser.active = 1
      }
  } catch(error) {        
      throw error;       
  }
};

module.exports.index = function(req, res) {
    res.render('dangky/index');
};

module.exports.active =  async function(req, res){
  let {email, secretKey} = req.query;
  try {
		await activateUser(email, secretKey)
    // await service.active(email, secretKey);
		res.redirect('/gia-su');
	} catch(error) {
		res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
	}
      

};
module.exports.create=  async function(req, res){
  console.log(req.body);
  var err =  service.create(req);
  console.log(1);
  if (!err){
    console.log(req.body.name);
    // sendEmail( req.body.email, req.body.password);
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
    console.log(name);
    console.log(email);
    console.log(password);
      await service.insertuser(name, email, password);
      res.redirect('/gia-su');
  } catch(error) {
    res.render('dangky/index', {
                  
      lopmoi: req.body
  });
  }
};  

// module.exports.