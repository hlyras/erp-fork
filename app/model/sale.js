const db = require('../../config/connection');
const lib = require("../../config/lib");

const Sale = function(){
	this.id;
	this.sale_date;
	this.estimated_shipment_date;
	this.shipment_date;
	this.customer_id;
	this.customer_name;
	this.customer_cnpj;
	this.payment_method;
	this.status;
	this.value;
};

Sale.save = async sale => {
	let query = "INSERT INTO cms_wt_erp.sale (sale_date, customer_id, customer_name, customer_cnpj, customer_address_id, shipment_method, payment_method, payment_period, status, user_id, user_name, product_value, package_value, shipment_value, discount_value, weight, value) VALUES ('"
		+sale.sale_date+"', '"
		+sale.customer_id+"','"
		+sale.customer_name+"','"
		+sale.customer_cnpj+"','"
		+sale.customer_address_id+"','"
		+sale.shipment_method+"','"
		+sale.payment_method+"','"
		+sale.payment_period+"','"
		+sale.status+"','"
		+sale.user_id+"','"
		+sale.user_name+"','"
		+sale.product_value+"','"
		+sale.package_value+"','"
		+sale.shipment_value+"','"
		+sale.discount_value+"','"
		+sale.weight+"','"
		+sale.value+"');";
	return db(query);
};

Sale.update = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET sale_date='"+sale.sale_date
		+"', customer_id='"+sale.customer_id
		+"', customer_name='"+sale.customer_name
		+"', customer_cnpj='"+sale.customer_cnpj
		+"', customer_address_id='"+sale.customer_address_id
		+"', shipment_method='"+sale.shipment_method
		+"', payment_method='"+sale.payment_method
		+"', payment_period='"+sale.payment_period
		+"', status='"+sale.status
		+"', user_id='"+sale.user_id
		+"', user_name='"+sale.user_name
		+"', product_value='"+sale.product_value
		+"', package_value='"+sale.package_value
		+"', shipment_value='"+sale.shipment_value
		+"', discount_value='"+sale.discount_value
		+"', weight='"+sale.weight
		+"', value='"+sale.value+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.cancel = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET cancelation_confirmation_date='"+sale.cancelation_confirmation_date+"', cancelation_user_id='"+sale.cancelation_user_id+"', cancelation_user_name='"+sale.cancelation_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.filter = (periodStart, periodEnd, params, values, strict_params, strict_values) => {
	let query = lib.filter_by_period_params_strict("cms_wt_erp.sale", "sale_date", periodStart, periodEnd, params, values, strict_params, strict_values, "id", "DESC");
	return db(query);
};

Sale.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.sale WHERE id='"+id+"';";
	return db(query);
};

Sale.confirmPayment = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET payment_confirmation_date='"+sale.payment_confirmation_date+"', payment_user_id='"+sale.payment_user_id+"', payment_user_name='"+sale.payment_user_name+"', status='"+sale.status+"', estimated_shipment_date='"+sale.estimated_shipment_date+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.confirmPackment = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET packment_confirmation_date='"+sale.packment_confirmation_date+"', packment_user_id='"+sale.packment_user_id+"', packment_user_name='"+sale.packment_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.confirmNF = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET nf='"+sale.nf+"', nf_confirmation_date='"+sale.nf_confirmation_date+"', nf_user_id='"+sale.nf_user_id+"', nf_user_name='"+sale.nf_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.confirmShipment = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET shipment_confirmation_date='"+sale.shipment_confirmation_date+"', shipment_user_id='"+sale.shipment_user_id+"', shipment_user_name='"+sale.shipment_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.product = {
	add: async (sale_id, product) => {
		let query = "INSERT INTO cms_wt_erp.sale_product (sale_id, product_id, product_info, amount, weight, price) VALUES ('"
			+sale_id+"', '"
			+product.id+"','"
			+product.product_info+"','"
			+product.amount+"','"
			+product.weight+"','"
			+product.price+"');";
		return db(query);	
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.sale_product WHERE sale_id='"+sale_id+"';";
		return db(query);		
	},
	update: async (sale_product_id, product) => {
		let query = "UPDATE cms_wt_erp.sale_product SET amount='"+product.amount+"' WHERE id='"+sale_product_id+"';";
		return db(query);
	},
	remove: async (sale_product_id) => {
		let query = "DELETE FROM cms_wt_erp.sale_product WHERE id='"+sale_product_id+"';";
		return db(query);
	},
	removeAll: async (sale_id) => {
		let query = "DELETE FROM cms_wt_erp.sale_product WHERE sale_id='"+sale_id+"';";
		return db(query);
	}
};

