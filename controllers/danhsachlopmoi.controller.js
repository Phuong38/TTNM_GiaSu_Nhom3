
var LopHoc_service = require('../service/danhsachlopmoi.service')
module.exports.index =  async function(req, res) {
    
    // var lopmois = await LopHoc.find({tinhtrang : true}).limit(8);
	var lopmois = await LopHoc_service.index();
	res.render('danhsachlopmoi/index', {
		lopmois: lopmois
	});
};
 module.exports.get = async function(req, res){
	var id = req.params.id;
	var lopmoi = await LopHoc_service.get(id);
	res.render('chitietlopmoi/chitiet', {
		lopmoi: lopmoi
	});
 };
