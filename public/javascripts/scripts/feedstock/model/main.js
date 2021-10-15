const Feedstock = {};

Feedstock.save = async (feedstock) => {
	let response = await fetch("/feedstock/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(feedstock)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Feedstock.filter = async feedstock => {
	let response = await fetch("/feedstock/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ feedstock })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.feedstocks;
};

Feedstock.findById = async (id) => {
	let response = await fetch("/feedstock/id/" + id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.feedstock[0];
};