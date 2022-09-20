const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Price = function () {

};

Price.save = (price) => {
	let query = "INSERT INTO cms_wt_erp.product_package_price (category_id, package_id, price) VALUES ('"
		+ price.category_id + "', '"
		+ price.package_id + "', '"
		+ price.price + "');";
	return db(query);
};

Price.update = (price) => {
	let query = "UPDATE cms_wt_erp.product_package_price SET price='" + price.price + "' WHERE id='" + price.id + "';";
	return db(query);
};

Price.list = (category_id) => {
	let query = "SELECT * FROM cms_wt_erp.product_package_price where category_id='" + category_id + "' ORDER BY id ASC;";
	return db(query);
};

Price.find = (price) => {
	let query = "SELECT * FROM cms_wt_erp.product_package_price where category_id='" + price.category_id + "' AND package_id='" + price.package_id + "' ORDER BY id ASC;";
	return db(query);
};

Price.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.product_package_price package_price")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Price.delete = (id) => {
	let query = "DELETE FROM cms_wt_erp.product_package_price WHERE package_id='" + id + "';";
	return db(query);
};

Price.deleteAll = (id) => {
	let query = "DELETE FROM cms_wt_erp.product_package_price WHERE category_id='" + id + "';";
	return db(query);
};

module.exports = Price;