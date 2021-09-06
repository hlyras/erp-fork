Product.controller.catalog = {};

Product.controller.catalog.filter = document.getElementById("product-catalog-filter-form");
if(Product.controller.catalog.filter){
	Product.controller.catalog.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: "J.A Rio Militar"
		};

		let products = await API.response(Product.filter, product);

		const pagination = { pageSize: 21, page: 0};
		(function(){ lib.carousel.execute("product-catalog-filter-box", Product.view.catalog.filter, products, pagination); }());
	});
};