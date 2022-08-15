const Mail = {};

Mail.create = async (mail) => {
	let response = await fetch(`/mail/create`, {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(mail)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Mail.filter = async (mail) => {
	let response = await fetch(`/mail/filter`, {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(mail)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.mails;
};

Mail.findById = async (id) => {
	let response = await fetch(`/mail/${id}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.mail;
};

Mail.delete = async (id) => {
	let response = await fetch(`/mail/delete/${id}`, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};