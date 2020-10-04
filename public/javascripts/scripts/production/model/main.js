const Production = {};

Production.simulate = async (products) => {
	let response = await fetch("/production/simulate", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ products })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.production;
};