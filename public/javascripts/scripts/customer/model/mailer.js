Customer.mailer = {};

Customer.mailer.filter = async (customer) => {
	let response = await fetch("/customer/mailer/filter");
	response = await response.json();
	console.log(response);

	
	if(API.verifyResponse(response)){ return false };
	
	return response.customers;
};

Customer.mailer.send = async (customer_id) => {
	let response = await fetch("/customer/mailer/send/"+customer_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};