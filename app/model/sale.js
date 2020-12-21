const db = require('../../config/connection');
const lib = require('../../config/lib');

const Sale = function(){
	this.id;
	this.sale_date;
	this.estimated_shipping_date;
	this.shipment_date;
	this.customer_id;
	this.customer_name;
	this.customer_cnpj;
	this.payment_method;
	this.status;
	this.value;
};

Sale.save = async sale => {
	let query = "INSERT INTO cms_wt_erp.sale (sale_date, estimated_shipping_date, shipment_date, customer_id, customer_name, customer_cnpj, payment_method, status, value) VALUES ('"
		+sale.sale_date+"', '"
		+sale.estimated_shipping_date+"','"
		+sale.shipment_date+"','"
		+sale.customer_id+"','"
		+sale.customer_name+"','"
		+sale.customer_cnpj+"','"
		+sale.payment_method+"','"
		+sale.status+"','"
		+sale.value+"');";
	return db(query);
};

Sale.filter = (periodStart, periodEnd, params, values) => {
	let query = lib.filterByLikeAndByPeriod(periodStart, periodEnd, params, values, "sale_date", "cms_wt_erp", "sale", "id", "DESC");
	return db(query);
};

Sale.product = {
	save: async (sale_id, product) => {
		let query = "INSERT INTO cms_wt_erp.sale_product (sale_id, product_id, product_info, product_amount, product_price) VALUES ('"
			+sale_id+"', '"
			+product.id+"','"
			+product.info+"','"
			+product.amount+"','"
			+product.price+"');";
		return db(query);	
	}
};

module.exports = Sale;