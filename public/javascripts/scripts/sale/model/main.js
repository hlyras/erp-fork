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

Sale.payment = {};

Sale.payment.confirm = async sale_id => {
	let response = await fetch("/sale/financial/payment/confirm/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};

Sale.packment = {};

Sale.packment.confirm = async packmentInfo => {
	let response = await fetch("/sale/triage/packment/confirm", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(packmentInfo)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
}

Sale.nf = {};

Sale.nf.save = async (sale) => {
	let response = await fetch("/sale/nf/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.done;
};

Sale.shipment = {};

Sale.shipment.confirm = async sale_id => {
	let response = await fetch("/sale/shipment/confirm/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;
};

Sale.transport = {};
Sale.collect = {};
Sale.recept = {};

Sale.deliver = {};

Sale.deliver.confirm = async sale_id => {
	let response = await fetch(`/sale/deliver/confirm/${sale_id}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return response.done;
};