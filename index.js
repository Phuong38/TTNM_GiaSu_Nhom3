require('dotenv').config();
require('./models/db');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const path = require('path');
var csurf = require('csurf');
var mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');

//mongoose.connect(process.env.MONGO_URL);
var dangkythuegiasuRouter= require('./routes/dangkythuegiasu.route');
var danhsachlopmoiRouter= require('./routes/danhsachlopmoi.route');
var lienheRouter = require('./routes/lienhe.route');
var gioithieuRouter = require('./routes/gioithieu.route');
var bloggiasuRouter = require('./routes/bloggiasu.route');
var blogkhachhangRouter = require('./routes/blogkhachhang.route');
var dangnhapRouter = require('./routes/dangnhap.route');
var dangkytaikhoanRouter = require('./routes/dangkytaikhoan.route');
var dangxuatRouter = require('./routes/dangxuat.route');
var dangkynhanlopRouter = require('./routes/dangkynhanlop.route');
var capnhatthongtinRouter = require('./routes/capnhatthongtin.route');
var adminRouter =require('./routes/admin.route');
var authMiddleware = require('./middlewares/auth.middleware');


var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cookieParser('MY SECRET'));


app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


// Routes
app.get('/',  function(req, res) {
  res.render('index');
});

app.get('/gia-su', function(req, res) {
  res.render('indexgiasu',{
    user : res.locals.user
  });
});


// app.get('/contact', function(req, res) {
//   res.render('contact', {
//     name: 'AAA'
//   });
// });

app.use('/dangkythuegiasu',dangkythuegiasuRouter);
app.use('/danhsachlopmoi', danhsachlopmoiRouter);
app.use('/contact',lienheRouter);
app.use('/gioithieu',gioithieuRouter);
app.use('/blog-gia-su',bloggiasuRouter);
app.use('/blog-khach-hang', blogkhachhangRouter);
app.use('/dang-ky-lam-gia-su',dangkytaikhoanRouter);
app.use('/login', dangnhapRouter);
app.use('/logout', dangxuatRouter);
app.use('/dangkynhanlop',authMiddleware.requireAuth,  dangkynhanlopRouter);
app.use('/cap-nhat-thong-tin',authMiddleware.requireAuth,capnhatthongtinRouter);
app.use('/admin', adminRouter);
//app.use('/chitietlopmoi',chitietlopmoiRouter);

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
