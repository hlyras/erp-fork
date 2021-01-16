Product.package = {};

Product.package.save = async (product_package) => {
	let response = await fetch("/product/package/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ product_package })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.product_package;
};