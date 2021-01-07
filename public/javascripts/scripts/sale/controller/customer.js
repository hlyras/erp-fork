Customer.controller = {};

// Customer.controller.filter = document.getElementById("customer-filter-form");
// if(Customer.controller.filter){
// 	Customer.controller.filter.addEventListener("submit", async event => {
// 		event.preventDefault();

// 		let customer = {
// 			 cnpj: event.target.elements.namedItem("cnpj").value,
// 			 name: event.target.elements.namedItem("name").value
// 		};
		
// 		document.getElementById("ajax-loader").style.visibility = "visible";
// 		let customers = await Customer.filter(customer);
// 		document.getElementById("ajax-loader").style.visibility = "hidden";
		
// 		if(!customers){ return false; };
// 		Sale.view.customer.fillInput(customers);
// 	});
// };

Customer.controller.filter = {
	input: async (input) => {
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

			Sale.view.customer.filter.input(customers, "sale-customer-dropdown");
		} else {
			Sale.view.customer.filter.input([], "sale-customer-dropdown");
		};
	},
	inputFill: (input) => {
		document.getElementById("sale-customer").dataset.id = input.dataset.id;
		document.getElementById("sale-customer").value = input.value;
		document.getElementById("sale-customer").readOnly = true;

		document.getElementById("sale-customer-dropdown").innerHTML = "";
	}
};