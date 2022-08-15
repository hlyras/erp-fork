Customer.prospect = {};

Customer.prospect.save = async prospect => {
	let response = await fetch("/customer/prospect/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(prospect)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Customer.prospect.filter = async prospect => {
	let response = await fetch("/customer/prospect/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(prospect)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.prospects;
};

// Prospect.confirmContact1 = async prospect => {
// 	let response = await fetch("/customer/prospect/confirm-contact-1", {
// 		method: "POST",
// 		headers: {'Content-Type': 'application/json'},
// 	    body: JSON.stringify(prospect)
// 	});
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };
// 	alert(response.done);

// 	return response;
// };

// Prospect.confirmContact2 = async prospect => {
// 	let response = await fetch("/customer/prospect/confirm-contact-2", {
// 		method: "POST",
// 		headers: {'Content-Type': 'application/json'},
// 	    body: JSON.stringify(prospect)
// 	});
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };
// 	alert(response.done);

// 	return response;
// };

// Prospect.confirmContact3 = async prospect => {
// 	let response = await fetch("/customer/prospect/confirm-contact-3", {
// 		method: "POST",
// 		headers: {'Content-Type': 'application/json'},
// 	    body: JSON.stringify(prospect)
// 	});
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };
// 	alert(response.done);

// 	return response;
// };

// Prospect.mailer = {};

// Prospect.mailer.filter = async prospect => {
// 	let response = await fetch("/customer/prospect/mailer/filter", {
// 		method: "POST",
// 		headers: {'Content-Type': 'application/json'},
// 	    body: JSON.stringify(prospect)
// 	});
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };

// 	return response.prospects;
// };

// Prospect.mailer.presentation = async (id) => {
// 	let response = await fetch("/customer/prospect/mail/presentation/"+id);
// 	response = await response.json();
	
// 	if(API.verifyResponse(response)){ return false };
// 	alert(response.done);

// 	return response;
// };

// Prospect.mailer.transmission = async (id) => {
// 	let response = await fetch("/customer/prospect/mail/transmission/"+id);
// 	response = await response.json();
	
// 	if(API.verifyResponse(response)){ return false };
// 	alert(response.done);

// 	return response;
// };

// Prospect.meeting = {};

// Prospect.meeting.filter = async prospect => {
// 	let response = await fetch("/customer/prospect/meeting/filter", {
// 		method: "POST",
// 		headers: {'Content-Type': 'application/json'},
// 	    body: JSON.stringify(prospect)
// 	});
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };

// 	return response.prospects;
// };