const db = require('../../../config/connection');
const lib = require("jarmlib");

const Income = function () {
	this.id = 0;
	this.datetime = "";
	this.date = "";
	this.category_id = "";
	this.origin_id = "";
	this.cash = "";
	this.description = "";
	this.user_id = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_income (datetime, date, category_id, origin_id, cash, description, user_id) VALUES ('"
			+ this.datetime + "', '"
			+ this.date + "', '"
			+ this.category_id + "', '"
			+ this.origin_id + "', '"
			+ this.cash + "', '"
			+ this.description + "', '"
			+ this.user_id + "')";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_income SET datetime='" + this.datetime
			+ "', date='" + this.date
			+ "', category_id='" + this.category_id
			+ "', origin_id='" + this.origin_id
			+ "', cash='" + this.cash
			+ "', description='" + this.description
			+ "', user_id='" + this.user_id
			+ "' WHERE id='" + this.id + "';";
		return db(query);
	};
};

Income.update = {
	date: (income) => {
		let query = "UPDATE cms_wt_erp.financial_income SET date='" + income.date + "' WHERE id='" + income.id + "';";
		return db(query);
	},
	datetime: (income) => {
		let query = "UPDATE cms_wt_erp.financial_income SET datetime='" + income.datetime + "' WHERE id='" + income.id + "';";
		return db(query);
	}
}

Income.findById = (income_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income WHERE id = " + income_id + ";";
	return db(query);
};

Income.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.financial_income income")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	return db(query);
};

Income.list = () => {
	let query = "SELECT * FROM cms_wt_erp.financial_income;";
	return db(query);
};

Income.delete = async (income_id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income WHERE id='" + income_id + "';";
	return db(query);
};

// INCOME CATEGORY MODEL
Income.category = function () {
	this.id = 0;
	this.name = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_income_category (name) VALUES ('" + this.name + "');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_income_category SET name='" + this.name + "' WHERE id='" + this.id + "';";
		return db(query);
	};
};

Income.category.findById = (category_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_category WHERE id = " + category_id + " ORDER BY name ASC;";
	return db(query);
};

Income.category.list = () => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_category ORDER BY name ASC;";
	return db(query);
};

Income.category.filter = (props, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.financial_income_category income_category")
		.params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Income.category.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income_category WHERE id='" + id + "';";
	return db(query);
};

// INCOME ORIGIN MODEL
Income.origin = function () {
	this.id = 0;
	this.category_id = "";
	this.name = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_income_origin (category_id, name) VALUES ('" + this.category_id + "','" + this.name + "');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_income_origin SET category_id='" + this.category_id + "', name='" + this.name + "' WHERE id='" + this.id + "';";
		return db(query);
	};
};

Income.origin.findById = (origin_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_origin WHERE id = " + origin_id + " ORDER BY name ASC;";
	return db(query);
};

Income.origin.findByCategoryId = (category_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_origin WHERE category_id = " + category_id + " ORDER BY name ASC;";
	return db(query);
};

Income.origin.list = () => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_origin ORDER BY name ASC;";
	return db(query);
};

Income.origin.filter = (props, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.financial_income_origin income_origin")
		.params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Income.origin.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income_origin WHERE id='" + id + "';";
	return db(query);
};

Income.origin.deleteByCategoryId = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income_origin WHERE category_id='" + id + "';";
	return db(query);
};

module.exports = Income;