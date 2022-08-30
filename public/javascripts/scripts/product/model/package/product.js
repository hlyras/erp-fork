Product.package.product = {};

Product.package.product.update = async (package) => {
	let response = await fetch("/product/package/product/update", {
		method: "POST",
		headers: {'Content-Type':'application/json'},
	    body: JSON.stringify({ package })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.package;
};