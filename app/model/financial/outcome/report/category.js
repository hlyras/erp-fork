const db = require('../../../config/connection');
const lib = require("jarmlib");

const Category = function() {
	this.id;
	this.name;

	this.save = () => {
		if(!this.user_id) { return { err: "É necessário incluir o id do usuário" } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.financial_outcome_report_category');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id da categoria é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.financial_outcome_report_category', 'id');

		return db(query);
	};
};

module.exports = Category;