Sale.controller = {};

Sale.controller.category = document.getElementById("sale-category-select");
if(Sale.controller.category){
	Sale.controller.category.addEventListener("change", event => {
		document.getElementById("sale-category-select").style.display = "none";
		document.getElementById("sale-edit-box").style.display = "";
	});
};

Sale.controller.payment_method = document.getElementById("payment-method");
if(Sale.controller.payment_method){
	Sale.controller.payment_method.addEventListener("change", event => {
		let html = "";
		if(event.target.value === "Cartão de crédito"){
			html += "<option value='' disabled selected>Prazo de Pagamento</option>";
			html += "<option value='1x'>1x</option>";
			html += "<option value='2x'>2x</option>";
			html += "<option value='3x'>3x</option>";
		} else if(event.target.value === "Boleto") {
			html += "<option value='' disabled selected>Prazo de Pagamento</option>";
			html += "<option value='1x'>1x</option>";
			html += "<option value='2x'>2x</option>";
			html += "<option value='3x'>3x</option>";
		} else {
			html += "<option value='' disabled selected>Prazo de Pagamento</option>";
			html += "<option value='À vista'>À vista</option>";
		}
		document.getElementById("payment-period").innerHTML = html;
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
			weight: Sale.pos.total_weight,
			obs: document.getElementById("sale-obs").value,
			shipment_method: document.getElementById("shipment-method").value,
			payment_method: document.getElementById("payment-method").value,
			payment_period: document.getElementById("payment-period").value,
			status: document.getElementById("status").value,
			product_value: Sale.product.kart.total_value,
			package_value: Sale.package.kart.total_value,
			shipment_value: Sale.pos.shipment_value,
			discount_value: Sale.pos.discount_value,
			value: Sale.pos.total_value
		};

		if(customer.person_type == "legal-entity"){ sale.customer_cnpj = customer[3]; }
		else if(customer.person_type == "natural-person"){ sale.customer_cnpj = customer[1]; }
		else { return alert("Este cliente não é válido!") };

		sale = await API.response(Sale.save, sale);
		if(!sale) { return false };

		document.getElementById("sale-id").value = "";
		document.getElementById("sale-customer").value = "";
		document.getElementById("shipment-method").value = "";
		document.getElementById("payment-method").value = "";
		document.getElementById("payment-period").value = "";
		document.getElementById("status").value = "";
		document.getElementById("sale-obs").value = "";

		Sale.pos.discount = 0;
		document.getElementById("sale-discount-value").value = '0.00';

		Sale.pos.shipment = 0;
		document.getElementById("sale-shipment-value").value = '0.00';

		Sale.product.kart.items = [];
		Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

		Sale.package.kart.items = [];
		Sale.package.kart.list("Sale.package.kart", Sale.package.kart.props);

		if(Sale.controller.filter){ if(sale.id > 0){ Sale.controller.filter.submit.click(); } }
		alert("Venda confirmada\n código: #"+sale.id+"\n data: "+lib.timestampToDate(sale.sale_date)+"\n previsão de envio: "+lib.timestampToDate(sale.estimated_shipment_date)+"\n cliente: "+sale.customer_name+"\n Método de pagamento: "+sale.payment_method+"\n status: "+sale.status+"\n Valor: "+sale.value);
		if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; }
		document.getElementById("sale-category-select").value = ""; 
		document.getElementById("sale-category-select").style.display = "";
	});
};


Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			user_id: event.target.elements.namedItem("user_id").value,
			id: event.target.elements.namedItem("id").value,
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			customer_cpf: event.target.elements.namedItem("customer_cpf").value,
			shipment_method: event.target.elements.namedItem("shipment_method").value,
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value
		};

		let sales = await API.response(Sale.filter, sale);

		lib.display("sale-filter-box", "");
		lib.display("sale-show-box", "none");
		document.getElementById("sale-edit-box") && lib.display("sale-edit-box", "none");

		if(document.getElementById("sale-category-select")){
			lib.display("sale-category-select", "none"); 
			document.getElementById("sale-category-select").value = ""; 
		};

		const setup = { pageSize: 10, page: 0 };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); }());
	});
};

Sale.controller.filterBy = (status) => {
	Sale.controller.filter.status.value = status;
	Sale.controller.filter.code = "";
	Sale.controller.filter.customer_name.value = "";
	Sale.controller.filter.customer_cnpj.value = "";
	Sale.controller.filter.customer_cpf.value = "";
	Sale.controller.filter.shipment_method.value = "";
	Sale.controller.filter.periodStart.value = "";
	Sale.controller.filter.periodEnd.value = "";
	Sale.controller.filter.submit.click();
};

