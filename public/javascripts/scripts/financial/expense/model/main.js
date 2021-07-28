const Expense = {};

Expense.save = async expense => {
	let response = await fetch("/financial/expense/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ expense })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.expense;
};

Expense.findById = async (id) => {
	let response = await fetch("/financial/expense/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.expenses[0];
};

Expense.filter = async expense => {
	let response = await fetch("/financial/expense/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ expense })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.expenses;
};

Expense.confirm = async expense => {
	let response = await fetch("/financial/expense/confirm", {
		method: "PUT",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ expense })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return true;
};

Expense.pay = async expense => {
	let response = await fetch("/financial/expense/pay", {
		method: "PUT",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ expense })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return true;
};

Expense.cancel = async expense_id => {
	let response = await fetch("/financial/expense/cancel/id/"+expense_id, { method: "PUT" });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return true;
};