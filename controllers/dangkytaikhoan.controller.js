// const {sendEmail} = require('../helpers/utility');
// var service = require('../service/dangkytaikhoan.service');


// module.exports.index = function(req, res) {
//     res.render('dangky/index');
// };

// module.exports.active =  async function(req, res){
//   let {email, secretKey} = req.query;
//   try {
// 		await service.active(email, secretKey)
// 		res.redirect('/gia-su');
// 	} catch(error) {
// 		res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
// 	}
      

// };

// module.exports.create=  async function(req, res){
//   var err = service.create(req);
//   console.log(1);
//   if (!err){
//     console.log(req.body.hoten);
//     sendEmail( req.body.email, req.body.password);
//       res.redirect('/gia-su');
//   }
//   else {
//     console.log(2);
//       if (err.name == 'ValidationError') {
//         console.log(3);
//         console.log(err);
//           res.render('dangky/index', {
              
//               lopmoi: req.body
//           });
//       }
//       else{
//         console.log(1);
//         console.log('Error during record insertion : ' + err);
//       }
          
//   }
//   try {
//     let {name, email, password} = req.body;
//     await service.insertuser(name, email, password);
//     res.redirect('/gia-su');
//   } catch(error) {
//     res.render('dangky/index', {
                  
//       lopmoi: req.body
//   });
//   }
// };  

const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const {sendEmail} = require('../helpers/utility');


const insertUser = async (name, email, password) => {
  try {
    //Mã hoá password trước khi lưu vào DB
    const encryptedPassword = await bcrypt.hash(password, 10);//saltRounds = 10
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.password = encryptedPassword;   
      await newUser.save();
      await sendEmail(email, encryptedPassword);
  } catch(error) {
      //Tự tuỳ chỉnh lại Error
      if (error.code === 11000) {
        throw "Tên hoặc email đã tồn tại";
      }
      //throw error
  }
};
//Hàm activeUser dùng 1 GET request
//VD:
//http://Nguyens-iMac:3000/users/activateUser?secretKey=$2b$10$U4iDuK4aJ0.QSvVfRy8g/uvmSCUB0B8KfX75uUj8qr3xudHXcDG7y&email=nodejst9@gmail.com
const activateUser = async (email, secretKey) => {
  try {
      let foundUser = await User.findOne({email, password: secretKey})
                              .exec();
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
		res.redirect('/gia-su');
	} catch(error) {
		res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
	}
      

};
module.exports.create=  async function(req, res){

  var user = new User();
  const encryptedPassword =  bcrypt.hash(req.body.password, 10);
  user.name= req.body.hoten;
  user.email= req.body.email;
  user.password= encryptedPassword;
  // user.id_Role=1;
  console.log(user);
  user.save((err, doc) => {
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
  });
  try {
    let {name, email, password} = req.body;
      await insertUser(name, email, password);
      res.redirect('/gia-su');
  } catch(error) {
    res.render('dangky/index', {
                  
      lopmoi: req.body
  });
  }
};  