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

		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Ecommerce.sale.after_sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
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

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Ecommerce.sale.after_sale.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sales) { return false };

		Ecommerce.sale.after_sale.view.filter(sales);
	});
};

Ecommerce.sale.after_sale.controller.addToFlow = async id => {
	let r = confirm("Confirmar este cliente ao seu fluxo?");
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sale = await Ecommerce.sale.after_sale.addToFlow(id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		Ecommerce.sale.after_sale.controller.filter.submit.click();
	};
};

Ecommerce.sale.after_sale.controller.flow = {};

Ecommerce.sale.after_sale.controller.flow.filter = document.getElementById("ecommerce-sale-after-sale-flow-filter-form");
if(Ecommerce.sale.after_sale.controller.flow.filter){
	Ecommerce.sale.after_sale.controller.flow.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			periodStart: event.target.elements.namedItem("periodStart").value,
			periodEnd: event.target.elements.namedItem("periodEnd").value,
			code: event.target.elements.namedItem("code").value,
			customer_user: event.target.elements.namedItem("customer-user").value,
			customer_name: event.target.elements.namedItem("customer-name").value,
			status: event.target.elements.namedItem("status").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Ecommerce.sale.after_sale.flow.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
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
		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Ecommerce.sale.after_sale.flow.update(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		Ecommerce.sale.after_sale.controller.flow.filter.submit.click();
	};
};