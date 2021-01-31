Customer.controller = {};

Customer.controller.filter = {
	input: async (input, dropdown_id) => {
		event.preventDefault();

		let customer = {
			name: input.value,
			trademark: input.value,
			brand: input.value,
			cnpj: input.value
		};

		if(customer.name.length > 2){
			let customers = await Customer.filter(customer);
			if(!customers){ return false; };

			Sale.view.customer.dropdown.render(customers, input.id, dropdown_id);
		} else {
			Sale.view.customer.dropdown.render([], input.id, dropdown_id);
		};
	}
};