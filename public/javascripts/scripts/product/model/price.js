Product.price = {};

Product.price.save = async (price) => {
	let response = await fetch("/product/price/save", {
		method: "POST",
		headers: {'Content-Type':'application/json'},
	    body: JSON.stringify({ price })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.price;
};

Product.price.category = {};

Product.price.category.save = async (category) => {
	let response = await fetch("/product/price/category/save", {
		method: "POST",
		headers: {'Content-Type':'application/json'},
	    body: JSON.stringify({ category })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.category;
};

Product.price.category.findById = async (id) => {
	let response = await fetch("/product/price/category/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.category[0];
};

Product.price.category.filter = async (category) => {
	let response = await fetch("/product/price/category/filter?id="+category.id+"&name="+category.name);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.categories;
};

Product.price.category.delete = async (id) => {
	let response = await fetch("/product/price/category/delete?id="+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};