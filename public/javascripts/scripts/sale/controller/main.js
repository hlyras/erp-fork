Sale.controller = {};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", event => {
		let customer = lib.splitSelectTextBy(document.getElementById("sale-customer-select"), " | ");
		
		let sale = {
			id: "",
			sale_date: document.getElementById("sale-date").value,
			estimated_shipping_date: document.getElementById("estimated-shipping-date").value,
			payment_method: document.getElementById("payment-method").value,
			sale_status: document.getElementById("sale-status").value
			sale.customer_id: customer.select.value,
			sale.customer_name: customer[0],
			sale.customer_cnpj: customer[1],
			sale.value: 0
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