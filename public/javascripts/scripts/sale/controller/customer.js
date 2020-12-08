Customer.controller = {};

Customer.controller.filter = document.getElementById("customer-filter-form");
if(Customer.controller.filter){
	Customer.controller.filter.addEventListener("submit", event => {
		event.preventDefault();

		console.log(event);
	});
};