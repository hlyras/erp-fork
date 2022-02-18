Customer.mailer = {};

Customer.mailer.send = async (id) => {
	let response = await fetch("/customer/mailer/send");
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};