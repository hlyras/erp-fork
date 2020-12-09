Customer.controller = {};

Customer.controller.filter = document.getElementById("customer-filter-form");
if(Customer.controller.filter){
	Customer.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let customer = {
			 cnpj: event.target.elements.namedItem("cnpj").value,
			 name: event.target.elements.namedItem("name").value
		};
		
		document.getElementById("ajax-loader").style.visibility = "visible";
		let customers = await Customer.filter(customer);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!customers){ return false; };

		Sale.view.customer.fillInput(customers);
	});
};