const { read } = require('fs');
const mongoose = require('mongoose');
const GiaSu = mongoose.model('GiaSu');
const LopHoc = mongoose.model('LopHoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');
const TheCanCuoc = mongoose.model('TheCanCuoc');

module.exports.index = async function (req) {
    
    var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
    console.log(count);
    var giasu = await GiaSu.findOne({
    id_User: req.signedCookies.userId
    }).exec();
    console.log(giasu);
    return count, giasu;
}

module.exports.lopdanhan = async function(req) {
    var lophocs = await LopHoc.find({ giasu: req.signedCookies.userId }).exec();
    var count = await LopHoc.find({ giasu: req.signedCookies.userId }).count().exec();
    return lophocs, count;
}

module.exports.thecancuoc = async function(userId) {
    var count = await LopHoc.find({ giasu: userId }).count().exec();
    var giasu =  GiaSu.findOne({ id_User: userId }).exec();
    if(giasu.id_TheCanCuoc){
        const tcc = await TheCanCuoc.findOne({_id: giasu.id_TheCanCuoc}).exec();
        console.log("HIHI");
        console.log(tcc);
        return tcc, count;
    }else{
        return count;
    }
}

module.exports.vitrigiasu = async function(userId) {
    var count = await LopHoc.find({ giasu: userId }).count().exec();
    var giasu =  GiaSu.findOne({ id_User: userId }).exec();
    console.log(giasu);
    const vt = await ViTriGiaSu.findOne({_id: giasu.id_ViTri}).exec();
    console.log("VT");
    console.log(vt);
    return count, vt;
}

module.exports.postthecancuoc = async function(req) {
    var thecancuoc = new TheCanCuoc();
    thecancuoc.sothe = req.body.sothe;
    var ngaycap = req.body.nam + "-" + req.body.thang + "-" + req.body.ngay;
    console.log(ngaycap);
    thecancuoc.ngaycap = ngaycap;
    thecancuoc.hokhauthuongchu = req.body.hokhauthuongchu;
    var gs =  GiaSu.findOne({ id_User: req.signedCookies.userId }).exec();
    if (!gs.id_TheCanCuoc){
        await thecancuoc.save((err, doc) => {
            if (!err){
                GiaSu.updateOne({ id_User: req.signedCookies.userId }, 
                    {
                        $set: {
                            id_TheCanCuoc: thecancuoc.id
                        }
                    },
                    {new: true }).exec();
                return gs.id_TheCanCuoc, err;
            }
            else{
                return gs.id_TheCanCuoc, err;
            }
        });
    }
    else{
        await TheCanCuoc.updateOne({ _id: req.body.id },
            {
              $set: {
                sothe: req.body.sothe,
                ngaycap: ngaycap,
                hokhauthuongchu: req.body.hokhauthuongchu,
                
              }
            },
            { new: true }).exec();
        return gs.id_TheCanCuoc;
    }
}

module.exports.postvitrigiasu = async function(req) {
    var vitrigiasu = new ViTriGiaSu();
    vitrigiasu.vitri = req.body.tutor_kind;
    vitrigiasu.thanhtich= req.body.achieved;
    vitrigiasu.kinhnghiem= req.body.experience;
    var gs =  GiaSu.findOne({ id_User: req.signedCookies.userId }).exec();
    if (!gs.id_ViTri){
        await vitrigiasu.save((err, docs) => {
            if (!err) {
              GiaSu.updateOne({ id_User: req.signedCookies.userId },
                {
                  $set: {
                    id_ViTri: vitrigiasu._id
                  }
                },
                { new: true }).exec();
              return gs.id_ViTri, err;
            }
            else {
              return gs.id_ViTri, err;
            }
          });
    }
    else{
        await ViTriGiaSu.updateOne({ _id: req.body.id },
            {
              $set: {
                vitri: req.body.tutor_kind,
                thanhtich: req.body.achieved,
                kinhnghiem: req.body.experience
                
              }
            },
            { new: true }).exec();
        return gs.id_ViTri;
    }
}

module.exports.capnhatthongtin = async function (req) {
    var giasu = new GiaSu();
    giasu.tengiasu = req.body.name;
    giasu.sdt = req.body.phone;
    giasu.email = req.body.email;
    giasu.gioitinh = req.body.gender;
    giasu.namsinh = req.body.birthday;
    giasu.truonghoc = req.body.college_name;
    giasu.nghanhhoc = req.body.college_major;
    var ngaybatdau = req.body.start_month + " - " + req.body.start_year;
    var ngayketthuc = req.body.end_month + " - " + req.body.end_year;
    giasu.thoigianbatdau = ngaybatdau;
    giasu.thoigianketthuc = ngayketthuc;
    giasu.id_User = req.signedCookies.userId;
    console.log(giasu);
    var gs = await GiaSu.findOne({
    id_User: req.signedCookies.userId
    }).exec();
    if (!gs){
        await giasu.save((err, docs) => {
           return false, err;
        });
    }
    else{
        await GiaSu.updateOne({ _id: req.body.id },
            {
              $set: {
                tengiasu: req.body.name,
                sdt: req.body.phone,
                email: req.body.email,
                gioitinh: req.body.gioitinh,
                namsinh: req.body.birthday,
                truonghoc: req.body.college_name,
                nghanhhoc: req.body.college_major,
                thoigianbatdau: ngaybatdau,
                thoigianketthuc: ngayketthuc,
              }
            },
            { new: true }).exec();
        return true;
    }
}