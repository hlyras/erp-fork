Sale.controller = {};
Sale.controller.kart = {};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", async event => {
		let customer = lib.splitTextBy(document.getElementById("sale-customer").value, " | ");
		if(!customer){ return alert("Ocorreu um erro ao coletar informações do cliente"); };
		customer.id = document.getElementById("sale-customer").dataset.id;

		let sale = {
			id: "",
			sale_date: document.getElementById("sale-date").value,
			estimated_shipping_date: document.getElementById("estimated-shipping-date").value,
			payment_method: document.getElementById("payment-method").value,
			status: document.getElementById("status").value,
			customer_id: customer.id,
			customer_name: customer[0],
			customer_cnpj: customer[1],
			products: JSON.stringify(Sale.product.kart.items),
			value: 0
		};

		console.log(sale);

		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		document.getElementById("").elements.namedItem("").value = "";
		document.getElementById("sale-id").value = "";
		lib.localStorage.remove("sale-id");

		document.getElementById("sale-customer").value = "";
		lib.localStorage.remove("sale-customer");

		document.getElementById("sale-date").value = "";
		lib.localStorage.remove("sale-date");

		document.getElementById("estimated-shipping-date").value = "";
		lib.localStorage.remove("estimated-shipping-date");

		document.getElementById("payment-method").value = "";
		lib.localStorage.remove("payment-method");

		document.getElementById("status").value = "";
		lib.localStorage.remove("status");
		
		Sale.kart = [];
		lib.localStorage.remove("sale-kart");
		Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

		let r = confirm("Deseja ir para a venda criada?\n código: #"+sale.id+"\n data: "+lib.convertDate(sale.sale_date)+"\n previsão de envio: "+lib.convertDate(sale.estimated_shipping_date)+"\n cliente: "+sale.customer_name+"\n Método de pagamento: "+sale.payment_method+"\n status: "+sale.status+"\n Valor: "+sale.value);
		if(r){ console.log("redireciona para venda #"+sale.id) };
	});
};

Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			periodStart: event.target.elements.namedItem("periodStart").value,
			periodEnd: event.target.elements.namedItem("periodEnd").value,
			status: event.target.elements.namedItem("status").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Sale.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, pagination); });
	});
};

Sale.controller.show = async sale_id => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let sale = await Sale.findById(sale_id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';

	Sale.view.show(sale);
};

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