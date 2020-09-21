Product.feedstock = {
	add: async (product_feedstock) => {
		let response = await fetch("/product/feedstock/add", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(product_feedstock)
		});
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);

		return product_feedstock;
	},
	findById: async (product_feedstock_id) => {
		let response = await fetch("/product/feedstock/id/" + product_feedstock_id);
		response = await response.json();
		
		if(API.verifyResponse(response)){ return false };
		
		return response.product_feedstock[0];
	},
	list: async (product_id) => {
		let response = await fetch("/product/feedstock/list/product_id/"+product_id);
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		
		return response.feedstocks;
	},
	remove: async (id) => {
		let response = await fetch("/product/feedstock/remove?id="+id, { method: 'DELETE' });
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);
		
		return true;
	},
	category: {
		save: async (category) => {
			let response = await fetch("/product/feedstock/category/save", {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
			    body: JSON.stringify(category)
			});
			response = await response.json();

			if(API.verifyResponse(response)){ return false };
			alert(response.done);

			return category;
		},
		list: async (product_id) => {
			let response = await fetch("/product/feedstock/category/list/product_id/"+product_id);
			response = await response.json();

			if(API.verifyResponse(response)){ return false };
			
			return response.product_feedstock_categories;
		}
	}
};