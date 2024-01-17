const db = require('../../../../config/connection');

const Image = function () {
	this.id;
	this.package_id;
	this.etag;
	this.url;
	this.keycode;

	this.save = () => {
		let query = `INSERT INTO cms_wt_erp.product_package_image (package_id, etag, url, keycode) VALUES (${this.package_id},'${this.etag}','${this.url}','${this.keycode}');`;
		return db(query);
	};
};

Image.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_package_image WHERE id='" + id + "';";
	return db(query);
};

Image.list = (package_id) => {
	let query = `SELECT * FROM cms_wt_erp.product_package_image WHERE package_id=${package_id};`;
	return db(query);
};

Image.delete = (id) => {
	let query = `DELETE FROM cms_wt_erp.product_package_image WHERE id=${id};`;
	return db(query);
};

Image.deleteByPackagetId = (package_id) => {
	let query = `DELETE FROM cms_wt_erp.product_package_image WHERE package_id=${package_id};`;
	return db(query);
};

module.exports = Image;