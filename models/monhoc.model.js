const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var MonHocSchema = new mongoose.Schema({
  tenmonhoc : {
      type : String,
  }
  
});

autoIncrement.initialize(mongoose.connection);
MonHocSchema.plugin(autoIncrement.plugin, 'MonHoc');

var MonHoc= mongoose.model('MonHoc', MonHocSchema);
module.exports = MonHoc;


