Customer.mail = {};

Customer.mail.send = async (customer) => {
	let response = await fetch("/customer/mail/send", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(customer)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return response;
};