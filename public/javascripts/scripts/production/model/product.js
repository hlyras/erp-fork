// External API
const Product = {};

Product.filter = async (product) => {
	let response = await fetch("/product/filter?name="+product.name+"&code="+product.code+"&color="+product.color);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.products;
};