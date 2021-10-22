const Product = {}; 

Product.save = async (product) => {
	let response = await fetch("/product/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(product)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.product[0];
};

Product.findById = async (id) => {
	let response = await fetch("/product/id/" + id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.product[0];
};

Product.filter = async product => {
	let response = await fetch("/product/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ product })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.products;
};

Product.delete = async (id) => {
	let response = await fetch("/product/delete?id="+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};