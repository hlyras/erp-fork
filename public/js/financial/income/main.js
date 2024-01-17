const Income = {};

Income.create = async income => {
	let response = await fetch("/financial/income/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(income)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};

Income.filter = async (income) => {
	let response = await fetch("/financial/income/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(income)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.incomes;
};

Income.findById = async (id) => {
	let response = await fetch(`/financial/income/id/${id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.income;
};

Income.delete = async (id) => {
	let response = await fetch(`/financial/income/delete/id/${id}`, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};