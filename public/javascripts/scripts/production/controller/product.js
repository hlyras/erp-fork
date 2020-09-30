// External Product API
const Product = {};

Product.filter = document.getElementById("product-filter-production-kart");
if(Product.filter){
	Product.filter.addEventListener("submit", async (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value
		};

		let products = await Product.filter(product);

		const pagination = { pageSize: 10, page: 0};
		if(event.target.elements.namedItem("location").value == "production-kart"){
			Product.view.fillSelect(products, document.getElementById("production-product-kart-form").elements.namedItem("product_id"));
		};

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};

// Production environment
Production.product = { controller: {} };