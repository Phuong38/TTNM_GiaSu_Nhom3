const mongoose = require('mongoose');
const GiaSu = mongoose.model('GiaSu');
const LopHoc = mongoose.model('LopHoc');
const TheCanCuoc = mongoose.model('TheCanCuoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');

module.exports.getLopHoc = async function(id) {
    return await LopHoc.findOne({ _id: id }).exec();
}

module.exports.getGiaSu = async function(userId) {
  return await GiaSu.findOne({ id_User: userId }).exec();
}

module.exports.getVitri = async function(id_ViTri) {
  return await ViTriGiaSu.findOne({ _id: id_ViTri }).exec();
}

module.exports.getCMT = async function(id_TheCanCuoc) {
  return await TheCanCuoc.findOne({ _id: id_TheCanCuoc }).exec();
}


module.exports.update = async function(req) {
    await LopHoc.updateOne({ _id: req.params.id },
        {
          $set: {
            tinhtrang: false,
            giasu: req.signedCookies.userId
          }
        },
        { new: true }).exec();
}