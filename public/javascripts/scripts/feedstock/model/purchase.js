Feedstock.purchase = {};

Feedstock.purchase.save = async (purchase) => {
	let response = await fetch("/feedstock/purchase/save", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchase)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };
	alert(response.done);

	return response;
};

Feedstock.purchase.filter = async purchase => {
	let response = await fetch("/feedstock/purchase/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchase)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.purchases;
};

Feedstock.purchase.update = async (purchase) => {
	let response = await fetch("/feedstock/purchase/update", {
		method: "PUT",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchase)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Feedstock.purchase.delete = async (purchase_id) => {
	let response = await fetch("/feedstock/purchase/delete/" + purchase_id, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	alert(response.done);

	return true;
};

Feedstock.purchase.feedstock = {};

Feedstock.purchase.feedstock.update = async (feedstock) => {
	let response = await fetch("/feedstock/purchase/feedstock/update", {
		method: "PUT",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Feedstock.purchase.feedstock.filter = async purchase => {
	let response = await fetch("/feedstock/purchase/feedstock/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchase)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.feedstocks;
};

Feedstock.purchase.order = {};

Feedstock.purchase.order.create = async (order_feedstock) => {
	let response = await fetch("/feedstock/purchase/order/create", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(order_feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Feedstock.purchase.order.update = async (order_feedstock) => {
	let response = await fetch("/feedstock/purchase/order/update", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(order_feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Feedstock.purchase.order.confirm = async (supplier_id) => {
	let response = await fetch("/feedstock/purchase/order/confirm", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ supplier_id })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Feedstock.purchase.order.filter = async order_feedstock => {
	let response = await fetch("/feedstock/purchase/order/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(order_feedstock)
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.orders;
};

Feedstock.purchase.order.delete = async (id) => {
	let response = await fetch(`/feedstock/purchase/order/delete/${id}`, { method: 'DELETE' });
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.done;
};