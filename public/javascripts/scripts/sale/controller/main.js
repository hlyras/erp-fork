Sale.controller = {};

Sale.controller.category = document.getElementById("sale-category-select");
if(Sale.controller.category){
	Sale.controller.category.addEventListener("change", event => {
		document.getElementById("sale-category-select").style.display = "none";
		document.getElementById("sale-edit-box").style.display = "";
	});
};

// let sale_payment_method = [
// 	{ id: 1, name: "Dinheiro" },
// 	{ id: 2, name: "Transferência" },
// 	{ id: 3, name: "Boleto" },
// 	{ id: 4, name: "Faturado" }
// ];

// let sale_payment_period = [
// 	{ id: 1, method_id: 1, name: "à vista" },
// 	{ id: 2, method_id: 2, name: "à vista" },
// 	{ id: 3, method_id: 2, name: "50% / 50%" },
// 	{ id: 4, method_id: 3, name: "à vista" },
// 	{ id: 5, method_id: 4, name: "1 parcela" },
// 	{ id: 6, method_id: 4, name: "2 parcelas" },
// 	{ id: 7, method_id: 4, name: "3 parcelas" },
// 	{ id: 8, method_id: 4, name: "4 parcelas" },
// 	{ id: 9, method_id: 4, name: "5 parcelas" },
// 	{ id: 10, method_id: 4, name: "6 parcelas" }
// ];

Sale.controller.payment_method = document.getElementById("payment-method");
if(Sale.controller.payment_method){
	Sale.controller.payment_method.addEventListener("change", event => {
		let html = "";
		if(event.target.value === "Cartão de crédito"){
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

// Sale.controller.payment_period = document.getElementById("payment-period");
// if(Sale.controller.payment_period){
// 	Sale.controller.payment_period.addEventListener("change", event => {
// 		let installment = event.target.value.split(" ")[0];
// 		let html = "";
// 
// 		for(let i = 1; i <= parseInt(installment); i++){
// 			html += "<input id='installment-"+i+"' class='box b"+installment+" margin-top-5 input-generic center' placeholder='"+i+"ª parcela'>";
// 		};
// 
// 		document.getElementById("payment-days").innerHTML = html;
// 	});
// };

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

		document.getElementById("sale-obs").value = "";
		lib.localStorage.remove("sale-obs");

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
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value,
			user_id: event.target.elements.namedItem("user_id").value
		};

		if(sale.status == "Confirmadas"){ sale.status = ""; };
		
		let sales = await API.response(Sale.filter, sale);

		if(event.target.elements.namedItem("status").value == "Confirmadas"){ sale.status = "Confirmadas"; };

		document.getElementById("sale-filter-box").style.display = "";
		document.getElementById("sale-show-box").style.display = "none";
		if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };
		if(document.getElementById("sale-category-select")){ 
			document.getElementById("sale-category-select").style.display = "none"; 
			document.getElementById("sale-category-select").value = ""; 
		};

		const setup = { pageSize: 10, page: 0, status: sale.status };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); }());
	});
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

Sale.controller.confirmNF = async sale_id => {
	let r = confirm("Deseja confirmar anexo de Nota Fiscal?");
	if(r){
		let sale = { id: sale_id, nf: document.getElementById("sale-nf-url").value };

		let response = await API.response(Sale.confirmNF, sale);
		if(!response){ return false; };

		alert(response);
		Sale.controller.filter.submit.click();
	};
};

Sale.controller.confirmShipment = async sale_id => {
	let r = confirm("Deseja confirmar envio?");
	if(r){
		let response = await API.response(Sale.confirmShipment, sale_id);
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