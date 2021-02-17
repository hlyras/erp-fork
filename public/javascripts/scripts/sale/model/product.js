Sale.product = {};

Sale.product.price = {};

Sale.product.price.find = async (price) => {
	let response = await fetch("/product/price/find", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ price })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.price[0];
};