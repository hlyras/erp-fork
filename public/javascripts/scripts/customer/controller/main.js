Customer.controller = {};

Customer.controller.create = document.getElementById("customer-create-form");
if(Customer.controller.create){
	Customer.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer = {
			id: event.target.elements.namedItem("id").value,
			type: event.target.elements.namedItem("type").value,
			name: event.target.elements.namedItem("name").value,
			
			cpf: event.target.elements.namedItem("cpf").value,
			trademark: event.target.elements.namedItem("trademark").value,
			brand: event.target.elements.namedItem("brand").value,
			cnpj: event.target.elements.namedItem("cnpj").value,
			ie: event.target.elements.namedItem("ie").value,
			
			email: event.target.elements.namedItem("email").value,
			phone: event.target.elements.namedItem("phone").value,
			cellphone: event.target.elements.namedItem("cellphone").value,
			social_media: event.target.elements.namedItem("social-media").value
		};

		customer = await Customer.save(customer);
		if(!customer) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("trademark").value = "";
		event.target.elements.namedItem("brand").value = "";
		event.target.elements.namedItem("cnpj").value = "";
		event.target.elements.namedItem("cpf").value = "";
		event.target.elements.namedItem("ie").value = "";
		event.target.elements.namedItem("email").value = "";
		event.target.elements.namedItem("phone").value = "";
		event.target.elements.namedItem("cellphone").value = "";
		event.target.elements.namedItem("social-media").value = "";

		Customer.controller.filter.submit.click();
	});
};

Customer.controller.filter = document.getElementById("customer-filter-form");
if(Customer.controller.filter){
	Customer.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let customer = {
			name: event.target.elements.namedItem("name").value,
			trademark: event.target.elements.namedItem("name").value,
			brand: event.target.elements.namedItem("name").value,
			cnpj: event.target.elements.namedItem("cnpj").value
		};

		let customers = await Customer.filter(customer);

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("customer-filter-box", Customer.view.filter, customers, pagination); });
	});
};

Customer.controller.show = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let customer = await Customer.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';

	document.getElementById("customer-show-box").style.display = "";
	Customer.view.show(customer, "customer-show-box");
};

Customer.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let customer = await Customer.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!customer){ return false };

	Customer.controller.create.elements.namedItem("id").value = customer.id;
	Customer.controller.create.elements.namedItem("name").value = customer.name;
	Customer.controller.create.elements.namedItem("trademark").value = customer.trademark;
	Customer.controller.create.elements.namedItem("brand").value = customer.brand;
	Customer.controller.create.elements.namedItem("cnpj").value = customer.cnpj;
	Customer.controller.create.elements.namedItem("ie").value = customer.ie;
	Customer.controller.create.elements.namedItem("email").value = customer.email;
	Customer.controller.create.elements.namedItem("phone").value = customer.phone;
	Customer.controller.create.elements.namedItem("cellphone").value = customer.cellphone;
};

Customer.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o cliente?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Customer.delete(id)){ return false };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Customer.controller.filter.submit.click();
		document.getElementById("customer-show-box").style.display = "none";
	};
};