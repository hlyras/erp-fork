const db = require('../../config/connection');

const Expense = function(){
	this.id = 0;
	this.date = "";
	this.due_date = "";
	this.cost = "";
	this.payment_date = "";
};

Expense.category = {
	billet: function() {
		this.id = 0;
		this.due_date = "";
		this.receiver = "";
		this.key = "";
	},
	pix: function() {
		this.id = 0;
		this.name = "";
		this.key = "";
	},
	transfer: function() {
		this.id = 0;
		this.bank = "";
		this.agency = "";
		this.account = "";
		this.account_type = "";
		this.receiver = "";

	}
};

module.exports = Expense;