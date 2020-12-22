const Sale = {};

Sale.save = async (sale) => {
	let response = await fetch("/sale/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sale;
};

Sale.filter = async (sale) => {
	let response = await fetch("/sale/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};

Sale.findById = async (sale_id) => {
	let response = await fetch("/sale/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.sale[0];
};