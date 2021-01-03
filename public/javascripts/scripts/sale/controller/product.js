Sale.product = {};

Product.controller = {};

// function upinput(input){
// 	console.log(input.value);
// };

Product.controller.filter = {
	input: async (input) => {
		event.preventDefault()

		let product = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};

		if(product.name.length > 2){
			let products = await Product.filter(product);
			if(!products){ return false; };

			Sale.view.product.filter.input(products, input.value, input.name, "sale-product-kart-dropdown");
		} else {
			Sale.view.product.filter.input([], input.value, input.name, "sale-product-kart-dropdown");
		};
	},
	inputFill: (input) => {
		document.getElementById("sale-kart-product-form").elements.namedItem("product").dataset.id = input.dataset.id;
		document.getElementById("sale-kart-product-form").elements.namedItem("product").value = input.value;
		document.getElementById("sale-kart-product-form").elements.namedItem("product").readOnly = true;

		document.getElementById("sale-product-kart-dropdown").innerHTML = "";
	}
};