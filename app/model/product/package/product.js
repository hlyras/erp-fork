const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Product = function () {
	this.id;
	this.package_id;
	this.product_id;
	this.product_code;
	this.product_info;
	this.amount;
};

Product.add = async (package_id, product) => {
	let query = "INSERT INTO cms_wt_erp.product_package_product (package_id, product_id, product_code, product_info, amount) VALUES ('"
		+package_id+"','"
		+product.id+"','"
		+product.code+"','"
		+product.info+"','"
		+product.amount+"');";
	return db(query);
};

Product.update = async (id, product) => {
	let query = `UPDATE cms_wt_erp.product_package_product SET amount='${product.amount}' WHERE id='${id}';`;
	return db(query);
};

Product.list = async (package_id) => {
	let query = `SELECT * FROM cms_wt_erp.product_package_product WHERE package_id='${package_id}' ORDER BY id ASC;`;
	return db(query);
};

Product.remove = async (id) => {
	let query = `DELETE FROM cms_wt_erp.product_package_product WHERE id='${id}';`;
	return db(query);
};

Product.deleteByPackageId = async (package_id) => {
	let query = `DELETE FROM cms_wt_erp.product_package_product WHERE package_id='${package_id}';`;
	return db(query);
};

module.exports = Product;