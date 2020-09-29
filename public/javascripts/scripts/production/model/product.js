// External API
Product.filter = async (code, name, color) => {
	let response = await fetch("/product/filter?name="+name+"&code="+code+"&color="+color)
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.products;
};