Sale.controller.show = async (sale_id, status) => {
	let sale = await API.response(Sale.findById, sale_id);

	Sale.view.show(sale, status);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "";
	if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };
	if(document.getElementById("sale-category-select")){ 
		document.getElementById("sale-category-select").style.display = "none"; 
		document.getElementById("sale-category-select").value = ""; 
	};
};

Sale.controller.edit = async sale_id => {
	let sale = await API.response(Sale.findById, sale_id);
	if(!sale) { return false };

	Sale.view.edit(sale);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "none";
	if(document.getElementById("sale-category-select")){ 
		document.getElementById("sale-category-select").style.display = ""; 
		document.getElementById("sale-category-select").value = ""; 
	};
};

Sale.controller.cancel = async sale_id => {
	let r = confirm("Deseja cancelar a venda?");
	if(r){
		let response = await API.response(Sale.cancel, sale_id);
		if(!response){ return false; };

		alert(response);
		Sale.controller.filter.submit.click();
	};
};

Sale.nf.controller = {};

Sale.nf.controller.save = async e => {
	e.preventDefault();

	let sale = {
		id: e.target.elements.namedItem("id").value,
		nf_code: e.target.elements.namedItem("code").value,
		nf: e.target.elements.namedItem("url").value
	};

	let r = confirm("Deseja confirmar anexo da Nota Fiscal?");

	if(r) {
		if(!e.target.elements.namedItem("code").value && !e.target.elements.namedItem("url").value) {
			r = confirm("Nenhuma Nota fiscal será incluída neste pedido, deseja prosseguir?");
			if(!r) { return false; }
			let response = await API.response(Sale.nf.save, sale);
			if(!response){ return false; };

			alert(response);
			Sale.controller.filter.submit.click();
		} else if(e.target.elements.namedItem("code").value && e.target.elements.namedItem("url").value.length > 10) {
			let response = await API.response(Sale.nf.save, sale);
			if(!response){ return false; };

			alert(response);
			Sale.controller.filter.submit.click();
		} else {
			!e.target.elements.namedItem("code").value && alert("Nº da NF é inválido");
			e.target.elements.namedItem("url").value.length < 10 && alert("URL da NF é inválida");
			return;
		}
	}
};

Sale.shipment.controller = {};

Sale.shipment.controller.confirm = async sale_id => {
	let r = confirm("Deseja confirmar envio?");
	if(r){
		let response = await API.response(Sale.shipment.confirm, sale_id);
		if(!response){ return false; };
		
		alert(response);
		Sale.controller.filter.submit.click();
	};
};

Sale.pos = {
	shipment_value: 0,
	discount_value: 0,
	total_value: 0,
	total_weight: 0 
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

Sale.pos.updateWeight = () => {
	Sale.pos.total_weight = 0;

	if(isNaN(Sale.product.kart.total_weight)){ Sale.product.kart.total_weight = 0; } else { Sale.pos.total_weight += Sale.product.kart.total_weight };
	if(isNaN(Sale.package.kart.total_weight)){ Sale.package.kart.total_weight = 0; } else { Sale.pos.total_weight += Sale.package.kart.total_weight };
	Sale.pos.total_weight = lib.roundValue(Sale.pos.total_weight);
	document.getElementById("sale-weight").innerHTML = Sale.pos.total_weight+"g";
};

Sale.discount_value = document.getElementById("sale-discount-value");
if(Sale.discount_value){
	Sale.discount_value.addEventListener("change", event => {
		Sale.pos.discount_value = parseFloat(document.getElementById("sale-discount-value").value);

		if(!Sale.discount_value){
			Sale.pos.discount_value = 0;
			document.getElementById("sale-discount-value").value = Sale.pos.discount_value.toFixed(2);
		} else {
			document.getElementById("sale-discount-value").value = Sale.pos.discount_value.toFixed(2);
		};
		Sale.pos.updateValue();
	});
};

Sale.shipment_value = document.getElementById("sale-shipment-value");
if(Sale.shipment_value){
	Sale.shipment_value.addEventListener("change", event => {
		Sale.pos.shipment_value = parseFloat(document.getElementById("sale-shipment-value").value);

		if(!Sale.shipment_value){
			Sale.pos.shipment_value = 0;
			document.getElementById("sale-shipment-value").value = Sale.pos.shipment_value.toFixed(2);
		} else {
			document.getElementById("sale-shipment-value").value = Sale.pos.shipment_value.toFixed(2);
		};
		Sale.pos.updateValue();
	});
};