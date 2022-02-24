const db = require('../../../config/connection');
const lib = require("jarmlib");

lib.Query = function(){
	this._props = false;
	this._inners = false;
	this._period = false;
	this._params = false;
	this._strict_params = false;
	this._order_params = false;

	this.query = "";

	this.select = function(){
		this.query += "SELECT ";
		return this;
	};

	this.props = function(props) {
		if(props.length){
			this._props = true;

			for(let i in props){
				if(i == props.length - 1){
					this.query += props[i]+" ";
				} else {
					this.query += props[i]+", ";
				};
			};
		};
		return this;
	};

	this.table = function(table) {
		if(!this._props){
			this.query += "* FROM "+table+" ";
		} else {
			this.query += "FROM "+table+" ";
		}
		return this;
	};

	this.inners = function(inners) {
		if(inners.length){
			this._inners = true;
			
			for(let i in inners){
				console.log(inners[i].length);
				if(inners[i].length == 3){
					this.query += "INNER JOIN "+inners[i][0]+" ON "+inners[i][1]+"="+inners[i][2]+" ";
				} else if(inners[i].length > 3){
					this.query += "INNER JOIN "+inners[i][0]+" ON ("+inners[i][1]+"="+inners[i][2]+" AND "+inners[i][3]+"="+inners[i][4]+") ";
				}
			};
		}
		return this;
	};

	this.period = function(period) {
		if(period.start && period.end){
			this._period = true;

			this.query += "WHERE "+period.key+">='"+period.start+"' AND "+period.key+"<='"+period.end+"' ";
		};
		return this;
	};

	this.params = function(params) {
		if(params.keys.length){
			this._params = true;

			if(this._period){ this.query += "AND "; } else { this.query += "WHERE "; }

			for(let i in params.keys){
				if(i == params.keys.length - 1){
					this.query += params.keys[i]+" like '%"+params.values[i]+"%' ";
				} else {
					this.query += params.keys[i]+" like '%"+params.values[i]+"%' AND ";
				};
			};
		}
		return this;
	};

	this.strictParams = function(strict_params){
		if(strict_params.keys.length){
			this._strict_params = true;
			
			if(this._period || this._params){ this.query += "AND "; } else { this.query += "WHERE "; }

			for(let i in strict_params.keys){
				if(i == strict_params.keys.length - 1){
					this.query += strict_params.keys[i]+"='"+strict_params.values[i]+"' ";
				} else {
					this.query += strict_params.keys[i]+"='"+strict_params.values[i]+"' AND ";
				};
			};
		};
		return this;
	};

	this.order = function(orderParams){
		if(orderParams.length && orderParams[0].length > 1){
			this._order_params = true;
			
			this.query += "ORDER BY ";
			for(let i in orderParams){
				if(i == orderParams.length - 1){
					this.query += orderParams[i][0]+" "+orderParams[i][1]+" ";
				} else {
					this.query += orderParams[i][0]+" "+orderParams[i][1]+", ";
				};
			};
		}
		return this;
	};

	this.limit = function(limit){
		if(limit.length || limit > 0) {
			this._limit = true;
			this.query += "LIMIT "+limit;
		}
		return this;
	};

	this.build = function(){
		this.query = this.query.trim()+";"; 
		return this;
	};
};

lib.Query.fillParam = function(key, value, arr) {
	if(key && value && arr.keys && arr.values){ arr.keys.push(key); arr.values.push(value); } else { return false; };
};

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
	let query = "INSERT INTO cms_wt_erp.sale (sale_date, customer_id, customer_name, customer_cnpj, customer_address_id, shipment_method, payment_method, payment_period, status, user_id, user_name, product_value, package_value, shipment_value, discount_value, weight, obs, value) VALUES ('"
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
		+sale.obs+"','"
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
		+"', obs='"+sale.obs
		+"', value='"+sale.value+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.cancel = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET cancelation_confirmation_date='"+sale.cancelation_confirmation_date+"', cancelation_user_id='"+sale.cancelation_user_id+"', cancelation_user_name='"+sale.cancelation_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.sale sale").inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	console.log(query);
	return db(query);
};

Sale.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.sale WHERE id='"+id+"';";
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

module.exports = Sale;