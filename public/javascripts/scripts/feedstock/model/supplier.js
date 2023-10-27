Feedstock.supplier = {};

Feedstock.supplier.save = async (supplier) => {
	let response = await fetch("/feedstock/supplier/save", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(supplier)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response;
};

Feedstock.supplier.filter = async supplier => {
	let response = await fetch("/feedstock/supplier/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ supplier })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.suppliers;
};

Feedstock.supplier.findById = async (id) => {
	let response = await fetch("/feedstock/supplier/id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.supplier[0];
};

Feedstock.supplier.delete = async (id) => {
	let response = await fetch("/feedstock/supplier/delete/id/" + id, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	alert(response.done);

	return true;
};

Feedstock.supplier.storage = {};

Feedstock.supplier.storage.open = async (id) => {
	let response = await fetch("/feedstock/supplier/storage/id/" + id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.supplier[0];
};

Feedstock.supplier.storage.add = async (insert) => {
	let response = await fetch("/feedstock/supplier/storage/add", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(insert)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response;
};

Feedstock.supplier.storage.filter = async feedstock => {
	let response = await fetch("/feedstock/supplier/storage/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.feedstocks;
};

Feedstock.supplier.storage.add = async (feedstock) => {
	let response = await fetch("/feedstock/supplier/storage/add", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response;
};

Feedstock.supplier.storage.update = async (feedstock) => {
	let response = await fetch("/feedstock/supplier/storage/update", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Feedstock.supplier.storage.remove = async (id) => {
	let response = await fetch("/feedstock/supplier/storage/remove/id/" + id, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return true;
};