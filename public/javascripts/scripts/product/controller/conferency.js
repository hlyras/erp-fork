Product.controller = {};

Product.controller.filter = document.getElementById("product-filter-form");
if(Product.controller.filter){
	document.getElementById("product-filter-form").addEventListener("submit", async (event) => {
		event.preventDefault();

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value
		};

		let products = await API.response(Product.filter, product);
		if(!products) { return false; }

		console.log(products);

		lib.display("product-filter-box", "");
		lib.display("product-detail-box", "none");

		Product.view.filter(products);
	});
};

Product.controller.detail = async (product_id) => {
	let product = await API.response(Product.findById, product_id);
	if(!product){ return false };

	lib.display("product-detail-box", "");
	lib.display("product-filter-box", "none");

	Product.view.detail(product);
	
	const pagination = { pageSize: 1, page: 0 };
	(function(){ lib.carousel.execute("product-image-box", Product.view.images, product.images, pagination); }());
};