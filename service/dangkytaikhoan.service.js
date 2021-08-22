const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

const insertUser = async (name, email, password) => {
    try{
         //Mã hoá password trước khi lưu vào DB
        const encryptedPassword = await bcrypt.hash(password, 10);//saltRounds = 10
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = encryptedPassword;   
        await newUser.save();
    } catch (error) {
        if (error.code === 11000) {
            throw "Tên hoặc email đã tồn tại";
          }
    }
}

const activeUser = async (email, secretKey) => {
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
    } catch (error) {
        throw error;
    }
}

module.exports.active = async function(email, secretKey) {
    await activeUser(email, secretKey);
}

module.exports.create = async function(req) {
    var user = new User();
    const encryptedPassword =  bcrypt.hash(req.body.password, 10);
    user.name= req.body.hoten;
    user.email= req.body.email;
    user.password= encryptedPassword;
    // user.id_Role=1;
    console.log(user);
    user.save((err, doc) => {
        return err;
    });
}

module.exports.insertuser = async function(name, email, password) {
    await insertUser(name, email, password);
}