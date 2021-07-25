const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var LopHocSchema = new mongoose.Schema({
  
  tenphuhuynh: {
    type: String,
    
  },
  
  sdt: {
    type: String,
    
  },
  diachi: {
    type: String,
    
  },
  diachiemail: {
    type: String,
   
  },
  lophoc: {
    type: String,
   
  },
  monhoc: {
    type : String,
  }, 
  sobuoi:{
    type: String,
  },
  thoigian: {
    type: String,
   
  },
  buoicothehoc: {
    type: String,
   
  },
  yeucaugiasu: {
    type: String,
   
  },
  ghichu: {
    type: String,
   
  },
  gioitinh: {
    type: String,
   
  },
  hocluc: {
    type: String,
   
  },
  tinhtrang: {
    type: Boolean,
    default: true,
  },
  giasu: {	   type: mongoose.Schema.Types.ObjectId,	    ref: 'GiaSu',	  }

});
LopHocSchema.path('diachiemail').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');


autoIncrement.initialize(mongoose.connection);
LopHocSchema.plugin(autoIncrement.plugin, 'LopHoc');



var LopHoc= mongoose.model('LopHoc', LopHocSchema);
module.exports = LopHoc;


