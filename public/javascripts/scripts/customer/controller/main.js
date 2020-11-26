Customer.controller = {};

Customer.controller.create = document.getElementById("customer-create-form");
if(Customer.controller.create){
	Customer.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer = {
			name: event.target.elements.namedItem("name").value,
			trademark: event.target.elements.namedItem("trademark").value,
			cnpj: event.target.elements.namedItem("cnpj").value,
			email: event.target.elements.namedItem("email").value,
			phone: event.target.elements.namedItem("phone").value
		};

		customer = await Customer.save(customer);

		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("trademark").value = "";
		event.target.elements.namedItem("cnpj").value = "";
		event.target.elements.namedItem("email").value = "";
		event.target.elements.namedItem("phone").value = "";
	});
};