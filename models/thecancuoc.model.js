const mongoose = require('mongoose');

var TheCanCuocSchema = new mongoose.Schema({

    sothe: {
        type: Number,
        require: true,
    },
    ngaycap: {
        type: Date,
        require: true,
    },
    hokhauthuongchu:{
        type: String,
        require : true,
    }


});
var TheCanCuoc = mongoose.model('TheCanCuoc', TheCanCuocSchema);
module.exports = TheCanCuoc;


