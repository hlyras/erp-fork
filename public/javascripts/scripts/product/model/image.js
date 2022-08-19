Product.image = {
	add: async (image) => {
		let response = await fetch("/product/image/add", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(image)
		});
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);

		return true;
	},
	remove: async (image_id) => {
		let response = await fetch(`/product/image/remove/${image_id}`, { method: 'DELETE' });
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);
		
		return true;
	}
};