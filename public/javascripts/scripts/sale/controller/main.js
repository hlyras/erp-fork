Sale.controller = {};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", event => {

		// console.log(document.getElementById("customer-filter-form").elements.namedItem("cnpj").value);
		let sale = {
			id: "",
			customer_id: document.getElementById("customer-select").value,
			sale_date: document.getElementById("sale-date").value,
			estimated_shipping_date: document.getElementById("estimated-shipping-date").value,
			payment_method: document.getElementById("payment-method").value,
			sale_status: document.getElementById("sale-status").value
		};

		console.log(sale);
		
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
	});
};