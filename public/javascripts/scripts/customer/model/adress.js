Customer.adress = {};

Customer.adress.add = async (customer_adress) => {
	let response = await fetch("/customer/adress/add", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(customer_adress)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.customer_adress;
};