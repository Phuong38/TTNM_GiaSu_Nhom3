const mongoose = require('mongoose');
const GiaSu = mongoose.model('GiaSu');
const LopHoc = mongoose.model('LopHoc');
const TheCanCuoc = mongoose.model('TheCanCuoc');
const ViTriGiaSu = mongoose.model('ViTriGiaSu');


module.exports.index = async function(req) {
  const id = req.params.id;
  var lophoc = await LopHoc.findOne({ _id: id }).exec();
  var gs = await GiaSu.findOne({ id_User: req.signedCookies.userId }).exec();
  console.log("Giasu");
  console.log(gs);
  var cmt = await TheCanCuoc.findOne({ _id: gs.id_TheCanCuoc }).exec();
  return{
    lophoc: lophoc,
    gs: gs,
    cmt: cmt
  };
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