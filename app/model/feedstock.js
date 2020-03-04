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

Feedstock.supplierUpdateFeedstock = async (insertion) => {
	let query = "UPDATE cms_wt_erp.feedstock_supplier_storage SET value='"+insertion.value+"' WHERE id='"+insertion.id+"';";
	return db(query);
};

Feedstock.supplierRemoveFeedstock = async (id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE id='"+id+"';";
	return db(query);
};

Feedstock.supplierStorageList = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_supplier_storage WHERE supplier_id='"+id+"';";
	return db(query);
};

Feedstock.supplierFeedstockClear = async (id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE feedstock_id='"+id+"';";
	return db(query);
};

Feedstock.purchaseSave = async (purchase) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_purchase (date, full_date, supplier_id, supplier_name, value, storage_id, user) VALUES ('"
		+purchase.date+"', '"
		+purchase.full_date+"', '"
		+purchase.supplier_id+"', '"
		+purchase.supplier_name+"', '"
		+purchase.value+"', '"
		+purchase.storage_id+"', '"
		+purchase.user+"');";
	return db(query);
};

Feedstock.purchaseSaveProduct = async (option) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_purchase_product (purchase_id, feedstock_id, feedstock_info, amount, feedstock_uom, feedstock_value) VALUES ('"
		+option.purchase_id+"', '"
		+option.feedstock_id+"', '"
		+option.feedstock_info+"', '"
		+option.amount+"', '"
		+option.feedstock_uom+"', '"
		+option.feedstock_value+"');";
	return db(query);
};

Feedstock.purchaseConfirm = async (option) => {
	let query = "UPDATE cms_wt_erp.feedstock_purchase SET status='Pedido confirmado', confirmation_user='"+option.user+"' WHERE id='"+option.purchase_id+"';";
	return db(query);
};

Feedstock.purchaseFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_purchase WHERE id='"+id+"';";
	return db(query);
};

Feedstock.purchaseListProducts = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_purchase_product WHERE purchase_id='"+id+"';";
	return db(query);
};

Feedstock.purchaseFilter = async (periodStart, periodEnd, params, values) => {
	let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "feedstock_purchase", "id", "DESC");
	return db(query);
};

Feedstock.storageCreate = async (name) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_storage_instance (name) VALUES ('"+name+"');";
	return db(query);
};

Feedstock.insertInStorage = async (insert) => {
	let query = "INSERT INTO cms_wt_erp.feedstock_storage (storage_id, feedstock_id, amount) VALUES ('"
		+insert.storage_id+"','"
		+insert.feedstock_id+"','"
		+insert.amount+"');";
	return db(query);
};

Feedstock.increaseStorageFeedstockAmount = async (option) => {
	let query = "UPDATE cms_wt_erp.feedstock_storage SET amount=amount + '"+option.amount+"' WHERE storage_id='"+option.storage_id+"' AND feedstock_id='"+option.feedstock_id+"';";
	return db(query);
};

Feedstock.decreaseStorageFeedstockAmount = async (option) => {
	let query = "UPDATE cms_wt_erp.feedstock_storage SET amount=amount - '"+option.amount+"' WHERE storage_id='"+option.storage_id+"' AND feedstock_id='"+option.feedstock_id+"';";
	return db(query);
};

Feedstock.storageList = async () => {
	let query = "SELECT * FROM cms_wt_erp.feedstock_storage_instance ORDER BY id ASC;";
	return db(query);
};

Feedstock.findInStorage = async (params, values) => {
	let query = lib.filterQuery(params, values, "cms_wt_erp", "feedstock_storage", "feedstock_id", "ASC");
	return db(query);
};

module.exports = Feedstock;