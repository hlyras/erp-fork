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

Sale.cancel = async sale_id => {
	let response = await fetch("/sale/cancel/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
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

Sale.confirmPayment = async sale_id => {
	let response = await fetch("/sale/confirm-payment/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};

Sale.packment = {};
//Change confirmPackment to Sale.packment.confirm()

Sale.confirmPackment = async sale_id => {
	let response = await fetch("/sale/confirm-packment/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};


Sale.confirmNF = async (sale) => {
	let response = await fetch("/sale/confirm-nf", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.done;
};

Sale.confirmShipment = async sale_id => {
	let response = await fetch("/sale/confirm-shipment/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};