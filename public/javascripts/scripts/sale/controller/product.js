Sale.product = {};

Product.controller = {};

Product.controller.filter = document.getElementById("product-filter-form");
if(Product.controller.filter){
	Product.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let product = {
			 code: event.target.elements.namedItem("code").value,
			 name: event.target.elements.namedItem("name").value,
			 color: event.target.elements.namedItem("color").value,
			 brand: ""
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		let products = await Product.filter(product);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!products){ return false; };

		Sale.view.product.fillInput(products);
	});
};