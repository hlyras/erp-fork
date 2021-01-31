Product.controller.package = {};

Product.controller.package.kart = new lib.kart("sale-package-kart");

Product.controller.package.create = document.getElementById("product-package-create-form");
if(Product.controller.package.create){
	Product.controller.package.create.addEventListener("submit", async event => {
		event.preventDefault();

		let package = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			price: event.target.elements.namedItem("price").value
		};

		package = await Product.package.save(package);

		console.log(package);
	});
};