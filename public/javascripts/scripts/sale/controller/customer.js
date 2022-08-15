Sale.customer.controller = {};

Sale.customer.controller.filter = {
	input: async (input, dropdown_id) => {
		event.preventDefault();

		let customer = {
			id: "",
			name: "",
			cpf: "",
			cnpj: "",
			brand: "",
			trademark: ""
		};

		if(input.value.length > 0){
			let customers;

			for(let prop in customer) {
				customer[prop] = input.value;
				customers = await Customer.filter(customer);

				if(!customers.length) { customer[prop] = ""; }
				if(customers.length){ break; };
			};
			
			if(!customers){ return false; };

			Sale.view.customer.dropdown.render(customers, input.id, dropdown_id);
		} else {
			Sale.view.customer.dropdown.render([], input.id, dropdown_id);
		};
	}
};