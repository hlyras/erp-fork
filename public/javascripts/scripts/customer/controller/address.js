Customer.controller.address = {};

Customer.controller.address.create = document.getElementById("customer-address-create-form");
if(Customer.controller.address.create){
	Customer.controller.address.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer_address = {
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

		customer_address = await API.response(Customer.address.save, customer_address);
		if(!customer_address){ return false; };

		Customer.controller.show(customer_address.customer_id);

		Customer.controller.address.create.elements.namedItem("id").value = "";
		Customer.controller.address.create.elements.namedItem("customer_id").value = "";
		Customer.controller.address.create.elements.namedItem("postal_code").value = "";
		Customer.controller.address.create.elements.namedItem("street").value = "";
		Customer.controller.address.create.elements.namedItem("number").value = "";
		Customer.controller.address.create.elements.namedItem("complement").value = "";
		Customer.controller.address.create.elements.namedItem("neighborhood").value = "";
		Customer.controller.address.create.elements.namedItem("city").value = "";
		Customer.controller.address.create.elements.namedItem("state").value = "";
	});
};

Customer.controller.address.edit = async (id) => {
	let customer_address = await API.response(Customer.address.findById, id);
	if(!await customer_address){ return false; };

	if(document.getElementById("customer-address-create-form").style.display == 'none'){
		document.getElementById("customer-address-create-form-hider").click();
	};

	Customer.controller.address.create.elements.namedItem("id").value = customer_address.id;
	Customer.controller.address.create.elements.namedItem("customer_id").value = customer_address.customer_id;
	Customer.controller.address.create.elements.namedItem("postal_code").value = customer_address.postal_code;
	Customer.controller.address.create.elements.namedItem("street").value = customer_address.street;
	Customer.controller.address.create.elements.namedItem("number").value = customer_address.number;
	Customer.controller.address.create.elements.namedItem("complement").value = customer_address.complement;
	Customer.controller.address.create.elements.namedItem("neighborhood").value = customer_address.neighborhood;
	Customer.controller.address.create.elements.namedItem("city").value = customer_address.city;
	Customer.controller.address.create.elements.namedItem("state").value = customer_address.state;
};

Customer.controller.address.delete = async (id, customer_id) => {
	let r = confirm('Deseja realmente excluir o endereço?');
	if(r){
		if(!await API.response(Customer.address.delete, id)){ return false; };
		
		Customer.controller.show(customer_id);
		document.getElementById("customer-show-box").style.display = "none";
	};
};