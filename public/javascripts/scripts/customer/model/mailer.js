Customer.mailer = {};

Customer.mailer.filter = async customer => {
	let response = await fetch("/customer/mailer/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(customer)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.customers;
};