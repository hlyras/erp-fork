Sale.controller = {};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", async event => {
		let customer = lib.splitSelectTextBy(document.getElementById("sale-customer"), " | ");
		if(!customer){ return alert("Ocorreu um erro ao coletar informações do cliente"); };

		let sale = {
			id: "",
			sale_date: document.getElementById("sale-date").value,
			estimated_shipping_date: document.getElementById("estimated-shipping-date").value,
			payment_method: document.getElementById("payment-method").value,
			status: document.getElementById("status").value,
			customer_id: customer.select.value,
			customer_name: customer[0],
			customer_cnpj: customer[1],
			products: JSON.stringify(Sale.kart),
			value: 0
		};

		// use loader
		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		// document.getElementById("").elements.namedItem("").value = "";
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
		Sale.product.view.kart.list(Sale.kart);

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
			periodEnd: event.target.elements.namedItem("periodEnd").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Sale.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		console.log(sales);
	});
};