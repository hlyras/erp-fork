const db = require('../../config/connection');
const lib = require('../../config/lib');

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

Product.updateFeedstock = async (insertion) => {
	let query = "UPDATE cms_wt_erp.product_feedstock SET amount='"+insertion.amount+"' WHERE id='"+insertion.id+"';";
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

Product.filter = async (name, params, values) => {
	let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product", "code", "ASC");
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

Product.productionSave = async (production) => {
	let query = "INSERT INTO cms_wt_erp.product_production (date, full_date, storage_id, user) VALUES ('"
		+production.date+"', '"
		+production.full_date+"', '"
		+production.storage_id+"', '"
		+production.user+"');";
	return db(query);
};

Product.productionSaveProduct = async (production_id, product) => {
	let query = "INSERT INTO cms_wt_erp.product_production_product (production_id, product_id, product_info, amount) VALUES ('"
		+production_id+"', '"
		+product.id+"', '"
		+product.info+"', '"
		+product.amount+"');";
	return db(query);
};

Product.productionSaveFeedstock = async (production_id, feedstock) => {
	let query = "INSERT INTO cms_wt_erp.product_production_feedstock (production_id, feedstock_id, feedstock_info, feedstock_uom, amount, standardAmount, releasedAmount) VALUES ('"
		+production_id+"', '"
		+feedstock.id+"', '"
		+feedstock.info+"', '"
		+feedstock.uom+"', '"
		+feedstock.amount+"', '"
		+feedstock.standardAmount+"', '"
		+feedstock.releasedAmount+"');";
	return db(query);
};

Product.productionConfirm = async (option) => {
	let query = "UPDATE cms_wt_erp.product_production SET status='Pedido confirmado', confirmation_user='"+option.user+"' WHERE id='"+option.production_id+"';";
	return db(query);
};

Product.productionFilter = async (periodStart, periodEnd, params, values) => {
	let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "product_production", "id", "DESC");
	return db(query);
};

Product.productionFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_production WHERE id='"+id+"';";
	return db(query);
};

Product.productionListProducts = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_production_product WHERE production_id='"+id+"';";
	return db(query);
};

Product.productionListFeedstocks = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_production_feedstock WHERE production_id='"+id+"';";
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