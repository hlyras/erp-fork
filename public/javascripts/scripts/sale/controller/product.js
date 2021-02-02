Sale.product.controller = {};

Sale.product.controller.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let product = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};
		
		let properties = ["code","name","color","size"];

		if(product.name.length > 2){
			let products = await Product.filter(product);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};

Sale.product.kart = new lib.kart("sale-product-kart", "Sale.product.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"size":"Tamanho"}]);

Sale.product.kart.add = document.getElementById("sale-product-kart-form");
if(Sale.product.kart.add){
	Sale.product.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("sale-product-kart-form").elements.namedItem("product").readOnly){ 
			return alert("Produto inválido");
		};

		let product = document.getElementById("sale-product-kart-form").elements.namedItem("product");
		let splitedProduct = product.value.split(" | ");
		let amount = document.getElementById("sale-product-kart-form").elements.namedItem("amount").value;

		if(splitedProduct.length < 3 || !splitedProduct){
			alert("É necessário selecionar um produto.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade do produto.");
			return;
		};

		product = {
			id: product.dataset.id,
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount),
			price: 0
		};

		Sale.product.kart.insert("id", product);
		Sale.product.kart.update("code");
		Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

		document.getElementById("sale-product-kart-form").elements.namedItem('product').value = "";
		document.getElementById("sale-product-kart-form").elements.namedItem('product').dataset.id = "";
		document.getElementById("sale-product-kart-form").elements.namedItem('amount').value = "";
	});
};

if(lib.localStorage.verify("sale-product-kart")){
	let kart = JSON.parse(localStorage.getItem("sale-product-kart"));
	Sale.product.kart.items = kart;
	Sale.product.kart.list("Sale.product.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"size":"Tamanho"}]);
};