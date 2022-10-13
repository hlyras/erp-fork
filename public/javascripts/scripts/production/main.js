const Production = {};

Production.create = async (production) => {
	let response = await fetch("/production/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(production)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response;
};

Production.filter = async (production) => {
	let response = await fetch("/production/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(production)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.productions;
};

Production.findById = async (id) => {
	let response = await fetch(`/production/id/${id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.production;
};