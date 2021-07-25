const mongoose = require('mongoose');

var ViTriGiaSuSchema = new mongoose.Schema({

    vitri: {
        type: String,
        require: true,
    },
    thanhtich: {
        type: String,
        require: true,
    },
    kinhnghiem:{
        type: String,
        
    }




});
var ViTriGiaSu = mongoose.model('ViTriGiaSu', ViTriGiaSuSchema);
module.exports = ViTriGiaSu;


