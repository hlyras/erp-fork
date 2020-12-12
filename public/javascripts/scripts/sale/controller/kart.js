Sale.controller.product = { kart: {} };

Sale.product.kart = [];

Sale.controller.product.kart.add = document.getElementById("sale-product-kart-form");
if(Sale.controller.product.kart.add){
	Sale.controller.product.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		var product_id = document.getElementById("sale-product-kart-form").elements.namedItem('product');
		var amount = document.getElementById("sale-product-kart-form").elements.namedItem('amount').value;

		if(product_id.value < 1 || !product_id.value){
			alert("É necessário selecionar um produto.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade do produto.");
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
			amount: parseInt(amount)
		};

		for(i in Sale.product.kart){
			if(Sale.product.kart[i].id == product.id){
				return alert("Você já incluiu este produto na lista de produção.");
			};
		};

		Sale.product.kart.push(product);

		Sale.product.kart.sort((a, b) => {
		  return a.code - b.code;
		});

		Sale.controller.product.kart.localStorage.update(Sale.product.kart, "saleProductKart");
		Sale.product.view.kart.list(Sale.product.kart);

		document.getElementById("sale-product-kart-form").elements.namedItem('amount').value = "";
	});
};

Sale.controller.product.kart.decrease = async (product_id) => {
	for(i in Sale.product.kart){
		if(Sale.product.kart[i].id == product_id && Sale.product.kart[i].amount > 1){
			Sale.product.kart[i].amount -= 1;
		};
	};
	Sale.controller.product.kart.localStorage.update(Sale.product.kart, "saleProductKart");
	Sale.product.view.kart.list(Sale.product.kart);
};

Sale.controller.product.kart.increase = async (product_id) => {
	for(i in Sale.product.kart){
		if(Sale.product.kart[i].id == product_id){
			Sale.product.kart[i].amount += 1;
		};
	};
	Sale.controller.product.kart.localStorage.update(Sale.product.kart, "saleProductKart");
	Sale.product.view.kart.list(Sale.product.kart);
};

Sale.controller.product.kart.remove = async (product_id) => {
	var kart_backup = [];
	for(i in Sale.product.kart){
		if(Sale.product.kart[i].id != product_id){
			kart_backup.push(Sale.product.kart[i]);
		};
	};

	Sale.product.kart = kart_backup;

	Sale.controller.product.kart.localStorage.update(Sale.product.kart, "saleProductKart");
	Sale.product.view.kart.list(Sale.product.kart);
};

Sale.controller.product.kart.updateAmount = async (product_id, amount) => {
	console.log(product_id, amount);
	if(amount < 1){
		alert("Quantidade Inválida");
		return Sale.product.view.kart.list(Sale.product.kart);
	};
	for(i in Sale.product.kart){
		if(Sale.product.kart[i].id == product_id){
			Sale.product.kart[i].amount = parseInt(amount);
			
			Sale.controller.product.kart.localStorage.update(Sale.product.kart, "saleProductKart");
			return Sale.product.view.kart.list(Sale.product.kart);
		};
	};
};
	
Sale.controller.product.kart.localStorage = {
	verify: async (localStorageKart) => {
		if(JSON.parse(localStorage.getItem(localStorageKart)) != null){
			let kart = JSON.parse(localStorage.getItem(localStorageKart));
			Sale.product.kart = kart;

			Sale.product.view.kart.list(Sale.product.kart);
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

Sale.controller.product.kart.includeMolleKit = () => {
	let kit = [{"id":"26","code":"501","name":"Porta Camelback Modular","color":"pt","size":"ST","amount":1},{"id":"27","code":"502","name":"Bolsa Pequena Modular","color":"pt","size":"ST","amount":1},{"id":"28","code":"503","name":"Bolsa M Modular","color":"pt","size":"ST","amount":1},{"id":"32","code":"507","name":"Porta Carregador Fuzil Elástic","color":"pt","size":"ST","amount":1},{"id":"33","code":"508","name":"Porta Carregador Pistola Duplo","color":"pt","size":"ST","amount":1},{"id":"36","code":"511","name":"Coldre Modular Universal D","color":"pt","size":"ST","amount":1},{"id":"38","code":"513","name":"Porta Rádio/HT","color":"pt","size":"ST","amount":1}];
	Sale.product.kart = kit.reduce((kart, product) => {
		for(i in kart){
			if(product.id == kart[i].id){
				kart[i].amount += 1;
				return kart;
			};
		};
		kart.push(product);
		return kart;
	}, Sale.product.kart);

	Sale.controller.product.kart.localStorage.update(Sale.product.kart, "saleProductKart");
	Sale.product.view.kart.list(Sale.product.kart);
};

Sale.controller.product.kart.localStorage.verify("saleProductKart");