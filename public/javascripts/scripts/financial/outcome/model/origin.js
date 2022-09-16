Outcome.origin = {};

Outcome.origin.save = async origin => {
	let response = await fetch("/financial/outcome/origin/save", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ origin })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response.origin;
};

Outcome.origin.findById = async (id) => {
	let response = await fetch("/financial/outcome/origin/id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.origin[0];
};

Outcome.origin.findByCategoryId = async (id) => {
	let response = await fetch("/financial/outcome/origin/category_id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.origins;
};

// Outcome.origin.filter = async (origin) => {
// 	let response = await fetch("/financial/outcome/origin/filter?category_id=" + origin.category_id + "&name=" + origin.name);
// 	response = await response.json();

// 	if (API.verifyResponse(response)) { return false };

// 	return response.categories;
// };

Outcome.origin.filter = async origin => {
	let response = await fetch("/financial/outcome/origin/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(origin)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.origins;
};

Outcome.origin.delete = async (id) => {
	let response = await fetch("/financial/outcome/origin/id/" + id, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	alert(response.done);

	return true;
};

Outcome.origin.payment = {};

Outcome.origin.payment.save = async payment => {
	let response = await fetch("/financial/outcome/origin/payment/save", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ payment })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response.payment;
};

Outcome.origin.payment.filter = async (payment) => {
	let response = await fetch("/financial/outcome/origin/payment/filter?origin_id=" + payment.origin_id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.payments;
};

Outcome.origin.payment.findById = async (id) => {
	let response = await fetch("/financial/outcome/origin/payment/id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.payment[0];
};

Outcome.origin.payment.delete = async (id) => {
	let response = await fetch("/financial/outcome/origin/payment/id/" + id, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	alert(response.done);

	return true;
};