Sale.package = {
	add: async (sale_id, package) => {
		let query = "INSERT INTO cms_wt_erp.sale_package (sale_id, package_id, info, setup, amount, weight, price) VALUES ('"
			+sale_id+"', '"
			+package.package_id+"','"
			+package.info+"','"
			+package.setup+"','"
			+package.amount+"','"
			+package.weight+"','"
			+package.price+"');";
		return db(query);
	},
	update: async (sale_package_id, package) => {
		let query = "UPDATE cms_wt_erp.sale_package SET amount='"+package.amount
			+"', info='"+package.info
			+"', setup='"+package.setup
			+"' WHERE id='"+sale_package_id+"';";
		return db(query);
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	remove: async (sale_package_id) => {
		let query = "DELETE FROM cms_wt_erp.sale_package WHERE id='"+sale_package_id+"';";
		return db(query);
	},
	removeAll: async (sale_id) => {
		let query = "DELETE FROM cms_wt_erp.sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	product: {
		add: async (sale_id, package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.sale_package_product (sale_id, package_id, product_id, product_info, amount) VALUES ('"
				+sale_id+"', '"
				+package_id+"','"
				+product.product_id+"','"
				+product.product_info+"','"
				+product.amount+"');";
			return db(query);
		},
		list: async (sale_id, package_id) => {
			let query = "SELECT * FROM cms_wt_erp.sale_package_product WHERE sale_id='"+sale_id+"' AND package_id='"+package_id+"';";
			return db(query);
		},
		update: async (package_product_id, product) => {
			let query = "UPDATE cms_wt_erp.sale_package_product SET amount='"+product.amount+"' WHERE id='"+package_product_id+"';";
			return db(query);
		},
		remove: async (package_product_id) => {
			let query = "DELETE FROM cms_wt_erp.sale_package_product WHERE id='"+package_product_id+"';";
			return db(query);
		},
		removeAll: async (sale_id, package_id) => {
			let query = "DELETE FROM cms_wt_erp.sale_package_product WHERE sale_id='"+sale_id+"' AND package_id='"+package_id+"';";
			return db(query);
		},
		clear: async (sale_id) => {
			let query = "DELETE FROM cms_wt_erp.sale_package_product WHERE sale_id='"+sale_id+"';";
			return db(query);
		}
	}
};

Sale.report = {
	product: {
		filter: (props, inners, period, params, values, strict_params, strict_values, orderParams) => {
			let query = lib.query.filterDate(props, "cms_wt_erp.sale sale", inners, "cms_wt_erp.sale.sale_date", period.start, period.end, params, values, strict_params, strict_values, orderParams);
			return db(query);
		}
	},
	package: {
		product: {
			filter: (props, inners, period, params, values, strict_params, strict_values, orderParams) => {
				let query = lib.query.filterDate(props, "cms_wt_erp.sale sale", inners, "sale.sale_date", period.start, period.end, params, values, strict_params, strict_values, orderParams);
				return db(query);
			}
		}
	},
	packment: {
		filter: (props, inners, period, params, values, strict_params, strict_values, orderParams) => {
			let query = lib.query.filterDate(props, "cms_wt_erp.sale sale", inners, "sale.packment_confirmation_date", period.start, period.end, params, values, strict_params, strict_values, orderParams);
			return db(query);
		}
	}
};

module.exports = Sale;