Product.conference = {};

Product.conference.update = async (product) => {
	let response = await fetch("/product/conference/info/update", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(product)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};