Customer.controller = {};

Customer.controller.create = document.getElementById("customer-create-form");
if(Customer.controller.create){
	Customer.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer = {
			id: event.target.elements.namedItem("id").value,
			person_type: event.target.elements.namedItem("person-type").value,
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

		customer = await API.response(Customer.save, customer);
		if(!customer) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("cpf").value = "";
		event.target.elements.namedItem("trademark").value = "";
		event.target.elements.namedItem("brand").value = "";
		event.target.elements.namedItem("cnpj").value = "";
		event.target.elements.namedItem("ie").value = "";
		event.target.elements.namedItem("email").value = "";
		event.target.elements.namedItem("phone").value = "";
		event.target.elements.namedItem("cellphone").value = "";
		event.target.elements.namedItem("social-media").value = "";

		Customer.controller.filter.submit.click();
	});
};

Customer.controller.form = {
	switchPersonType: (input) => {
		if(input.value == "legal-entity"){
	        document.getElementById("legal-entity-form").style.display = "";
	        document.getElementById("customer-create-form").elements.namedItem("person-type").value = "legal-entity";
	    } else if(input.value == "natural-person"){
	        document.getElementById("legal-entity-form").style.display = "none";
	        document.getElementById("customer-create-form").elements.namedItem("person-type").value = "natural-person";
	    };
	}
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

		let customers = await API.response(Customer.filter, customer);
		if(!customers){ return false };

		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("customer-filter-box", Customer.view.filter, customers, pagination); }());
	});
};

Customer.controller.show = async (id) => {
	let customer = await API.response(Customer.show, id);

	document.getElementById("customer-show-box").style.display = "";
	Customer.view.show(customer, "customer-show-info-box");
};

Customer.controller.edit = async (id) => {
	let customer = await API.response(Customer.findById, id);
	if(!customer){ return false };

	if(customer.person_type == "legal-entity"){
		document.getElementById("customer-type-legal-entity-radio").checked = true;
		document.getElementById("customer-type-natural-person-radio").checked = false;
		document.getElementById("legal-entity-form").style.display = "";
	    document.getElementById("customer-create-form").elements.namedItem("person-type").value = "legal-entity";

	} else if(customer.person_type == "natural-person"){
		document.getElementById("customer-type-legal-entity-radio").checked = false;
		document.getElementById("customer-type-natural-person-radio").checked = true;
		document.getElementById("legal-entity-form").style.display = "none";
	    document.getElementById("customer-create-form").elements.namedItem("person-type").value = "natural-person";
	};

	Customer.controller.create.elements.namedItem("id").value = customer.id;
	Customer.controller.create.elements.namedItem("name").value = customer.name;
	Customer.controller.create.elements.namedItem("cpf").value = customer.cpf;
	Customer.controller.create.elements.namedItem("trademark").value = customer.trademark;
	Customer.controller.create.elements.namedItem("brand").value = customer.brand;
	Customer.controller.create.elements.namedItem("cnpj").value = customer.cnpj;
	Customer.controller.create.elements.namedItem("ie").value = customer.ie;
	Customer.controller.create.elements.namedItem("email").value = customer.email;
	Customer.controller.create.elements.namedItem("phone").value = customer.phone;
	Customer.controller.create.elements.namedItem("cellphone").value = customer.cellphone;
	Customer.controller.create.elements.namedItem("social-media").value = customer.social_media;
};

Customer.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o cliente?');
	if(r){
		if(!await API.response(Customer.delete, id)){ return false };
		
		Customer.controller.filter.submit.click();
		document.getElementById("customer-show-box").style.display = "none";
	};
};