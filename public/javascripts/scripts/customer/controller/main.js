Customer.controller = {};

Customer.controller.create = document.getElementById("customer-create-form");
if(Customer.controller.create){
	Customer.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let customer = {
			name: event.target.elements.namedItem("name").value,
			trademark: event.target.elements.namedItem("trademark").value,
			brand: event.target.elements.namedItem("brand").value,
			cnpj: event.target.elements.namedItem("cnpj").value,
			email: event.target.elements.namedItem("email").value,
			phone: event.target.elements.namedItem("phone").value,
			cellphone: event.target.elements.namedItem("cellphone").value
		};

		customer = await Customer.save(customer);
		if(!customer) { return false };

		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("trademark").value = "";
		event.target.elements.namedItem("brand").value = "";
		event.target.elements.namedItem("cnpj").value = "";
		event.target.elements.namedItem("email").value = "";
		event.target.elements.namedItem("phone").value = "";
		event.target.elements.namedItem("cellphone").value = "";
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