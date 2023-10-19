Customer.lead = {};

Customer.lead.update = async (lead) => {
	let response = await fetch("/customer/lead/update", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(lead)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Customer.lead.filter = async (lead) => {
	let response = await fetch("/customer/lead/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ lead })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.leads;
};