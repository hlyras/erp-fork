Product.conference = {};

Product.conference.create = async (conference) => {
	let response = await fetch("/product/conference/create", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(conference)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Product.conference.findById = async (id) => {
	let response = await fetch(`/product/conference/id/${id}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.conference;
};

Product.conference.filter = async conference => {
	let response = await fetch("/product/conference/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(conference)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.conferences;
};

Product.conference.delete = async (id) => {
	let response = await fetch(`/product/conference/delete/${id}`, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};