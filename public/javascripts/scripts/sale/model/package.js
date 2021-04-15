Sale.package = {};

Sale.package.price = {};

Sale.package.price.find = async (price) => {
	let response = await fetch("/product/package/price/find", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ price })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.price[0];
};