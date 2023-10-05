Customer.prospect = {};

Customer.prospect.save = async prospect => {
	let response = await fetch("/customer/prospect/save", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(prospect)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response;
};

Customer.prospect.update = async prospect => {
	let response = await fetch("/customer/prospect", {
		method: "PATCH",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(prospect)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Customer.prospect.findById = async prospect_id => {
	let response = await fetch(`/customer/prospect/id/${prospect_id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.prospect;
};

Customer.prospect.filter = async prospect => {
	let response = await fetch("/customer/prospect/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(prospect)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.prospects;
};

Customer.prospect.log = {};

Customer.prospect.log.create = async (log) => {
	let response = await fetch("/customer/prospect/log/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(log)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};