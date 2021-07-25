
var LopHoc = require('../models/lophoc.model');
module.exports.index =  async function(req, res) {
    
    var lopmois = await LopHoc.find({tinhtrang : true}).limit(8);
	res.render('danhsachlopmoi/index', {
		lopmois: lopmois
	});
};
 module.exports.get = async function(req, res){
	var id = req.params.id;
	var lopmoi = await LopHoc.findById(id).exec();
	res.render('chitietlopmoi/chitiet', {
		lopmoi: lopmoi
	});
 };
