Ecommerce.sale.service_order = {};

Ecommerce.sale.service_order.save = async (service_order) => {
	let response = await fetch("/ecommerce/sale/service-order/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ service_order })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.service_order;
};