Customer.controller = {};

Customer.controller.create = document.getElementById("customer-create-form");
if(Customer.controller.create){
	Customer.controller.create.addEventListener("submit", event => {
		event.preventDefault();

		let customer = {
			name: event.target.elements.namedItem("name").value,
			trademark: event.target.elements.namedItem("trademark").value,
			cnpj: event.target.elements.namedItem("cnpj").value,
			email: event.target.elements.namedItem("email").value,
			phone: event.target.elements.namedItem("phone").value
		};

		console.log(customer);
	});
};