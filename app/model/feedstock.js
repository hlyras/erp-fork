const db = require('../../config/connection');
const lib = require('../../config/lib');

const Feedstock = function(){
	this.id;
	this.code;
	this.name;
	this.color;
	this.standard;
	this.uom;
};

Feedstock.save = async (feedstock) => {
	let query = "INSERT INTO cms_wt_erp.feedstock (code, name, color, standard, uom) VALUES ('"
		+feedstock.code+"', '"
		+feedstock.name+"','"
		+feedstock.color+"','"
		+feedstock.standard+"','"
		+feedstock.uom+"');";
	return db(query);
};

Feedstock.update = async (feedstock) => {
	let query = "UPDATE cms_wt_erp.feedstock SET code='"+feedstock.code
		+"', name='"+feedstock.name
		+"', color='"+feedstock.color
		+"', standard='"+feedstock.standard
		+"', uom='"+feedstock.uom+"' WHERE id='"+feedstock.id+"';";
	return db(query);
};

Feedstock.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.feedstock ORDER BY code ASC;";
	return db(query);
};

Feedstock.filter = async (params, values) => {
	let query = lib.filterQuery(params, values, "cms_wt_erp", "feedstock", "code", "ASC");
	return db(query);
};

Feedstock.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock WHERE id='"+id+"';";
	return db(query);
};

Feedstock.findByCode = async (code) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock WHERE code='"+code+"';";
	return db(query);
};

Feedstock.findByName = async (name) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock WHERE name like '%"+name+"%' ORDER BY code ASC;";
	return db(query);
};

Feedstock.colorList = async () => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_color;";
	return db(query);
};

Feedstock.remove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock WHERE id='"+id+"';";
	return db(query);
};

Feedstock.supplierCreate = async (supplier) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_supplier (name, phone) VALUES ('"
		+supplier.name+"','"
		+supplier.phone+"');";
	return db(query);
};

Feedstock.supplierFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_supplier WHERE id='"+id+"';";
	return db(query);
};

Feedstock.supplierFindByName = async (name) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_supplier WHERE name like '%"+name+"%' ORDER BY id ASC;";
	return db(query);
};

Feedstock.supplierList = async () => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_supplier ORDER BY id ASC;";
	return db(query);
};

Feedstock.supplierAddFeedstock = async (insertion) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_supplier_storage (supplier_id, feedstock_id, value) VALUES ('"
		+insertion.supplier_id+"', '"
		+insertion.feedstock_id+"', '"
		+insertion.value+"');";
	return db(query);
};

Feedstock.supplierRemoveFeedstock = async (id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE id='"+id+"';";
	return db(query);
};

Feedstock.supplierListStorage = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_supplier_storage WHERE supplier_id='"+id+"';";
	return db(query);
};

Feedstock.storageCreate = async (name) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_storage_instances (name) VALUES ('"+name+"');";
	return db(query);
};

Feedstock.insertInStorage = async (insert) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_storage (storage_id, feedstock_id, amount) VALUES ('"
		+insert.storage_id+"','"
		+insert.feedstock_id+"','"
		+insert.amount+"');";
	return db(query);
};

Feedstock.storageList = async () => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_storage_instances ORDER BY id ASC;";
	return db(query);
};

Feedstock.findInStorage = async (params, values) => {
	let query = lib.filterQuery(params, values, "cms_wt_erp", "feedstock_storage", "feedstock_id", "ASC");
	return db(query);
};

module.exports = Feedstock;