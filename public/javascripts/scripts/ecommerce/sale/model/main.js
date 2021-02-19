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