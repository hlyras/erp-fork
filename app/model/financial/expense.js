const db = require('../../../config/connection');
const lib = require("../../../config/lib");

const Expense = function(){
	this.id = 0;
	this.outcome_id = "";
	this.approval_date = "";
	this.approval_user_id = 0;
	this.approval_user_name = "";
	this.payment_date = "";
	this.payment_user_id = 0;
	this.payment_user_name = "";
	this.payment_method = "";

	this.billet_bank = "";
	this.billet_receiver = "";
	this.billet_code = "";

	this.pix_receiver = "";
	this.pix_key = "";

	this.transfer_receiver = "";
	this.transfer_register = "";
	this.transfer_bank = "";
	this.transfer_agency = "";
	this.transfer_account = "";
	this.transfer_account_type = "";

	this.status = "Ag. aprovação";

	this.user_id = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.financial_expense (outcome_id, payment_method, billet_bank, billet_receiver, billet_code, pix_receiver, pix_key, transfer_receiver, transfer_register, transfer_bank, transfer_agency, transfer_account, transfer_account_type, status, user_id) VALUES ('"
		+this.outcome_id+"', '"
		+this.payment_method+"', '"
		+this.billet_bank+"', '"
		+this.billet_receiver+"', '"
		+this.billet_code+"', '"
		+this.pix_receiver+"', '"
		+this.pix_key+"', '"
		+this.transfer_receiver+"', '"
		+this.transfer_register+"', '"
		+this.transfer_bank+"', '"
		+this.transfer_agency+"', '"
		+this.transfer_account+"', '"
		+this.transfer_account_type+"', '"
		+this.status+"', '"
        +this.user_id+"')";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.financial_expense SET outcome_id='"+this.outcome_id
		+"', payment_method='"+this.payment_method
		+"', billet_bank='"+this.billet_bank
		+"', billet_receiver='"+this.billet_receiver
		+"', billet_code='"+this.billet_code
		+"', pix_receiver='"+this.pix_receiver
		+"', pix_key='"+this.pix_key
		+"', transfer_receiver='"+this.transfer_receiver
		+"', transfer_register='"+this.transfer_register
		+"', transfer_bank='"+this.transfer_bank
		+"', transfer_agency='"+this.transfer_agency
		+"', transfer_account='"+this.transfer_account
		+"', transfer_account_type='"+this.transfer_account_type
		+"', status='Ag. aprovação', user_id='"+this.user_id
		+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Expense.filter = (props, inners, period, params, values, strict_params, strict_values, order) => {
	let query = lib.query.filterDate(props, "cms_wt_erp.financial_expense expense", inners, "cms_wt_erp.outcome.date", period.start, period.end, params, values, strict_params, strict_values, "cms_wt_erp.outcome.date", order);
	return db(query);
};

Expense.findById = (id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_expense WHERE id = "+id+";";
	return db(query);
};

Expense.findByOutcomeId = (outcome_id) => {
	let query = "SELECT * FROM cms_wt_erp.financial_expense WHERE outcome_id = "+outcome_id+";";
	return db(query);
};

Expense.confirm = async (expense) => {
	let query = "UPDATE cms_wt_erp.financial_expense SET approval_date='"+expense.approval_date
	+"', approval_user_id='"+expense.approval_user_id
	+"', approval_user_name='"+expense.approval_user_name
	+"', status='A pagar' WHERE id='"+expense.id+"';";
	return db(query);
};

Expense.pay = async (expense) => {
	let query = "UPDATE cms_wt_erp.financial_expense SET payment_date='"+expense.payment_date
	+"', payment_user_id='"+expense.payment_user_id
	+"', payment_user_name='"+expense.payment_user_name
	+"', status='Pago' WHERE id='"+expense.id+"';";
	return db(query);
};

Expense.cancel = async (expense) => {
	let query = "UPDATE cms_wt_erp.financial_expense SET cancel_date='"+expense.cancel_date
	+"', cancel_user_id='"+expense.cancel_user_id
	+"', cancel_user_name='"+expense.cancel_user_name
	+"', status='Cancelada' WHERE id='"+expense.id+"';";
	return db(query);
};

module.exports = Expense;