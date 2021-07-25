const mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
});
var Role = mongoose.model('Role', RoleSchema);
module.exports = Role;