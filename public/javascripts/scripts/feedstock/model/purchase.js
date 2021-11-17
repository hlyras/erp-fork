Feedstock.purchase = {};

Feedstock.purchase.save = async (purchase) => {
	let response = await fetch("/feedstock/purchase/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(purchase)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Feedstock.purchase.filter = async purchase => {
	let response = await fetch("/feedstock/purchase/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(purchase)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.purchases;
};

Feedstock.purchase.feedstock = {};

Feedstock.purchase.feedstock.filter = async purchase => {
	let response = await fetch("/feedstock/purchase/feedstock/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(purchase)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.feedstocks;
};