Sale.controller = {};

lib.findCheckedRadios = (radio_name) => {
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

Sale.controller.category = document.getElementById("sale-category-select");
if(Sale.controller.category){
	Sale.controller.category.addEventListener("change", event => {
		if(event.target.value == "Representantes"){
			document.getElementById("sale-category-select").style.display = "none";
			document.getElementById("sale-edit-box").style.display = "";
			Sale.controller.category = 3;
		} else if(event.target.value == "Atacado"){
			document.getElementById("sale-category-select").style.display = "none";
			document.getElementById("sale-edit-box").style.display = "";
			Sale.controller.category = 2;
		};
	});
};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", async event => {
		let customer = lib.splitTextBy(document.getElementById("sale-customer").value, " | ");
		if(!customer){ return alert("Ocorreu um erro ao coletar informações do cliente"); };
		customer.id = document.getElementById("sale-customer").dataset.id;
		customer.person_type = document.getElementById("sale-customer").dataset.person_type;

		for(let i in Sale.package.kart.items){
			for(let j in Sale.package.product){
				if(Sale.package.kart.items[i].id == Sale.package.product[j].id){
					Sale.package.kart.items[i].products = Sale.package.product[j].items;
				};
			};
		};

		let sale = {
			id: document.getElementById("sale-id").value,
			sale_date: lib.dateToTimestamp(lib.genPatternDate()),
			customer_id: customer.id,
			customer_name: customer[0],
			customer_address_id: lib.findCheckedRadios("sale-customer-address").value,
			products: JSON.stringify(Sale.product.kart.items),
			packages: JSON.stringify(Sale.package.kart.items),
			shipment_method: document.getElementById("shipment-method").value,
			payment_method: document.getElementById("payment-method").value,
			payment_period: document.getElementById("payment-period").value,
			status: document.getElementById("status").value,
			product_value: Sale.product.kart.total_value,
			package_value: Sale.package.kart.total_value,
			shipment_value: Sale.pos.shipment_value.value,
			discount_value: Sale.pos.discount_value.value,
			value: Sale.pos.total_value
		};

		console.log(sale);

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

		document.getElementById("shipment-method").value = "";
		lib.localStorage.remove("shipment-method");

		document.getElementById("payment-method").value = "";
		lib.localStorage.remove("payment-method");

		document.getElementById("payment-period").value = "";
		lib.localStorage.remove("payment-period");

		document.getElementById("status").value = "";
		lib.localStorage.remove("status");

		Sale.pos.discount = 0;
		document.getElementById("sale-discount-value").value = '0.00';
		lib.localStorage.remove("sale-discount-value");

		Sale.pos.shipment = 0;
		document.getElementById("sale-shipment-value").value = '0.00';
		lib.localStorage.remove("sale-shipment-value");

		Sale.product.kart.items = [];
		lib.localStorage.remove("sale-product-kart");
		Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

		Sale.package.kart.items = [];
		lib.localStorage.remove("sale-package-kart");
		Sale.package.kart.list("Sale.package.kart", Sale.package.kart.props);

		if(sale.id){ Sale.controller.filter.submit.click(); };
		alert("Venda confirmada\n código: #"+sale.id+"\n data: "+lib.timestampToDate(sale.sale_date)+"\n previsão de envio: "+lib.timestampToDate(sale.estimated_shipment_date)+"\n cliente: "+sale.customer_name+"\n Método de pagamento: "+sale.payment_method+"\n status: "+sale.status+"\n Valor: "+sale.value);
		if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };
	});
};

Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value
		};
		
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Sale.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';

		document.getElementById("sale-filter-box").style.display = "";
		document.getElementById("sale-show-box").style.display = "none";
		if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };
		if(document.getElementById("sale-category-select")){ document.getElementById("sale-category-select").style.display = "none"; };

		const setup = { pageSize: 10, page: 0, status: sale.status };
		$(() => { lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); });
	});
};

Sale.controller.show = async (sale_id, status) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let sale = await Sale.findById(sale_id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';

	Sale.view.show(sale, status);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "";
	if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };
	if(document.getElementById("sale-category-select")){ document.getElementById("sale-category-select").style.display = "none"; };
};

Sale.controller.edit = async sale_id => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let sale = await Sale.findById(sale_id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!sale) { return false };

	Sale.view.edit(sale);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "none";
	if(document.getElementById("sale-category-select")){ document.getElementById("sale-category-select").style.display = ""; };
};

Sale.controller.cancel = async sale_id => {
	let r = confirm("Deseja cancelar a venda?");
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Sale.cancel(sale_id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!response){ return false; };
		alert(response);
		Sale.controller.filter.submit.click();
	};
};

Sale.controller.confirmNF = async sale_id => {
	let r = confirm("Deseja confirmar anexo de Nota Fiscal?");
	if(r){
		let sale = { id: sale_id, nf: document.getElementById("sale-nf-url").value };
		console.log(sale);
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Sale.confirmNF(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!response){ return false; };
		alert(response);
		Sale.controller.filter.submit.click();
	};
};

Sale.pos = {
	shipment_value: 0,
	discount_value: 0,
	total_value: 0 
};

Sale.pos.updateValue = () => {
	Sale.pos.total_value = 0;

	if(isNaN(Sale.product.kart.total_value)){ Sale.product.kart.total_value = 0; } else { Sale.pos.total_value += Sale.product.kart.total_value };
	if(isNaN(Sale.package.kart.total_value)){ Sale.package.kart.total_value = 0; } else { Sale.pos.total_value += Sale.package.kart.total_value };
	if(!isNaN(Sale.pos.discount_value)){ Sale.pos.total_value -= Sale.pos.discount_value; };
	if(!isNaN(Sale.pos.shipment_value)){ Sale.pos.total_value += Sale.pos.shipment_value; };
	Sale.pos.total_value = lib.roundValue(Sale.pos.total_value);
	document.getElementById("sale-value").innerHTML = "$"+Sale.pos.total_value.toFixed(2);
};

Sale.pos.discount_value = document.getElementById("sale-discount-value");
if(Sale.pos.discount_value){
	Sale.pos.discount_value.addEventListener("change", event => {
		Sale.pos.discount_value = parseFloat(document.getElementById("sale-discount-value").value);

		if(!Sale.pos.discount_value){
			document.getElementById("sale-discount-value").value = 0;
		} else {
			document.getElementById("sale-discount-value").value = Sale.pos.discount_value.toFixed(2);
		};
		Sale.pos.updateValue();
	});
};

Sale.pos.shipment_value = document.getElementById("sale-shipment-value");
if(Sale.pos.shipment_value){
	Sale.pos.shipment_value.addEventListener("change", event => {
		Sale.pos.shipment_value = parseFloat(document.getElementById("sale-shipment-value").value);

		if(!Sale.pos.shipment_value){
			document.getElementById("sale-shipment-value").value = 0;
		} else {
			document.getElementById("sale-shipment-value").value = Sale.pos.shipment_value.toFixed(2);
		};
		Sale.pos.updateValue();
	});
};