const db = require('../../../config/connection');
const lib = require("jarmlib");

const Feedstock = require('./main');

Feedstock.supplier = function() {
	this.id = 0;
	this.cnpj = "";
	this.trademark = "";
	this.brand = "";
	this.name = "";
	this.phone = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.feedstock_supplier (cnpj, trademark, brand, name, phone) VALUES ('"+
			this.cnpj+"','"+
			this.trademark+"','"+
			this.brand+"','"+
			this.name+"','"+
			this.phone+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.feedstock_supplier SET cnpj='"+this.cnpj
			+"', trademark='"+this.trademark
			+"', brand='"+this.brand
			+"', name='"+this.name
			+"', phone='"+this.phone+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Feedstock.supplier.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_supplier supplier")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.supplier.delete = (supplier_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_supplier WHERE id='"+supplier_id+"';";
	return db(query);
};

Feedstock.supplier.storage = {};

Feedstock.supplier.storage.add = (insert) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_supplier_storage (supplier_id, feedstock_id, price) VALUES ('"+
		insert.supplier_id+"','"+
		insert.feedstock_id+"','"+
		insert.price+"');";
	return db(query);
};

Feedstock.supplier.storage.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_supplier_storage supplier_storage")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.supplier.storage.deleteByFeedstockId = (feedstock_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE feedstock_id='"+feedstock_id+"';";
	return db(query);
};

Feedstock.supplier.storage.deleteBySupplierId = (supplier_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE supplier_id='"+supplier_id+"';";
	return db(query);
};

module.exports = Feedstock.supplier;