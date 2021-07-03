const db = require('../../config/connection');

const Expense = function(){
	this.id;
	this.date;
	this.due_date;
	this.payment_date;
};

Expense.category = function(){
	
}

module.exports = Expense;