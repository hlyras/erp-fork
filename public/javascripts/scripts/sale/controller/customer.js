Customer.controller = {};

console.log(document.getElementById("Customer-filter-form"));

console.log("customer-filter-form");

Customer.controller.filter = document.getElementById("Customer-filter-form");
console.log(Customer.controller.filter);
if(Customer.controller.filter){
	Customer.controller.filter.addEventListener("submit", event => {
		event.preventDefault();

		console.log(event);
	});
};