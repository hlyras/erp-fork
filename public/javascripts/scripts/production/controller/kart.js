Production.product.controller = { kart: {} };
Production.product.kart = [];

Production.product.controller.kart.add = document.getElementById("production-product-kart-form");
if(Production.product.controller.kart.add){
	Production.product.controller.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		var product_id = document.getElementById("production-product-kart-form").elements.namedItem('product_id');
		var amount = document.getElementById("production-product-kart-form").elements.namedItem('product_amount').value;

		if(product_id.value < 1 || !product_id.value){
			alert("É necessário selecionar um produto.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de produtos que serão produzidos.");
			return;
		};

		var row = product_id.options[product_id.selectedIndex].text;
		splitedProduct = row.split(" | ");

		product = {
			id: product_id.value,
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount),
			feedstocks: []
		};

		for(i in Production.product.kart){
			if(Production.product.kart[i].id == product.id){
				return alert("Você já incluiu este produto na lista de produção.");
			};
		};

		Production.product.kart.push(product);

		Production.product.kart.sort((a, b) => {
		  return a.code - b.code;
		});

		Production.product.controller.kart.localStorage.update(Production.product.kart, "productionProductKart");
		Production.product.view.kart.list(Production.product.kart);

		document.getElementById("production-simulation-box").style.display = "none";
		document.getElementById("production-product-kart-form").elements.namedItem('product_amount').value = "";
	});
};

Production.product.controller.kart.remove = async (product_id) => {
	var kart_backup = [];
	for(i in Production.product.kart){
		if(Production.product.kart[i].id != product_id){
			kart_backup.push(Production.product.kart[i]);
		};
	};

	Production.product.kart = kart_backup;

	Production.product.controller.kart.localStorage.update(Production.product.kart, "productionProductKart");
	Production.product.view.kart.list(Production.product.kart);
	
	// document.getElementById("production-product-kart-table").style.display = "none";
	document.getElementById("production-simulation-box").style.display = "none";
};
	
Production.product.controller.kart.localStorage = {
	verify: async (localStorageKart) => {
		if(JSON.parse(localStorage.getItem(localStorageKart)) != null){
			let kart = JSON.parse(localStorage.getItem(localStorageKart));
			Production.product.kart = kart;

			Production.product.view.kart.list(Production.product.kart);
		};
	},
	update: async (kart, localStorageKart) => {
		const stringifiedKart = JSON.stringify(kart);
		localStorage.setItem(localStorageKart, stringifiedKart);
		if(!kart.length){
			localStorage.setItem(localStorageKart, null);
		};
	}
};

Production.product.controller.kart.localStorage.verify("productionProductKart");