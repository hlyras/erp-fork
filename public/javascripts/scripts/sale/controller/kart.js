Sale.kart = [];
Sale.controller.kart = {};

Sale.controller.kart.product = {};

Sale.controller.kart.product.add = document.getElementById("sale-product-kart-form");
if(Sale.controller.kart.product.add){
	Sale.controller.kart.product.add.addEventListener("submit", async (event) => {
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
			amount: parseInt(amount),
			value: 0
		};

		for(i in Sale.kart){
			if(Sale.kart[i].id == product.id){
				return alert("Você já incluiu este produto na lista de produção.");
			};
		};

		Sale.kart.push(product);

		Sale.kart.sort((a, b) => {
		  return a.code - b.code;
		});

		Sale.controller.localStorage.kart.update(Sale.kart, "sale-kart");
		Sale.product.view.kart.list(Sale.kart);

		document.getElementById("sale-product-kart-form").elements.namedItem('amount').value = "";
	});
};

Sale.controller.kart.product.decrease = async (product_id) => {
	for(i in Sale.kart){
		if(Sale.kart[i].id == product_id && Sale.kart[i].amount > 1){
			Sale.kart[i].amount -= 1;
		};
	};
	Sale.controller.localStorage.kart.update(Sale.kart, "sale-kart");
	Sale.product.view.kart.list(Sale.kart);
};

Sale.controller.kart.product.increase = async (product_id) => {
	for(i in Sale.kart){
		if(Sale.kart[i].id == product_id){
			Sale.kart[i].amount += 1;
		};
	};
	Sale.controller.localStorage.kart.update(Sale.kart, "sale-kart");
	Sale.product.view.kart.list(Sale.kart);
};

Sale.controller.kart.product.remove = async (product_id) => {
	var kart_backup = [];
	for(i in Sale.kart){
		if(Sale.kart[i].id != product_id){
			kart_backup.push(Sale.kart[i]);
		};
	};

	Sale.kart = kart_backup;

	Sale.controller.localStorage.kart.update(Sale.kart, "sale-kart");
	Sale.product.view.kart.list(Sale.kart);
};

Sale.controller.kart.product.updateAmount = async (product_id, amount) => {
	if(amount < 1){
		alert("Quantidade Inválida");
		return Sale.product.view.kart.list(Sale.kart);
	};
	for(i in Sale.kart){
		if(Sale.kart[i].id == product_id){
			Sale.kart[i].amount = parseInt(amount);
			
			Sale.controller.localStorage.kart.update(Sale.kart, "sale-kart");
			return Sale.product.view.kart.list(Sale.kart);
		};
	};
};

Sale.controller.kart.customer = document.getElementById("sale-customer-select");
if(Sale.controller.kart.customer){
	Sale.controller.kart.customer.addEventListener("change", event => {
		let splited_customer = lib.splitSelectTextBy(event.target, " | ");

		let customer = {
			id: event.target.value,
			name: splited_customer[0],
			cnpj: splited_customer[1]
		};

		console.log(customer);

		// Sale.controller.localStorage
	});
};

Sale.controller.localStorage = {
	customer: {
		verify: async (localStorageCustomer) => {
			if(JSON.parse(localStorage.getItem(localStorageCustomer)) != null){
				let customer = localStorage.getItem(localStorageCustomer);

				Sale.product.view.kart.list(Sale.kart);
			};
		},
		update: async (kart, localStorageCustomer) => {
			const stringifiedKart = JSON.stringify(kart);
			localStorage.setItem(localStorageCustomer, stringifiedKart);
			if(!kart.length){
				localStorage.setItem(localStorageCustomer, null);
			};
		}
	},
	date: {
		verify: async (localStorageKart) => {
			if(JSON.parse(localStorage.getItem(localStorageKart)) != null){
				let kart = JSON.parse(localStorage.getItem(localStorageKart));
				Sale.kart = kart;

				Sale.product.view.kart.list(Sale.kart);
			};
		},
		update: async (kart, localStorageKart) => {
			const stringifiedKart = JSON.stringify(kart);
			localStorage.setItem(localStorageKart, stringifiedKart);
			if(!kart.length){
				localStorage.setItem(localStorageKart, null);
			};
		}
	},
	kart: {
		verify: async (localStorageKart) => {
			if(JSON.parse(localStorage.getItem(localStorageKart)) != null){
				let kart = JSON.parse(localStorage.getItem(localStorageKart));
				Sale.kart = kart;

				Sale.product.view.kart.list(Sale.kart);
			};
		},
		update: async (kart, localStorageKart) => {
			const stringifiedKart = JSON.stringify(kart);
			localStorage.setItem(localStorageKart, stringifiedKart);
			if(!kart.length){
				localStorage.setItem(localStorageKart, null);
			};
		}
	}
};

Sale.controller.kart.product.localStorage = {
	verify: async (localStorageKart) => {
		if(JSON.parse(localStorage.getItem(localStorageKart)) != null){
			let kart = JSON.parse(localStorage.getItem(localStorageKart));
			Sale.kart = kart;

			Sale.product.view.kart.list(Sale.kart);
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

Sale.controller.kart.product.includeMolleKit = () => {
	let kit = [{"id":"26","code":"501","name":"Porta Camelback Modular","color":"pt","size":"ST","amount":1},{"id":"27","code":"502","name":"Bolsa Pequena Modular","color":"pt","size":"ST","amount":1},{"id":"28","code":"503","name":"Bolsa M Modular","color":"pt","size":"ST","amount":1},{"id":"32","code":"507","name":"Porta Carregador Fuzil Elástic","color":"pt","size":"ST","amount":2},{"id":"33","code":"508","name":"Porta Carregador Pistola Duplo","color":"pt","size":"ST","amount":1},{"id":"36","code":"511","name":"Coldre Modular Universal D","color":"pt","size":"ST","amount":1},{"id":"38","code":"513","name":"Porta Rádio/HT","color":"pt","size":"ST","amount":1}];
	Sale.kart = kit.reduce((kart, product) => {
		for(i in kart){
			if(product.id == kart[i].id){
				kart[i].amount += product.amount;
				return kart;
			};
		};
		kart.push(product);
		return kart;
	}, Sale.kart);

	Sale.controller.localStorage.kart.update(Sale.kart, "sale-kart");
	Sale.product.view.kart.list(Sale.kart);
};

Sale.controller.localStorage.kart.verify("sale-kart");
// Sale.controller.localStorage.customer.verify("sale-customer");
// Sale.controller.kart.product.localStorage.verify("sale-kart");
// Sale.controller.kart.product.localStorage.verify("sale-kart");