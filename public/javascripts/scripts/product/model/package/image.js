Product.package.image = {};

Product.package.image.delete = async (id) => {
	let response = await fetch(`/product/package/image/${id}`, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};