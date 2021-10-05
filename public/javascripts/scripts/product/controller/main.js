Product.controller = {};

Product.controller.create = document.getElementById("product-create-form");
if(Product.controller.create){
	document.getElementById("product-create-form").addEventListener("submit", async (event) => {
		event.preventDefault();

		let product = {
			id: event.target.elements.namedItem("id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			size: event.target.elements.namedItem("size").value,
			weight: event.target.elements.namedItem("weight").value,
			width: event.target.elements.namedItem("width").value,
			height: event.target.elements.namedItem("height").value,
			depth: event.target.elements.namedItem("depth").value,
			brand: event.target.elements.namedItem("brand").value,
			image: event.target.elements.namedItem("image").value,
			video: event.target.elements.namedItem("video").value,
			status: event.target.elements.namedItem("status").value,
			description: event.target.elements.namedItem("description").value,
			announcement: event.target.elements.namedItem("announcement").value
		};

		product = await API.response(Product.save, product);
		if(!product){ return false };

		Product.controller.filter.submit.click();

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("code").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("color").value = "";
		event.target.elements.namedItem("size").value = "";
		event.target.elements.namedItem("weight").value = "";
		event.target.elements.namedItem("width").value = "";
		event.target.elements.namedItem("height").value = "";
		event.target.elements.namedItem("depth").value = "";
		event.target.elements.namedItem("brand").value = "";
		event.target.elements.namedItem("image").value = "";
		event.target.elements.namedItem("video").value = "";
		event.target.elements.namedItem("status").value = "";
		event.target.elements.namedItem("description").value = "";
		event.target.elements.namedItem("announcement").value = "";
	});
};

Product.controller.filter = document.getElementById("product-filter-form");
if(Product.controller.filter){
	document.getElementById("product-filter-form").addEventListener("submit", async (event) => {
		event.preventDefault();

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: event.target.elements.namedItem("brand").value
		};

		let products = await API.response(Product.filter, product);
		if(!products) { return false; }

		const pagination = { pageSize: 10, page: 0};
		 
		if(event.target.elements.namedItem("location") && event.target.elements.namedItem("location").value == "production-product-kart"){
			Product.view.fillSelect(products, document.getElementById("production-product-kart-form").elements.namedItem("product_id"));
		} else {
			(function(){ lib.carousel.execute("product-filter-box", Product.view.filter, products, pagination); }());
		}
	});
};

Product.controller.edit = async (id) => {
	let product = await API.response(Product.findById, id);
	if(!product){ return false };

	document.getElementById('product-create-form').elements.namedItem("id").value = product.id;
	document.getElementById('product-create-form').elements.namedItem("name").value = product.name;
	document.getElementById('product-create-form').elements.namedItem("code").value = product.code;
	document.getElementById('product-create-form').elements.namedItem("color").value = product.color;
	document.getElementById('product-create-form').elements.namedItem("size").value = product.size;
	document.getElementById('product-create-form').elements.namedItem("weight").value = product.weight;
	document.getElementById('product-create-form').elements.namedItem("width").value = product.width;
	document.getElementById('product-create-form').elements.namedItem("height").value = product.height;
	document.getElementById('product-create-form').elements.namedItem("depth").value = product.depth;
	document.getElementById('product-create-form').elements.namedItem("brand").value = product.brand;
	document.getElementById('product-create-form').elements.namedItem("image").value = product.image;
	document.getElementById('product-create-form').elements.namedItem("video").value = product.video;
	document.getElementById('product-create-form').elements.namedItem("status").value = product.status;
	document.getElementById('product-create-form').elements.namedItem("description").value = product.description;
	document.getElementById('product-create-form').elements.namedItem("announcement").value = product.announcement;
};

Product.controller.show = async (product_id) => {
	let product = await API.response(Product.findById, product_id);
	if(!product){ return false };

	document.getElementById('product-image-box').style.display = "";
	document.getElementById("product-show-box").style.display = "";

	Product.view.show(product);
	
	const pagination = { pageSize: 1, page: 0 };
	(function(){ lib.carousel.execute("product-image-box", Product.view.image.show, product.images, pagination); }());
};

Product.controller.delete = async (product_id) => {
	let r = confirm('Deseja realmente cancelar a despesa?');
	if(r){
		if(!await API.response(Product.delete, product_id)){ return false; };
		Product.controller.filter.submit.click();
	}
};