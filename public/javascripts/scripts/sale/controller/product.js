Product.controller = {};

Product.controller.filter = document.getElementById("product-filter-form");
if(Product.controller.filter){
	Product.controller.filter.addEventListener("submit", event => {
		event.preventDefault();

		console.log(event);
	});
};