Sale.serviceOrder = {};

Sale.serviceOrder.filter = async (serviceOrder) => {
	let response = await fetch("/sale/service-order/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(serviceOrder)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};

Sale.serviceOrder.findById = async (serviceOrderId) => {
	let response = await fetch(`/sale/service-order/id/${serviceOrderId}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};

Sale.serviceOrder.shipment = {};

Sale.serviceOrder.shipment.save = async (serviceOrder) => {
	let response = await fetch("/sale/service-order/shipment/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(serviceOrder)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.serviceOrder;
};

Sale.serviceOrder.shipment.print = async (serviceOrder) => {
	let response = await fetch(`/sale/service-order/shipment/print/${sale_id}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};

Sale.serviceOrder.transport = {};

Sale.serviceOrder.transport.save = async (serviceOrder) => {
	let response = await fetch("/sale/service-order/transport/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(serviceOrder)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.serviceOrder;
};

Sale.serviceOrder.collect = {};

Sale.serviceOrder.collect.confirm = async (serviceOrderId) => {
	let response = await fetch("/sale/service-order/collect/confirm/" + serviceOrderId);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return response;
};

Sale.serviceOrder.collect.cancel = async (serviceOrderId) => {
	let response = await fetch("/sale/service-order/collect/cancel/" + serviceOrderId);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return response;
};

Sale.serviceOrder.recept = {};

Sale.serviceOrder.recept.confirm = async (serviceOrder) => {
	let response = await fetch("/sale/service-order/recept/confirm", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(serviceOrder)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Sale.serviceOrder.recept.cancel = async (serviceOrderId) => {
	let response = await fetch("/sale/service-order/recept/cancel/" + serviceOrderId);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return response;
};