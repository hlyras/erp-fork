Product.image = {
	add: async (product_id, image_url) => {
		let response = await fetch("/product/image/add", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({ product_id: product_id, image_url: image_url })
		});
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);

		return product_id;
	},
	remove: async (image_id) => {
		let response = await fetch("/product/image/remove?image_id="+image_id, { method: 'DELETE' });
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);
		
		return true;
	}
};