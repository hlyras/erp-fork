const db = require('../../../config/connection');
const Product = require('./main');

Product.image = function() {
	this.id = 0;
	this.product_id = 0;
	this.url = "";

	this.add = () => {
		let query = "INSERT INTO cms_wt_erp.product_image (product_id, url) VALUES ('"
			+this.product_id+"', '"
			+this.url+"');";
		return db(query);
	};
};

Product.image.list = (product_id) => {
	let query = "SELECT * FROM cms_wt_erp.product_image WHERE product_id='"+product_id+"';";
	return db(query);
};

Product.image.remove = (image_id) => {
	let query = "DELETE FROM cms_wt_erp.product_image WHERE id='"+image_id+"';";
	return db(query);
};

Product.image.removeByProductId = (id) => {
	let query = "DELETE FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
	return db(query);
};

module.exports = Product.image;