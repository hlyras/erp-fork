const Customer = {};

Customer.save = async customer => {
	let response = await fetch("/customer/save", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(customer)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response.customer;
};

Customer.filter = async customer => {
	let response = await fetch("/customer/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(customer)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.customers;
};

Customer.findById = async (id) => {
	let response = await fetch("/customer/id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.customer[0];
};

Customer.show = async (id) => {
	let response = await fetch("/customer/show/id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.customer[0];
};

Customer.delete = async (id) => {
	let response = await fetch("/customer/delete?id=" + id, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	alert(response.done);

	return true;
};