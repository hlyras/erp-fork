Customer.controller.address = {};

Customer.controller.address.create = document.getElementById("customer-address-create-form");
if (Customer.controller.address.create) {
	Customer.controller.address.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer_address = {
			id: lib.sanitize(event.target.id.value) || null,
			customer_id: lib.sanitize(event.target.customer_id.value) || null,
			postal_code: lib.sanitize(event.target.postal_code.value) || null,
			street: lib.sanitize(event.target.street.value) || null,
			number: lib.sanitize(event.target.number.value) || null,
			complement: lib.sanitize(event.target.complement.value) || null,
			neighborhood: lib.sanitize(event.target.neighborhood.value) || null,
			city: lib.sanitize(event.target.city.value) || null,
			state: lib.sanitize(event.target.state.value) || null
		};

		customer_address = await API.response(Customer.address.save, customer_address);
		if (!customer_address) { return false; };

		Customer.controller.show(customer_address.customer_id);

		e.target.id.value = "";
		e.target.customer_id.value = "";
		e.target.postal_code.value = "";
		e.target.street.value = "";
		e.target.number.value = "";
		e.target.complement.value = "";
		e.target.neighborhood.value = "";
		e.target.city.value = "";
		e.target.state.value = "";
	});
};

Customer.controller.address.edit = async (id) => {
	let customer_address = await API.response(Customer.address.findById, id);
	if (!await customer_address) { return false; };

	if (document.getElementById("customer-address-create-form").style.display == 'none') {
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
	if (r) {
		if (!await API.response(Customer.address.delete, id)) { return false; };

		Customer.controller.show(customer_id);
		document.getElementById("customer-show-box").style.display = "none";
	};
};