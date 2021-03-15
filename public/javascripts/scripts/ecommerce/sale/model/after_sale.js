Ecommerce.sale.after_sale = {};

Ecommerce.sale.after_sale.save = async sale => {
	let response = await fetch("/ecommerce/sale/after-sale/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.sale;
};

Ecommerce.sale.after_sale.filter = async sale => {
	let response = await fetch("/ecommerce/sale/after-sale/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};

Ecommerce.sale.after_sale.addToFlow = async id => {
	let response = await fetch("/ecommerce/sale/after-sale/flow/add", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ id })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.sale;
};

Ecommerce.sale.after_sale.flow = {};

Ecommerce.sale.after_sale.flow.filter = async sale => {
	let response = await fetch("/ecommerce/sale/after-sale/flow/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};

Ecommerce.sale.after_sale.flow.update = async sale => {
	let response = await fetch("/ecommerce/sale/after-sale/flow/update", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.sale;
};