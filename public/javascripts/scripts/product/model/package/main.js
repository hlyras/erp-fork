Product.package = {};

Product.package.create = async package => {
	let response = await fetch("/product/package/create", {
		method: "POST",
	  body: package
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Product.package.filter = async package => {
	let response = await fetch("/product/package/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(package)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.packages;
};

Product.package.findById = async (id) => {
	let response = await fetch(`/product/package/id/${id}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.package;
};

Product.package.delete = async (id) => {
	let response = await fetch(`/product/package/id/${id}`, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};