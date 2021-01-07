Sale.kart = [];
Sale.controller.kart = {};

Sale.controller.kart.product = {};

Sale.controller.kart.product.add = document.getElementById("sale-kart-product-form");
if(Sale.controller.kart.product.add){
	Sale.controller.kart.product.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("sale-kart-product-form").elements.namedItem("product").readOnly){ 
			return alert("Produto inválido");
		};

		let product = document.getElementById("sale-kart-product-form").elements.namedItem("product");
		let splitedProduct = product.value.split(" | ");
		let amount = document.getElementById("sale-kart-product-form").elements.namedItem("amount").value;

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

		for(i in Sale.kart){
			if(Sale.kart[i].id == product.id){
				return alert("Você já incluiu este produto na lista de produção.");
			};
		};

		Sale.kart.push(product);

		Sale.controller.kart.update(Sale.kart);

		let stringified_kart = JSON.stringify(Sale.kart);
		lib.localStorage.update("sale-kart", stringified_kart);
		
		Sale.product.view.kart.list(Sale.kart);

		document.getElementById("sale-kart-product-form").elements.namedItem('product').value = "";
		document.getElementById("sale-kart-product-form").elements.namedItem('product').dataset.id = "";
		document.getElementById("sale-kart-product-form").elements.namedItem('amount').value = "";
	});
};

Sale.controller.kart.update = (kart) => {
	return Sale.kart = kart.sort((a, b) => {
	  return a.code - b.code;
	});
};

Sale.controller.kart.product.decrease = async (product_id) => {
	for(i in Sale.kart){
		if(Sale.kart[i].id == product_id && Sale.kart[i].amount > 1){
			Sale.kart[i].amount -= 1;
		};
	};
	let stringified_kart = JSON.stringify(Sale.kart);
	lib.localStorage.update("sale-kart", stringified_kart);
	Sale.product.view.kart.list(Sale.kart);
};

Sale.controller.kart.product.increase = async (product_id) => {
	for(i in Sale.kart){
		if(Sale.kart[i].id == product_id){
			Sale.kart[i].amount += 1;
		};
	};
	let stringified_kart = JSON.stringify(Sale.kart);
	lib.localStorage.update("sale-kart", stringified_kart);
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

	let stringified_kart = JSON.stringify(Sale.kart);
	lib.localStorage.update("sale-kart", stringified_kart);
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
			
			let stringified_kart = JSON.stringify(Sale.kart);
			lib.localStorage.update("sale-kart", stringified_kart);

			return Sale.product.view.kart.list(Sale.kart);
		};
	};
};

