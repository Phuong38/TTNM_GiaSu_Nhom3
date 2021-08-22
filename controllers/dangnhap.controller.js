var service = require('../service/dangnhap.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretString = "lethanhphuong";

module.exports.index = function (req, res) {
    res.render('login/index');
};

module.exports.check = async function (req, res, next) {
    let { email, password } = req.body;
    try {

        let foundUser = await service.getUser(email);
        console.log(2);
        if (!foundUser) {
            res.render('login/index', {
                error: 'Tài khoản không tồn tại !',
                values: req.body
            });
            return;
        }
        console.log(3);
        if (foundUser.active === 0) {
            res.render('login/index', {
                error: 'Tài khoản chưa active !',
                values: req.body
            });
            return;
        }
        console.log(4);
        let encryptedPassword = foundUser.password;
        console.log(5);
        let checkPassword = await bcrypt.compare(password, encryptedPassword);
        console.log(checkPassword);
        
        if (checkPassword === true ) {
            //Đăng nhập thành công
            console.log(7);
            let jsonObject = {
                id: foundUser._id
            }
            await jwt.sign(jsonObject,
                secretString, {
                expiresIn: 86400 // Expire trong 24 giờ
            });
            if(foundUser.id_Role == 0){
                res.cookie('userId', foundUser._id, {
                    signed: true
                });
                // res.send(req.signedCookies.userId);
            
                res.redirect('/cap-nhat-thong-tin');
            }else{
                res.redirect('/admin/lopmois');
            }
        } else {
            res.render('login/index', {
                error: 'Sai mật khẩu !',
                values: req.body
            });
            return;
        }
    } catch (error) {

        next(error);
    }
   

}