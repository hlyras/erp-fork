Customer.controller.adress = {};

Customer.controller.adress.add = document.getElementById("customer-adress-add-form");
if(Customer.controller.adress.add){
	Customer.controller.adress.add.addEventListener("submit", async event => {
		event.preventDefault();

		let customer_adress = {
			customer_id: event.target.elements.namedItem("customer_id").value,
			postal_code: event.target.elements.namedItem("postal_code").value,
			street: event.target.elements.namedItem("street").value,
			number: event.target.elements.namedItem("number").value,
			complement: event.target.elements.namedItem("complement").value,
			neighborhood: event.target.elements.namedItem("neighborhood").value,
			city: event.target.elements.namedItem("city").value,
			state: event.target.elements.namedItem("state").value
		};

		customer_adress = await Customer.adress.add(customer_adress);

		Customer.controller.show(customer_adress.customer_id);
	});
};