Sale.controller.kart.product.includeMolleKit = (pack) => {
	let kit = [];
	if(pack == "PC8PT"){
		kit = [{"id":"8","code":"11","name":"Colete Mod. Plate Carrier","color":"pt","size":"ST","amount":1,"price":0},{"id":"26","code":"501","name":"Porta Camelback Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"27","code":"502","name":"Bolsa Pequena Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"28","code":"503","name":"Bolsa M Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"32","code":"507","name":"Porta Carregador Fuzil Elástic","color":"pt","size":"ST","amount":2,"price":0},{"id":"33","code":"508","name":"Porta Carregador Pistola Duplo","color":"pt","size":"ST","amount":1,"price":0},{"id":"36","code":"511","name":"Coldre Modular Universal D","color":"pt","size":"ST","amount":1,"price":0},{"id":"38","code":"513","name":"Porta Rádio/HT","color":"pt","size":"ST","amount":1,"price":0}];
	};
	if(pack == "PC8VD"){
		kit = [{"id":"26","code":"501","name":"Porta Camelback Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"27","code":"502","name":"Bolsa Pequena Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"28","code":"503","name":"Bolsa M Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"32","code":"507","name":"Porta Carregador Fuzil Elástic","color":"pt","size":"ST","amount":2,"price":0},{"id":"33","code":"508","name":"Porta Carregador Pistola Duplo","color":"pt","size":"ST","amount":1,"price":0},{"id":"36","code":"511","name":"Coldre Modular Universal D","color":"pt","size":"ST","amount":1,"price":0},{"id":"38","code":"513","name":"Porta Rádio/HT","color":"pt","size":"ST","amount":1,"price":0}];
	};
	if(pack == "PC8TAN"){
		kit = [{"id":"26","code":"501","name":"Porta Camelback Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"27","code":"502","name":"Bolsa Pequena Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"28","code":"503","name":"Bolsa M Modular","color":"pt","size":"ST","amount":1,"price":0},{"id":"32","code":"507","name":"Porta Carregador Fuzil Elástic","color":"pt","size":"ST","amount":2,"price":0},{"id":"33","code":"508","name":"Porta Carregador Pistola Duplo","color":"pt","size":"ST","amount":1,"price":0},{"id":"36","code":"511","name":"Coldre Modular Universal D","color":"pt","size":"ST","amount":1,"price":0},{"id":"38","code":"513","name":"Porta Rádio/HT","color":"pt","size":"ST","amount":1,"price":0}];
	};
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

	let stringified_kart = JSON.stringify(Sale.kart);
	lib.localStorage.update("sale-kart", stringified_kart);
	Sale.product.view.kart.list(Sale.kart);
};

// Sale.controller.kart.customer = document.getElementById("sale-customer");
// if(Sale.controller.kart.customer){
// 	Sale.controller.kart.customer.addEventListener("change", event => {
// 		let customer = {
// 			id: event.target.value,
// 			info: event.target.options[event.target.selectedIndex].text
// 		};
// 		let stringified_customer = JSON.stringify(customer);
// 		lib.localStorage.update("sale-customer", stringified_customer);
// 	});
// };

Sale.controller.kart.date = document.getElementById("sale-date");
if(Sale.controller.kart.date){
	Sale.controller.kart.date.addEventListener("change", event => {
		lib.localStorage.update("sale-date", event.target.value);
	});
};

Sale.controller.kart.estimated_shipping_date = document.getElementById("estimated-shipping-date");
if(Sale.controller.kart.estimated_shipping_date){
	Sale.controller.kart.estimated_shipping_date.addEventListener("change", event => {
		lib.localStorage.update("estimated-shipping-date", event.target.value);
	});
};

Sale.controller.kart.payment_method = document.getElementById("payment-method");
if(Sale.controller.kart.payment_method){
	Sale.controller.kart.payment_method.addEventListener("change", event => {
		lib.localStorage.update("payment-method", event.target.value);
	});
};

Sale.controller.kart.status = document.getElementById("status");
if(Sale.controller.kart.status){
	Sale.controller.kart.status.addEventListener("change", event => {
		lib.localStorage.update("status", event.target.value);
	});
};

if(lib.localStorage.verify("sale-customer")){
	let customer = JSON.parse(localStorage.getItem("sale-customer"));
	document.getElementById("sale-customer").innerHTML = "<option value='' disabled>Selecionar cliente</option><option value='"+customer.id+"' selected>"+customer.info+"</option>";
};

if(lib.localStorage.verify("sale-date")){
	let date = localStorage.getItem("sale-date");
	document.getElementById("sale-date").value = date;
};

if(lib.localStorage.verify("estimated-shipping-date")){
	let estimated_shipping_date = localStorage.getItem("estimated-shipping-date");
	document.getElementById("estimated-shipping-date").value = estimated_shipping_date;
};

if(lib.localStorage.verify("payment-method")){
	let payment_method = localStorage.getItem("payment-method");
	document.getElementById("payment-method").value = payment_method;
};

if(lib.localStorage.verify("status")){
	let status = localStorage.getItem("status");
	document.getElementById("status").value = status;
};

if(lib.localStorage.verify("sale-kart")){
	let kart = JSON.parse(localStorage.getItem("sale-kart"));
	Sale.kart = kart;
	Sale.product.view.kart.list(Sale.kart);
};