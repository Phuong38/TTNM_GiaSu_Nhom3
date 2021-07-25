const mongoose = require('mongoose');
const { sendEmail } = require('../helpers/gmailnhaplop');
const GiaSu = mongoose.model('GiaSu');
const LopHoc = mongoose.model('LopHoc');
const TheCanCuoc = mongoose.model('TheCanCuoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');

module.exports.index = async function (req, res) {
  const id = req.params.id;
  var lophoc = await LopHoc.findOne({ _id: id }).exec();
  var gs = await GiaSu.findOne({ id_User: req.signedCookies.userId }).exec();
  console.log("Giasu");
  console.log(gs);
  var cmt = await TheCanCuoc.findOne({ _id: gs.id_TheCanCuoc }).exec();
  var vt = await ViTriGiaSu.findOne({ _id: gs.id_ViTri }).exec();
  var gioitinh = 'Nam';
  if (!gs.gioitinh) {
    gioitinh = 'Nữ';
  }
  const output = `
    <p>Thông báo : Đã có gia sư nhận lớp GS0${lophoc._id}</p>
    <h3>Thông tin gia sư</h3>
    <ul>  
      <li>Họ Tên: ${gs.tengiasu}</li>
      <li>Số điện thoại : ${gs.sdt}</li>
      <li>Email: ${gs.email}</li>
      <li>Giới tính: ${gioitinh}</li>
      <li>Năm sinh: ${gs.namsinh}</li>
      <li>Chứng minh thư: ${cmt.sothe}</li>
      <li>Quê quán: ${cmt.hokhauthuongchu}</li>
    </ul>
    <h3>Học vấn</h3>
    <ul>  
      <li>Trường học: ${gs.truonghoc}</li>
      <li>Ngành học: ${gs.nghanhhoc}</li>
      <li>Thành tích nổi bật: ${vt.thanhtich}</li>
      <li>Kinh nghiệm gia sư: ${vt.kinhnghiem}</li>
    </ul>
    <h3>Message</h3>
    <p>Gia sư sẽ liên hệ với bạn trong thời gian sớm nhất</p>
    <p>Cảm ơn bạn đã tham gia dịch vụ của trung tâm !</p>
  `;
  const output1 = `
    <p>Thông báo : Bạn đã nhận lớp GS0${lophoc._id}</p>
    
    <h3>Thông tin khách hàng</h3>
    <ul>  
      <li>Họ Tên: ${lophoc.tenphuhuynh}</li>
      <li>Số điện thoại : ${lophoc.sdt}</li>
      <li>Địa chỉ : ${lophoc.diachi}</li>
      <li>Môn Học: ${lophoc.monhoc}</li>
      <li>Lớp học: ${lophoc.lophoc}</li>
      <li>Số buổi: ${lophoc.sobuoi}</li>
      <li>Thời gian: ${lophoc.thoigian}</li>
      <li>Ca học: ${lophoc.buoicothehoc}</li>
    </ul>
    <h3>Đặc điểm học sinh</h3>
    <ul>  
      <li>Học Lực: ${lophoc.hocluc}</li>
      <li>Giới tính: ${lophoc.gioitinh}</li>
      
    </ul>
    
    <h3>Message</h3>
    <p>Vui lòng liên hệ với khách hàng để trao đổi thêm chi tiết!</p>
    <p>Cảm ơn bạn đã tham gia dịch vụ của trung tâm !</p>
  `;
  await sendEmail(gs.email, output1);
  await sendEmail(lophoc.diachiemail, output);
  await LopHoc.updateOne({ _id: id },
    {
      $set: {
        tinhtrang: false,
        giasu: req.signedCookies.userId
      }
    },
    { new: true }).exec();
  

  res.render('dangkynhanlop/index');



};
