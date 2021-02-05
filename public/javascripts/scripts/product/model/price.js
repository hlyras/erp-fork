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