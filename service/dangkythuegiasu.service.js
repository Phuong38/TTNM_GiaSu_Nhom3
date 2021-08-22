const mongoose = require('mongoose');
const LopHoc = mongoose.model('LopHoc');
const MonHoc = mongoose.model('MonHoc');

module.exports.index = async function() {
    return await MonHoc.find().exec();
}

module.exports.create = function(req) {
    var lophoc = new LopHoc();
    lophoc.tenphuhuynh = req.body.tenphuhuynh;
    lophoc.sdt = req.body.sdt;
    lophoc.diachi = req.body.diachi;
    lophoc.diachiemail = req.body.diachiemail;
    lophoc.sobuoi= req.body.selectpicker;
    lophoc.monhoc= req.body.monhoc;
    lophoc.lophoc= req.body.lophoc;
    var arr= req.body.option.map(item => (Array.isArray(item) && item[1]) || null);
    var option="";
    for(let i=0;i<arr.length;i++){
        if(arr[i]){
            option+= arr[i] + " ,";
        }
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
        return err;
    });
}