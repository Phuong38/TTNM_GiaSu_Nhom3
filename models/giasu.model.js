const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var GiaSuSchema = new mongoose.Schema({

    tengiasu: {
        type: String,

    },

    sdt: {
        type: String,

    },

    email: {
        type: String,

    },
    gioitinh: {
        type: Boolean,
    },

    namsinh: {
        type: Number,

    },
    id_User: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true,
        unique: true 
    }, 
    truonghoc: {
        type: String,
    },
    nghanhhoc: {
        type: String,
    },
    thoigianbatdau: {
        type: String,
    },
    thoigianketthuc: {
        type: String,
    },
    id_ViTri: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ViTriGiaSu' ,
        
        unique: true 
    }, 
    id_TheCanCuoc: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TheCanCuoc' ,
       
        unique: true 
    },  
});
GiaSuSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


// autoIncrement.initialize(mongoose.connection);
// lopMoiSchema.plugin(autoIncrement.plugin, 'LopMoi');



var GiaSu = mongoose.model('GiaSu', GiaSuSchema);
module.exports = GiaSu;


