Product.controller.package = {};

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

		console.log(package);

		package = await Product.package.save(package);

		console.log(package);
	});
};

Product.package.kart = new lib.kart("sale-package-kart");
// Sale.package.kart.add("id", package);

// Sale.controller.kart.product.add = document.getElementById("sale-kart-product-form");
// if(Sale.controller.kart.product.add){
// 	Sale.controller.kart.product.add.addEventListener("submit", async (event) => {
// 		event.preventDefault();

// 		if(!document.getElementById("sale-kart-product-form").elements.namedItem("product").readOnly){ 
// 			return alert("Produto inválido");
// 		};

// 		let product = document.getElementById("sale-kart-product-form").elements.namedItem("product");
// 		let splitedProduct = product.value.split(" | ");
// 		let amount = document.getElementById("sale-kart-product-form").elements.namedItem("amount").value;

// 		if(splitedProduct.length < 3 || !splitedProduct){
// 			alert("É necessário selecionar um produto.");
// 			return;
// 		};

// 		if(amount < 0.01 || !amount){
// 			alert("É necessário preencher a quantidade do produto.");
// 			return;
// 		};

// 		product = {
// 			id: product.dataset.id,
// 			code: splitedProduct[0],
// 			name: splitedProduct[1],
// 			color: splitedProduct[2],
// 			size: splitedProduct[3],
// 			amount: parseInt(amount),
// 			price: 0
// 		};

// 		for(i in Sale.kart){
// 			if(Sale.kart[i].id == product.id){
// 				return alert("Você já incluiu este produto na lista de produção.");
// 			};
// 		};

// 		Sale.kart.push(product);

// 		Sale.controller.kart.update(Sale.kart);

// 		let stringified_kart = JSON.stringify(Sale.kart);
// 		lib.localStorage.update("sale-kart", stringified_kart);
		
// 		Sale.product.view.kart.list(Sale.kart);

// 		document.getElementById("sale-kart-product-form").elements.namedItem('product').value = "";
// 		document.getElementById("sale-kart-product-form").elements.namedItem('product').dataset.id = "";
// 		document.getElementById("sale-kart-product-form").elements.namedItem('amount').value = "";
// 	});
// };