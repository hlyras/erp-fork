const db = require('../../../config/connection');
const lib = require("../../../config/lib");
const Lib = require("jarmlib");

const Product = function(){
	this.id;
	this.code;
	this.name;
	this.color;
	this.size;
	this.weight;
	this.width;
	this.height;
	this.depth;
	this.brand;
	this.image;
	this.video;
	this.status;
	this.description;
	this.announcement;
};

Product.save = async (product) => {
	let query = "INSERT INTO cms_wt_erp.product (code, name, color, size, weight, brand, image, video, status, description, announcement) VALUES ('"
		+product.code+"', '"
		+product.name+"','"
		+product.color+"','"
		+product.size+"','"
		+product.weight+"','"
		+product.brand+"','"
		+product.image+"','"
		+product.video+"','"
		+product.status+"','"
		+product.description+"','"
		+product.announcement+"');";
	return db(query);
};

Product.update = async (product) => {
	let query = "UPDATE cms_wt_erp.product SET code='"+product.code
		+"', name='"+product.name
		+"', color='"+product.color
		+"', size='"+product.size
		+"', weight='"+product.weight
		+"', brand='"+product.brand
		+"', image='"+product.image
		+"', video='"+product.video
		+"', status='"+product.status
		+"', description='"+product.description
		+"', announcement='"+product.announcement+"' WHERE id='"+product.id+"';";
	return db(query);
};

Product.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.product ORDER BY code ASC;";
	return db(query);
};

Product.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.findByCode = async (code) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE code='"+code+"';";
	return db(query);
};

Product.filter = (props, inners, params, strict_params, order_params) => {
	let query = new Lib.Query().select().props(props).table("cms_wt_erp.product product")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Product.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

module.exports = Product;