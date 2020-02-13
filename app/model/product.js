const db = require('../../config/connection');

const Product = function(){
	this.id;
	this.code;
	this.name;
	this.color;
	this.size;
};

Product.save = async (product) => {
	let query = "INSERT INTO cms_wt_erp.product (code, name, color, size) VALUES ('"
		+product.code+"', '"
		+product.name+"','"
		+product.color+"','"
		+product.size+"');";
	return db(query);
};

Product.update = async (product) => {
	let query = "UPDATE cms_wt_erp.product SET code='"+product.code
		+"', name='"+product.name
		+"', color='"+product.color
		+"', size='"+product.size+"' WHERE id='"+product.id+"';";
	return db(query);
};

Product.addImage = async (image) => {
	let query = "INSERT INTO cms_wt_erp.product_image (product_id, url) VALUES ('"
		+image.product_id+"', '"
		+image.url+"');";
	return db(query);
};

Product.addFeedstock = async (insertion) => {
	let query = "INSERT INTO cms_wt_erp.product_feedstock (product_id, feedstock_id, amount) VALUES ('"
		+insertion.product_id+"', '"
		+insertion.feedstock_id+"', '"
		+insertion.amount+"');";
	return db(query);
};

Product.removeFeedstock = async (product_feedstock_id) => {
	let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE id='"+product_feedstock_id+"';";
	return db(query);
};

Product.feedstockList = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
	return db(query);
};

Product.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.product ORDER BY code ASC;";
	return db(query);
};

Product.getImages = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
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

Product.findByName = async (name) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE name like '%"+name+"%' ORDER BY code ASC;";
	return db(query);
};

Product.filter = async (product) => {
	if(product.color){
		var query = "SELECT * FROM cms_wt_erp.product WHERE color='"+product.color+"' ORDER BY code ASC;";
	} else {
		var query = "SELECT * FROM cms_wt_erp.product ORDER BY code ASC;";
	};
	return db(query);
};

Product.remove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.removeProductImages = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
	return db(query);
};

Product.removeProductFeedstocks = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
	return db(query);
};

Product.feedstockClear = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
	return db(query);
};

Product.removeImage = async (image_id) => {
	let query = "DELETE FROM cms_wt_erp.product_image WHERE id='"+image_id+"';";
	return db(query);
};

Product.categorySave = async (category) => {
	let query = "INSERT INTO backup.product_category (name, shortcut) VALUES ('"+category.name+"','"+category.shortcut+"');";
	return db(query);
};

Product.categoryList = async () => {
	let query = "SELECT * FROM backup.product_category ORDER BY name ASC;";
	return db(query);
};

Product.colorSave = async (color) => {
	let query = "INSERT INTO cms_wt_erp.product_color (name, shortcut) VALUES ('"+color.name+"','"+color.shortcut+"');";
	return db(query);
};

Product.colorList = async () => {
	let query = "SELECT * FROM cms_wt_erp.product_color;";
	return db(query);
};

module.exports = Product;