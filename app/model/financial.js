const db = require('../../config/connection');
const lib = require("../../config/lib");

const Financial = function(){
	this.id;
	this.name;
};

Financial.incomeSave = async (income) => {
	let query = "INSERT INTO cms_wt_erp.financial_income (date, category_id, category_name, origin_id, origin_name, value, obs, user_id, user_name) VALUES ('"
	+income.date+"', '"
	+income.category_id+"', '"
	+income.category_name+"', '"
	+income.origin_id+"', '"
	+income.origin_name+"', '"
	+income.value+"', '"
	+income.obs+"', '"
	+income.user_id+"', '"
	+income.user_name+"')";
	return db(query);
};

Financial.incomeFilter = async (periodStart, periodEnd, params, values) => {
	let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "financial_income", "id", "DESC");
	return db(query);
};

Financial.incomeSum = async (periodStart, periodEnd, params, values) => {
	let query = lib.sumByPeriod(periodStart, periodEnd, 'value', params, values, "cms_wt_erp", "financial_income", "id", "DESC");
	return db(query);
};

Financial.incomeCategorySave = async (category) => {
	let query = "INSERT INTO cms_wt_erp.financial_income_category (name) VALUES ('"+category.name+"');";
	return db(query);
};

Financial.incomeFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income WHERE id='"+id+"';";
	return db(query);
};

Financial.incomeCategoryList = async () => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_category ORDER BY name ASC;";
	return db(query);
};

Financial.findIncomeCategoryByName = async (category) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_category WHERE name like '%"+category.name+"%' ORDER BY name ASC;";
	return db(query);
};

Financial.incomeCategoryRemove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income_category WHERE id='"+id+"';";
	return db(query);
};

Financial.incomeOriginSave = async (origin) => {
	let query = "INSERT INTO cms_wt_erp.financial_income_origin (category_id, name) VALUES ('"+origin.category_id+"','"+origin.name+"');";
	return db(query);
};

Financial.incomeOriginFindByCategory = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_origin WHERE category_id='"+id+"' ORDER BY name ASC;";
	return db(query);
};

Financial.incomeOriginFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_income_origin WHERE id='"+id+"' ORDER BY name ASC;";
	return db(query);
};

Financial.incomeOriginRemove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income_origin WHERE id='"+id+"';";
	return db(query);
};

Financial.incomeOriginRemoveByCategory = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_income_origin WHERE category_id='"+id+"';";
	return db(query);
};

// --------------
// outcome functions
// --------------

Financial.outcomeSave = async (outcome) => {
	let query = "INSERT INTO cms_wt_erp.financial_outcome (date, full_date, category_id, category_name, origin_id, origin_name, payment_id, payment_name, value, obs, user_id, user_name) VALUES ('"
	+outcome.date+"', '"
	+outcome.full_date+"', '"
	+outcome.category_id+"', '"
	+outcome.category_name+"', '"
	+outcome.origin_id+"', '"
	+outcome.origin_name+"', '"
	+outcome.payment_id+"', '"
	+outcome.payment_name+"', '"
	+outcome.value+"', '"
	+outcome.obs+"', '"
	+outcome.user_id+"', '"
	+outcome.user_name+"')";
	return db(query);
};

Financial.outcomeFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome WHERE id='"+id+"';";
	return db(query);
};

Financial.outcomeFilter = async (periodStart, periodEnd, params, values) => {
	let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "financial_outcome", "id", "DESC");
	return db(query);
};

Financial.outcomeDelete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome WHERE id='"+id+"';";
	return db(query);
};

Financial.outcomeSum = async (periodStart, periodEnd, params, values) => {
	let query = lib.sumByPeriod(periodStart, periodEnd, 'value', params, values, "cms_wt_erp", "financial_outcome", "id", "DESC");
	return db(query);
};

Financial.outcomeCategorySave = async (category) => {
	let query = "INSERT INTO cms_wt_erp.financial_outcome_category (name) VALUES ('"+category.name+"');";
	return db(query);
};

Financial.outcomeCategoryList = async () => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_category ORDER BY name ASC;";
	return db(query);
};

Financial.findOutcomeCategoryByName = async (category) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_category WHERE name like '%"+category.name+"%' ORDER BY name ASC;";
	return db(query);
};

Financial.outcomeCategoryRemove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_category WHERE id='"+id+"';";
	return db(query);
};

Financial.outcomeOriginSave = async (origin) => {
	let query = "INSERT INTO cms_wt_erp.financial_outcome_origin (category_id, name) VALUES ('"+origin.category_id+"','"+origin.name+"');";
	return db(query);
};

Financial.outcomeOriginFindByCategory = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE category_id='"+id+"' ORDER BY name ASC;";
	return db(query);
};

Financial.outcomeOriginFindById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE id='"+id+"' ORDER BY name ASC;";
	return db(query);
};

Financial.outcomeOriginRemove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_origin WHERE id='"+id+"';";
	return db(query);
};

Financial.outcomeOriginRemoveByCategory = async (id) => {
	let query = "DELETE FROM cms_wt_erp.financial_outcome_origin WHERE category_id='"+id+"';";
	return db(query);
};

module.exports = Financial;