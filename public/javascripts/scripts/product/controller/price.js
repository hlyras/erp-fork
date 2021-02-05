Product.price.controller = {};

Product.price.category.controller = {};

Product.price.category.controller.create = document.getElementById("product-price-category-create-form");
if(Product.price.category.controller.create){
	Product.price.category.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value,
		};

		console.log(category);

		document.getElementById("ajax-loader").style.visibility = "visible";
		category = await Product.price.category.save(category);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!category){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";

		// document.getElementById("product-price-category-show-box").style.display = "none";
		// document.getElementById("product-price-category-filter-form").submit.click();
	});
};