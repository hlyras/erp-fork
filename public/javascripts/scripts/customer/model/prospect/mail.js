Customer.prospect.mail = {};

Customer.prospect.mail.send = async (prospect) => {
	let response = await fetch("/customer/prospect/mail/send", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(prospect)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done)

	return response;
};