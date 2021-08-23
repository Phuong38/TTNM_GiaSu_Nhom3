var LopHoc = require('../models/lophoc.model');
const service = require('../service/danhsachlopmoi.service');

module.exports.index =  async function(req, res) {
    
    var lopmois = await service.index();
	res.render('danhsachlopmoi/index', {
		lopmois: lopmois
	});
};
 module.exports.get = async function(req, res){
	var id = req.params.id;
	var lopmoi = await service.get(id);
	res.render('chitietlopmoi/chitiet', {
		lopmoi: lopmoi
	});
 };