Product.controller.package = {};

Product.controller.package.create = document.getElementById("product-package-create-form");
if(Product.controller.package.create){
	Product.controller.package.create.addEventListener("submit", async event => {
		event.preventDefault();

		let package = {
			id: event.target.elements.namedItem("id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			price: event.target.elements.namedItem("price").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		package = await Product.package.save(package);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!package){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("color").value = "";
		event.target.elements.namedItem("price").value = "0.00";

	});
};

Product.package.kart = new lib.kart("sale-package-kart");