const db = require('../../../config/connection');
const lib = require("../../../config/lib");

const Outcome = function() {
	this.id = 0;
	this.datetime = "";
	this.date = "";
	this.payment_date = "";
	this.category_id = "";
	this.origin_id = "";
	this.income_category_id = 0;
	this.description = "";
	this.cost = "";
	this.status = "";
	this.user_id = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_outcome (datetime, date, category_id, origin_id, income_category_id, description, cost, status, user_id) VALUES ('"
		+this.datetime+"', '"
		+this.date+"', '"
		+this.category_id+"', '"
		+this.origin_id+"', '"
		+this.income_category_id+"', '"
		+this.description+"', '"
		+this.cost+"', '"
		+this.status+"', '"
        +this.user_id+"')";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_outcome SET datetime='"+this.datetime
		+"', date='"+this.date
		+"', category_id='"+this.category_id
		+"', origin_id='"+this.origin_id
		+"', income_category_id='"+this.income_category_id
		+"', cost='"+this.cost
		+"', description='"+this.description
		+"', user_id='"+this.user_id
		+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Outcome.update = {
	income_category_id: (outcome) => {
		let query = "UPDATE cms_wt_erp.financial_outcome SET income_category_id='"+outcome.income_category_id+"' WHERE id='"+outcome.id+"';";
		return db(query);
	},
	date: (outcome) => {
		let query = "UPDATE cms_wt_erp.financial_outcome SET date='"+outcome.date+"' WHERE id='"+outcome.id+"';";
		return db(query);
	},
	datetime: (outcome) => {
		let query = "UPDATE cms_wt_erp.financial_outcome SET datetime='"+outcome.datetime+"' WHERE id='"+outcome.id+"';";
		return db(query);
	},
	status: (outcome) => {
		let query = "UPDATE cms_wt_erp.financial_outcome SET status='"+outcome.status+"' WHERE id='"+outcome.id+"';";
		return db(query);
	}
}

Outcome.findById = (outcome_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome WHERE id = "+outcome_id+";";
	return db(query);
};

Outcome.filter = (props, inners, period, params, values, strict_params, strict_values, orderParams) => {
	let query = lib.query.filterDate(props, "cms_wt_erp.financial_outcome outcome", inners, "date", period.start, period.end, params, values, strict_params, strict_values, orderParams);
	return db(query);
};

Outcome.list = () => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome ORDER BY date DESC;";
	return db(query);
};

Outcome.delete = async (outcome_id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome WHERE id='"+outcome_id+"';";
	return db(query);
};

// Outcome CATEGORY MODEL
Outcome.category = function() {
	this.id = 0;
	this.name = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_outcome_category (name) VALUES ('"+this.name+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_outcome_category SET name='"+this.name+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Outcome.category.findById = (category_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_category WHERE id = "+category_id+" ORDER BY name ASC;";
	return db(query);
};

Outcome.category.list = () => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_category ORDER BY name ASC;";
	return db(query);
};

Outcome.category.filter = (props, params, values, strict_params, strict_values, orderParams) => {
	let query = lib.query.filter(props, "cms_wt_erp.financial_outcome_category", params, values, strict_params, strict_values, orderParams);
	return db(query);
};

Outcome.category.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_category WHERE id='"+id+"';";
	return db(query);
};

// Outcome ORIGIN MODEL
Outcome.origin = function() {
	this.id = 0;
	this.category_id = "";
	this.name = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_outcome_origin (category_id, name) VALUES ('"+this.category_id+"','"+this.name+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_outcome_origin SET category_id='"+this.category_id+"', name='"+this.name+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Outcome.origin.findById = (origin_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE id = "+origin_id+" ORDER BY name ASC;";
	return db(query);
};

Outcome.origin.findByCategoryId = (category_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE category_id = "+category_id+" ORDER BY name ASC;";
	return db(query);
};

Outcome.origin.list = () => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_origin ORDER BY name ASC;";
	return db(query);
};

Outcome.origin.filter = (props, params, values, strict_params, strict_values, orderParams) => {
	let query = lib.query.filter(props, "cms_wt_erp.financial_outcome_origin", params, values, strict_params, strict_values, orderParams);
	return db(query);
};

Outcome.origin.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_origin WHERE id='"+id+"';";
	return db(query);
};

Outcome.origin.deleteByCategoryId = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_origin WHERE category_id='"+id+"';";
	return db(query);
};

Outcome.origin.payment = function() {
	this.id = 0;
	this.origin_id = "";
	this.method = "";
	this.pix_receiver = "";
	this.pix_key = "";
	this.transfer_receiver = "";
	this.transfer_register = "";
	this.transfer_bank = "";
	this.transfer_agency = "";
	this.transfer_account = "";
	this.transfer_account_type = "";
	this.user_id = 0;

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_outcome_origin_payment (origin_id, method, pix_receiver, pix_key, transfer_receiver, transfer_register, transfer_bank, transfer_agency, transfer_account, transfer_account_type, user_id) VALUES ('"
			+this.origin_id+"','"
			+this.method+"','"
			+this.pix_receiver+"','"
			+this.pix_key+"','"
			+this.transfer_receiver+"','"
			+this.transfer_register+"','"
			+this.transfer_bank+"','"
			+this.transfer_agency+"','"
			+this.transfer_account+"','"
			+this.transfer_account_type+"','"
			+this.user_id+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_outcome_origin_payment SET origin_id='"+this.origin_id
			+"', method='"+this.method
			+"', pix_receiver='"+this.pix_receiver
			+"', pix_key='"+this.pix_key
			+"', transfer_receiver='"+this.transfer_receiver
			+"', transfer_register='"+this.transfer_register
			+"', transfer_bank='"+this.transfer_bank
			+"', transfer_agency='"+this.transfer_agency
			+"', transfer_account='"+this.transfer_account
			+"', transfer_account_type='"+this.transfer_account_type
			+"', user_id='"+this.user_id
			+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Outcome.origin.payment.filter = (props, params, values, strict_params, strict_values, orderParams) => {
	let query = lib.query.filter(props, "cms_wt_erp.financial_outcome_origin_payment", params, values, strict_params, strict_values, orderParams);
	return db(query);
};

Outcome.origin.payment.findById = (payment_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_origin_payment WHERE id = "+payment_id+";";
	return db(query);
};

Outcome.origin.payment.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_origin_payment WHERE id='"+id+"';";
	return db(query);
};

module.exports = Outcome;