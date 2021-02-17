Product.controller = {};

Product.controller.show = async (product_id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let product = await Product.findById(product_id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!product){ return false };

	document.getElementById("product-feedstock-box").style.display = "none";
	document.getElementById("product-show-box").style.display = "block";

	Product.view.info(product, "product-info-table", "product-info-title");
	
	const pagination = { pageSize: 1, page: 0 };
	$(() => { lib.carousel.execute("product-image-box", Product.view.image.show, product.images, pagination); });
};

Product.controller.filter = document.getElementById("product-filter-form");
if(Product.controller.filter){
	document.getElementById("product-filter-form").addEventListener("submit", async (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: event.target.elements.namedItem("brand").value
		};

		let products = await Product.filter(product);

		const pagination = { pageSize: 10, page: 0};
		if(event.target.elements.namedItem("location").value == "product-manage"){
			(function(){ lib.carousel.execute("product-manage-filter-box", Product.view.manage.filter, products, pagination); }());
		} else if(event.target.elements.namedItem("location").value == "production-product-kart"){
			Product.view.fillSelect(products, document.getElementById("production-product-kart-form").elements.namedItem("product_id"));
		};

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};