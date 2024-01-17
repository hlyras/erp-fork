const IncomeOrigin = {};

IncomeOrigin.create = async origin => {
	let response = await fetch("/financial/income/origin/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(origin)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};

IncomeOrigin.findById = async id => {
	let response = await fetch(`/financial/income/origin/id/${id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.origin;
};

IncomeOrigin.filter = async origin => {
	let response = await fetch(`/financial/income/origin/filter`, {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(origin)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.origins;
};

IncomeOrigin.delete = async id => {
	let response = await fetch(`/financial/income/origin/id/${id}`, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};