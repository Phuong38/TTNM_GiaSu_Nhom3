var LopHoc = require('../models/lophoc.model');

module.exports.index = function() {
    var lopmois = LopHoc.find({tinhtrang : true}).limit(8);
    return lopmois;
}

module.exports.get = function(id) {
    var lopmoi = LopHoc.findById(id).exec();
    return lopmoi;
}