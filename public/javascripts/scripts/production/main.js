const Production = {};

Production.create = async (production) => {
	let response = await fetch("/production/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(production)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Production.confirm = async (production) => {
	let response = await fetch("/production/confirm", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(production)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

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

Production.preparation = {};

Production.preparation.confirm = async (production) => {
	let response = await fetch("/production/preparation/confirm", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(production)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Production.product = {};

Production.product.filter = async (product) => {
	let response = await fetch("/production/product/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(product)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.products;
};

Production.shipment = {};

Production.shipment.create = async (shipment) => {
	let response = await fetch("/production/shipment/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(shipment)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Production.shipment.findById = async (id) => {
	let response = await fetch(`/production/shipment/id/${id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.shipment;
};

Production.shipment.filter = async (shipment) => {
	let response = await fetch("/production/shipment/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(shipment)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.shipments;
};

Production.shipment.collect = {};

Production.shipment.collect.confirm = async (shipment_id) => {
	let response = await fetch(`/production/shipment/collect/confirm/${shipment_id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Production.receipt = {};

Production.receipt.filter = async (receipt) => {
	let response = await fetch("/production/receipt/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(receipt)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.receipts;
};

Production.receipt.create = async (receipt) => {
	let response = await fetch("/production/receipt/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(receipt)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Production.receipt.findById = async (receipt_id) => {
	let response = await fetch(`/production/receipt/id/${receipt_id}`);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.receipt;
};

Production.receipt.product = {};

Production.receipt.product.create = async (product) => {
	let response = await fetch("/production/receipt/product/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(product)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Production.receipt.updateByPass = async (receipt) => {
	let response = await fetch("/production/receipt/update/pass", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(receipt)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};