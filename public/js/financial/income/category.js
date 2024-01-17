const IncomeCategory = {};

IncomeCategory.create = async category => {
	let response = await fetch("/financial/income/category/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(category)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};

IncomeCategory.findById = async (id) => {
	let response = await fetch(`/financial/income/category/id/${id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.category;
};

IncomeCategory.filter = async category => {
	let response = await fetch("/financial/income/category/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(category)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.categories;
};

IncomeCategory.delete = async (id) => {
	let response = await fetch(`/financial/income/category/id/${id}`, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};