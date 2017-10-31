var mongoose=require('mongoose');
var SanPham=require('../models/SANPHAM');

var sendJsonRespone=function(res,status,content){
	res.status(status);
	res.json(content);
};

exports.sanPhamByThoiGian=function(req,res){
	SanPham.find().sort('-thoiGian').limit(20).select('-thoiGian')
	.exec(function(error,sanphams){
		if(error){
			return sendJsonRespone(res,400,error)
		}else if(!sanphams){
			return sendJsonRespone(res,404,{"message":"Khong tim duoc san pham nao"})
		}
		
		sendJsonRespone(res,200,sanphams);
	});
}

exports.taoSanPham=function(req,res){
	SanPham.create({
		tenSanPham:req.body.tenSanPham,
		tenFileAnh:req.body.tenFileAnh,
		soLuong:req.body.soLuong,
		gia:req.body.gia,
		loaiSanPham:req.body.loaiSanPham,
		moTa:req.body.moTa
	},function(err,sanpham){
		if (err){
			sendJsonRespone(res,400,err);
		}else
		{
			sendJsonRespone(res,201,sanpham);
		}
	});
}