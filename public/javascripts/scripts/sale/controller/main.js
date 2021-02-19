Sale.controller = {};

lib.findCheckedInput = (radio_name) => {
	let radios = document.getElementsByName(radio_name);
	for(let i in radios){
		if(radios[i].checked){
			return radios[i];
		};
	};
	radios = false;
	radios.value = false;
	return radios;
};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", async event => {
		let customer = lib.splitTextBy(document.getElementById("sale-customer").value, " | ");
		if(!customer){ return alert("Ocorreu um erro ao coletar informações do cliente"); };
		customer.id = document.getElementById("sale-customer").dataset.id;
		customer.person_type = document.getElementById("sale-customer").dataset.person_type;

		let sale = {
			id: "",
			customer_id: customer.id,
			customer_name: customer[0],
			customer_address_id: lib.findCheckedInput("sale-customer-address").value,
			products: JSON.stringify(Sale.product.kart.items),
			packages: JSON.stringify(Sale.package.kart.items),
			sale_date: document.getElementById("sale-date").value,
			estimated_shipping_date: document.getElementById("estimated-shipping-date").value,
			payment_method: document.getElementById("payment-method").value,
			status: document.getElementById("status").value,
			value: Sale.pos.total_value
		};

		if(customer.person_type == "legal-entity"){ sale.customer_cnpj = customer[3]; }
		else if(customer.person_type == "natural-person"){ sale.customer_cnpj = customer[1]; }
		else { return alert("Este cliente não é válido!") };

		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

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

		Sale.pos.discount = 0;
		document.getElementById("sale-discount-value").value = '0.00';
		lib.localStorage.remove("sale-discount-value");

		Sale.product.kart.items = [];
		lib.localStorage.remove("sale-product-kart");
		Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

		Sale.package.kart.items = [];
		lib.localStorage.remove("sale-package-kart");
		Sale.package.kart.list("Sale.package.kart", Sale.package.kart.props);

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