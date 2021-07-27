const db = require('../../config/connection');
const lib = require("../../config/lib");

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

Feedstock.filter = async (name, params, values) => {
	let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "feedstock", "code", "ASC");
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

Feedstock.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock WHERE id='"+id+"';";
	return db(query);
};

Feedstock.storage = {
	//Criar funções de inserção
	deleteByFeedstockId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.feedstock_storage WHERE feedstock_id='"+id+"';";
		return db(query);
	}
};

Feedstock.supplier = {
	save: async (supplier) => {
		let query = "INSERT INTO cms_wt_erp.feedstock_supplier (name, phone) VALUES ('"
			+supplier.name+"','"
			+supplier.phone+"');";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.feedstock_supplier WHERE id='"+id+"';";
		return db(query);
	},
	findByName: async (name) => {
		let query = "SELECT * FROM cms_wt_erp.feedstock_supplier WHERE name like '%"+name+"%' ORDER BY id ASC;";
		return db(query);
	},
	list: async () => {
		let query = "SELECT * FROM cms_wt_erp.feedstock_supplier ORDER BY id ASC;";
		return db(query);
	},
	feedstock: {
		add: async (supplier_feedstock) => {
			let query = "INSERT INTO cms_wt_erp.feedstock_supplier_storage (supplier_id, feedstock_id, value) VALUES ('"
				+supplier_feedstock.supplier_id+"', '"
				+supplier_feedstock.feedstock_id+"', '"
				+supplier_feedstock.value+"');";
			return db(query);
		},
		update: async (insertion) => {
			let query = "UPDATE cms_wt_erp.feedstock_supplier_storage SET value='"+insertion.value+"' WHERE id='"+insertion.id+"';";
			return db(query);
		},
		remove: async (id) => {
			let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE id='"+id+"';";
			return db(query);
		},
		storage: {
			list: async (id) => {
				let query = "SELECT * FROM cms_wt_erp.feedstock_supplier_storage WHERE supplier_id='"+id+"';";
				return db(query);
			},
			deleteByFeedstockId: async (id) => {
				let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE feedstock_id='"+id+"';";
				return db(query);
			}
		}
	}
};

Feedstock.request = {
	save: async (request) => {
		let query = "INSERT INTO cms_wt_erp.feedstock_request (date, full_date, storage_id, user, obs) VALUES ('"
			+request.date+"', '"
			+request.full_date+"', '"
			+request.storage_id+"', '"
			+request.user+"', '"
			+request.obs+"');";
		return db(query);
	},
	feedstock: {
		add: async (option) => {
			let query = "INSERT INTO cms_wt_erp.feedstock_request_feedstock (request_id, feedstock_id, feedstock_info, feedstock_uom, amount) VALUES ('"
				+option.request_id+"', '"
				+option.feedstock_id+"', '"
				+option.feedstock_info+"', '"
				+option.feedstock_uom+"', '"
				+option.amount+"');";
			return db(query);
		},
		filter: async (periodStart, periodEnd, params, values) => {
			let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "feedstock_request", "id", "DESC");
			return db(query);
		},
		findById: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.feedstock_request WHERE id='"+id+"';";
			return db(query);
		},
		confirm: async (option) => {
			let query = "UPDATE cms_wt_erp.feedstock_request SET status='Pedido confirmado', confirmation_user='"+option.user+"' WHERE id='"+option.request_id+"';";
			return db(query);
		},
		feedstock: {
			list: async (id) => {
				let query = "SELECT * FROM cms_wt_erp.feedstock_request_feedstock WHERE request_id='"+id+"';";
				return db(query);
			}
		}
	}
};

