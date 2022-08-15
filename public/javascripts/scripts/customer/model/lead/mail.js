Customer.lead.mail = {};

Customer.lead.mail.send = async (lead) => {
	let response = await fetch("/customer/lead/mail/send", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(lead)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};