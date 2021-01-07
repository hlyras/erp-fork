Customer.controller.adress = {};

Customer.controller.adress.create = document.getElementById("customer-adress-create-form");
if(Customer.controller.adress.create){
	Customer.controller.adress.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer_adress = {
			id: event.target.elements.namedItem("id").value,
			customer_id: event.target.elements.namedItem("customer_id").value,
			postal_code: event.target.elements.namedItem("postal_code").value,
			street: event.target.elements.namedItem("street").value,
			number: event.target.elements.namedItem("number").value,
			complement: event.target.elements.namedItem("complement").value,
			neighborhood: event.target.elements.namedItem("neighborhood").value,
			city: event.target.elements.namedItem("city").value,
			state: event.target.elements.namedItem("state").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		customer_adress = await Customer.adress.save(customer_adress);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!customer_adress){ return false; };

		Customer.controller.show(customer_adress.customer_id);

		Customer.controller.adress.create.elements.namedItem("id").value = "";
		Customer.controller.adress.create.elements.namedItem("customer_id").value = "";
		Customer.controller.adress.create.elements.namedItem("postal_code").value = "";
		Customer.controller.adress.create.elements.namedItem("street").value = "";
		Customer.controller.adress.create.elements.namedItem("number").value = "";
		Customer.controller.adress.create.elements.namedItem("complement").value = "";
		Customer.controller.adress.create.elements.namedItem("neighborhood").value = "";
		Customer.controller.adress.create.elements.namedItem("city").value = "";
		Customer.controller.adress.create.elements.namedItem("state").value = "";
	});
};

Customer.controller.adress.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let customer_adress = await Customer.adress.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!await customer_adress){ return false; };

	if(document.getElementById("customer-adress-create-form").style.display == 'none'){
		document.getElementById("customer-adress-create-form-hider").click();
	};

	Customer.controller.adress.create.elements.namedItem("id").value = customer_adress.id;
	Customer.controller.adress.create.elements.namedItem("customer_id").value = customer_adress.customer_id;
	Customer.controller.adress.create.elements.namedItem("postal_code").value = customer_adress.postal_code;
	Customer.controller.adress.create.elements.namedItem("street").value = customer_adress.street;
	Customer.controller.adress.create.elements.namedItem("number").value = customer_adress.number;
	Customer.controller.adress.create.elements.namedItem("complement").value = customer_adress.complement;
	Customer.controller.adress.create.elements.namedItem("neighborhood").value = customer_adress.neighborhood;
	Customer.controller.adress.create.elements.namedItem("city").value = customer_adress.city;
	Customer.controller.adress.create.elements.namedItem("state").value = customer_adress.state;
};

Customer.controller.adress.delete = async (id, customer_id) => {
	let r = confirm('Deseja realmente excluir o endereço?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Customer.adress.delete(id)){ return false; };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Customer.controller.show(customer_id);
		document.getElementById("customer-show-box").style.display = "none";
	};
};