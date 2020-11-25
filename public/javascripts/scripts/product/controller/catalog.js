Product.controller.catalog = {};

Product.controller.catalog.filter = document.getElementById("product-catalog-filter-form");
if(Product.controller.catalog.filter){
	Product.controller.catalog.filter.addEventListener("submit", async (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: "J.A Rio Militar"
		};

		let products = await Product.filter(product);

		const pagination = { pageSize: 21, page: 0};
		$(() => { lib.carousel.execute("product-catalog-filter-box", Product.view.catalog.filter, products, pagination); });

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};