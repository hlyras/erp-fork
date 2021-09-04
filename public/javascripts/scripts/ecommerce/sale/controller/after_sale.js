Ecommerce.sale.controller = {};

Ecommerce.sale.controller.filter = document.getElementById("ecommerce-sale-filter-form");
if(Ecommerce.sale.controller.filter){
	Ecommerce.sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			code: event.target.elements.namedItem("code").value,
			customer_name: event.target.elements.namedItem("customer").value,
			customer_user: event.target.elements.namedItem("customer").value,
			status: event.target.elements.namedItem("status").value,
			tracker: event.target.elements.namedItem("tracker").value,
			periodStart: lib.datetimeToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.datetimeToTimestamp(event.target.elements.namedItem("periodEnd").value)
		};

		let sales = await API.response(Ecommerce.sale.filter, sale);
		if(!sales) { return false }

		document.getElementById("ecommerce-sale-show-box").style.display = "none";

		Ecommerce.sale.view.after_sale.filter(sales);
	});
};

Ecommerce.sale.after_sale.controller = {};

Ecommerce.sale.after_sale.controller.save = document.getElementById("ecommerce-sale-after-sale-create-form");
if(Ecommerce.sale.after_sale.controller.save){
	Ecommerce.sale.after_sale.controller.save.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			id: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("id").value.trim(),
			origin: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("origin").value,
			date: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("date").value,
			code: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("code").value.trim(),
			customer_user: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("customer-user").value.trim(),
			customer_name: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("customer-name").value.trim(),
			customer_phone: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("customer-phone").value.trim(),
			status: document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("status").value,
		};

		sale = await API.response(Ecommerce.sale.after_sale.save, sale);
		if(!sale) { return false };

		document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("origin").value = "";
		document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("code").value = "";
		document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("customer-user").value = "";
		document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("customer-name").value = "";
		document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("customer-phone").value = "";
		document.getElementById("ecommerce-sale-after-sale-create-form").elements.namedItem("date").value = "";

		Ecommerce.sale.after_sale.controller.filter.submit.click();		
	});
};

Ecommerce.sale.after_sale.controller.filter = document.getElementById("ecommerce-sale-after-sale-filter-form");
if(Ecommerce.sale.after_sale.controller.filter){
	Ecommerce.sale.after_sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			periodStart: event.target.elements.namedItem("periodStart").value,
			periodEnd: event.target.elements.namedItem("periodEnd").value,
			code: event.target.elements.namedItem("code").value,
			customer_user: event.target.elements.namedItem("customer-user").value,
			customer_name: event.target.elements.namedItem("customer-name").value,
			status: event.target.elements.namedItem("status").value
		};

		console.log(sale)

		let sales = await API.response(Ecommerce.sale.after_sale.filter, sale);
		if(!sales) { return false };

		Ecommerce.sale.after_sale.view.filter(sales);
	});
};

Ecommerce.sale.after_sale.controller.addToFlow = async id => {
	let r = confirm("Confirmar este cliente ao seu fluxo?");
	if(r){
		let sale = await API.response(Ecommerce.sale.after_sale.addToFlow, id);
		if(!sale) { return false };

		Ecommerce.sale.controller.filter.submit.click();
	};
};

Ecommerce.sale.after_sale.controller.flow = {};

Ecommerce.sale.after_sale.controller.flow.filter = document.getElementById("ecommerce-sale-after-sale-flow-filter-form");
if(Ecommerce.sale.after_sale.controller.flow.filter){
	Ecommerce.sale.after_sale.controller.flow.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			code: event.target.elements.namedItem("code").value,
			customer_user: event.target.elements.namedItem("customer-user").value,
			customer_name: event.target.elements.namedItem("customer-name").value,
			status: event.target.elements.namedItem("status").value
		};

		let sales = await API.response(Ecommerce.sale.after_sale.flow.filter, sale);
		if(!sales) { return false };

		Ecommerce.sale.after_sale.flow.view.filter(sales);
	});
};

Ecommerce.sale.after_sale.controller.flow.update = async sale_id => {
	let sale = {
		id: sale_id,
		obs: document.getElementById("ecommerce-sale-after-sale-flow-obs-"+sale_id).value,
		status: document.getElementById("ecommerce-sale-after-sale-flow-status-"+sale_id).value
	};

	if(!sale.id){ return alert("Venda inválida.")};
	if(!sale.status){ return alert("Selecione a avaliação do cliente.")};

	let r = confirm("Deseja realmente atualizar a venda?");
	if(r){
		sale = await API.response(Ecommerce.sale.after_sale.flow.update, sale);
		if(!sale) { return false };

		Ecommerce.sale.after_sale.controller.flow.filter.submit.click();
	};
};