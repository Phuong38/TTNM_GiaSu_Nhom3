const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    //schema: cấu trúc của 1 collection 
    name: {type: String, default: 'unknown', unique: true},    
    email: {type: String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    password: {type: String, required: true},    
    active: {type: Number, default: 0}, //inactive 
    id_Role: {
                type: mongoose.Schema.Types.Number, 
                ref: 'Role',
                default :0,
                
            }, 
})
//Chuyển từ Schema sang Model
var User= mongoose.model('User', UserSchema); 
module.exports = User;

