const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getUser = async function(email) {
    return await User.findOne({ email: email.trim() }).exec();
}