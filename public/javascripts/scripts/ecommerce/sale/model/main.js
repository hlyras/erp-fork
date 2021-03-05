const Ecommerce = {};

Ecommerce.sale = {};

Ecommerce.sale.save = async (sale) => {
	let response = await fetch("/ecommerce/sale/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.sale;
};

Ecommerce.sale.filter = async (sale) => {
	let response = await fetch("/ecommerce/sale/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};

Ecommerce.sale.findById = async (sale_id) => {
	let response = await fetch("/ecommerce/sale/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.sale[0];
};

Ecommerce.sale.update = async (sale) => {
	let response = await fetch("/ecommerce/sale/update", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.sale;
};

Ecommerce.sale.changeStatus = async (sale) => {
	let response = await fetch("/ecommerce/sale/changeStatus", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.sale;
};