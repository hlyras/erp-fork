const db = require('../../../config/connection');
const lib = require("jarmlib");

const ServiceOrder = {};

ServiceOrder.save = (service_order) => {
	let query = `INSERT INTO cms_wt_erp.sale_service_order (datetime, method, size, status, user_id) VALUES ('${service_order.datetime}', '${service_order.shipment_method}', '${service_order.size}', '${service_order.status}', '${service_order.user_id}')`;
	return db(query);
};

ServiceOrder.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.sale_service_order service_order")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build();
	return db(query, values);
};

ServiceOrder.findById = (id) => {
	let query = `SELECT * FROM cms_wt_erp.sale_service_order WHERE id='${id}'`;
	return db(query);
};

ServiceOrder.sale = {};

ServiceOrder.sale.save = (sale) => {
	let query = `INSERT INTO cms_wt_erp.sale_service_order_sale (service_order_id, sale_id) VALUES ('${sale.service_order_id}', '${sale.sale_id}')`;
	return db(query);
};

ServiceOrder.sale.update = (sale) => {
	let query = `UPDATE cms_wt_erp.sale_service_order_sale SET status='${sale.status}' WHERE id='${sale.id}'`;
	return db(query);
};

ServiceOrder.sale.list = (service_order_id) => {
	let query = `SELECT * FROM cms_wt_erp.sale_service_order_sale WHERE service_order_id = ${service_order_id};`;
	return db(query);
};

ServiceOrder.sale.filter = (props, inners, params, strict_params, order_params, limit) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.sale_service_order_sale service_order_sale")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).limit(limit).build();
	return db(query, values);
};

ServiceOrder.collect = {};

ServiceOrder.collect.confirm = (service_order) => {
	let query = `UPDATE cms_wt_erp.sale_service_order SET 
		status='${service_order.status}', 
		collect_datetime='${service_order.collect_datetime}', 
		collect_user_id='${service_order.collect_user_id}' WHERE id='${service_order.id}';`;
	return db(query);
};

ServiceOrder.collect.cancel = (service_order) => {
	let query = `UPDATE cms_wt_erp.sale_service_order SET 
		status='${service_order.status}', 
		cancel_datetime='${service_order.cancel_datetime}', 
		cancel_user_id='${service_order.cancel_user_id}' WHERE id='${service_order.id}';`;
	return db(query);
};

ServiceOrder.recept = {};

ServiceOrder.recept.confirm = (service_order) => {
	let query = `UPDATE cms_wt_erp.sale_service_order SET 
		status='${service_order.status}', 
		recept_datetime='${service_order.recept_datetime}', 
		recept_user_id='${service_order.recept_user_id}' WHERE id='${service_order.id}';`;
	return db(query);
};

ServiceOrder.recept.cancel = (service_order) => {
	let query = `UPDATE cms_wt_erp.sale_service_order SET 
		status='${service_order.status}', 
		cancel_datetime='${service_order.cancel_datetime}', 
		cancel_user_id='${service_order.cancel_user_id}' WHERE id='${service_order.id}';`;
	return db(query);
};

module.exports = ServiceOrder;