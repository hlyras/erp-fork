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

		if(product.name.length < 3){ return; };

		document.getElementById("ajax-loader").style.visibility = "visible";
		let products = await Product.filter(product);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!products){ return false; };

		Sale.view.product.filter.input(products, input.value, input.id, "sale-product-kart-dropdown");

		document.getElementById(input.id).focus();
	}
};