Feedstock.regress = {
	save: async (regress) => {
		let query = "INSERT INTO cms_wt_erp.feedstock_regress (date, full_date, storage_id, user, obs) VALUES ('"
			+regress.date+"', '"
			+regress.full_date+"', '"
			+regress.storage_id+"', '"
			+regress.user+"', '"
			+regress.obs+"');";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.feedstock_regress WHERE id='"+id+"';";
		return db(query);
	},
	filter: async (periodStart, periodEnd, params, values) => {
		let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "feedstock_regress", "id", "DESC");
		return db(query);
	},
	confirm: async (option) => {
		let query = "UPDATE cms_wt_erp.feedstock_regress SET status='Pedido confirmado', confirmation_user='"+option.user+"' WHERE id='"+option.regress_id+"';";
		return db(query);
	},
	feedstock: {
		add: async (option) => {
			let query = "INSERT INTO cms_wt_erp.feedstock_regress_feedstock (regress_id, feedstock_id, feedstock_info, feedstock_uom, amount) VALUES ('"
				+option.regress_id+"', '"
				+option.feedstock_id+"', '"
				+option.feedstock_info+"', '"
				+option.feedstock_uom+"', '"
				+option.amount+"');";
			return db(query);
		},
		list: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.feedstock_regress_feedstock WHERE regress_id='"+id+"';";
			return db(query);
		}
	}
};

Feedstock.purchase = {
	save: async (purchase) => {
		let query = "INSERT INTO cms_wt_erp.feedstock_purchase (date, full_date, supplier_id, supplier_name, value, storage_id, user) VALUES ('"
			+purchase.date+"', '"
			+purchase.full_date+"', '"
			+purchase.supplier_id+"', '"
			+purchase.supplier_name+"', '"
			+purchase.value+"', '"
			+purchase.storage_id+"', '"
			+purchase.user+"');";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.feedstock_purchase WHERE id='"+id+"';";
		return db(query);
	},
	filter:  async (periodStart, periodEnd, params, values) => {
		let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "feedstock_purchase", "id", "DESC");
		return db(query);
	},
	confirm: async (option) => {
		let query = "UPDATE cms_wt_erp.feedstock_purchase SET status='Pedido confirmado', confirmation_user='"+option.user+"' WHERE id='"+option.purchase_id+"';";
		return db(query);
	},
	feedstock: {
		save: async (option) => {
			let query = "INSERT INTO cms_wt_erp.feedstock_purchase_feedstock (purchase_id, feedstock_id, feedstock_info, amount, feedstock_uom, feedstock_value) VALUES ('"
				+option.purchase_id+"', '"
				+option.feedstock_id+"', '"
				+option.feedstock_info+"', '"
				+option.amount+"', '"
				+option.feedstock_uom+"', '"
				+option.feedstock_value+"');";
			return db(query);
		},
		list: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.feedstock_purchase_feedstock WHERE purchase_id='"+id+"';";
			return db(query);
		}
	}
};

Feedstock.storage = {
	save: async (name) => {
		let query = "INSERT INTO cms_wt_erp.feedstock_storage_instance (name) VALUES ('"+name+"');";
		return db(query);
	},
	list: async () => {
		let query = "SELECT * FROM cms_wt_erp.feedstock_storage_instance ORDER BY id ASC;";
		return db(query);
	},
	feedstock: {
		add: async (feedstock) => {
			let query = "INSERT INTO cms_wt_erp.feedstock_storage (storage_id, feedstock_id, amount) VALUES ('"
				+feedstock.storage_id+"','"
				+feedstock.feedstock_id+"','"
				+feedstock.amount+"');";
			return db(query);
		},
		filter: async (params, values) => {
			let query = lib.filterQuery(params, values, "cms_wt_erp", "feedstock_storage", "feedstock_id", "ASC");
			return db(query);
		},
		findById: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.feedstock_storage WHERE id = "+id+";";
			return db(query);
		},
		amount: {
			set: async (feedstock) => {
				let query = "UPDATE cms_wt_erp.feedstock_storage SET amount='"+feedstock.amount+"' WHERE id='"+feedstock.id+"';";
				return db(query);
			},
			increase: async (option) => {
				let query = "UPDATE cms_wt_erp.feedstock_storage SET amount=amount + '"+option.amount+"' WHERE storage_id='"+option.storage_id+"' AND feedstock_id='"+option.feedstock_id+"';";
				return db(query);
			},
			decrease: async (option) => {
				let query = "UPDATE cms_wt_erp.feedstock_storage SET amount=amount - '"+option.amount+"' WHERE storage_id='"+option.storage_id+"' AND feedstock_id='"+option.feedstock_id+"';";
				return db(query);
			}
		}
	}
};

module.exports = Feedstock;