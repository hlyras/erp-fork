Sale.controller = {};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", async event => {
		let customer = lib.splitSelectTextBy(document.getElementById("sale-customer-select"), " | ");
		
		let sale = {
			id: "",
			sale_date: document.getElementById("sale-date").value,
			estimated_shipping_date: document.getElementById("estimated-shipping-date").value,
			payment_method: document.getElementById("payment-method").value,
			status: document.getElementById("status").value,
			customer_id: customer.select.value,
			customer_name: customer[0],
			customer_cnpj: customer[1],
			products: JSON.stringify(Sale.kart),
			value: 0
		};

		sale = await Sale.save(sale);

		console.log(sale);
		
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
		// console.log(document.getElementById("").elements.namedItem("").value);
	});
};

// Production.controller = {};

// Production.controller.simulate = document.getElementById("production-simulation-form");
// if(Production.controller.simulate){ 
// 	Production.controller.simulate.addEventListener("submit", async (event) => {
// 		event.preventDefault();
// 		document.getElementById('ajax-loader').style.visibility = 'visible';

// 		Production.controller.simulate.elements.namedItem("submit").disabled = true;

// 		if(!Production.product.kart.length){
// 			alert("É necessário selecionar algum produto para simular o gasto.");
// 			document.getElementById('ajax-loader').style.visibility = 'hidden';
// 			return Production.controller.simulate.elements.namedItem("submit").disabled = false;
// 		};

// 		let production = await Production.simulate(Production.product.kart);

// 		production.feedstocks.sort((a, b) => {
// 		  return a.code - b.code;
// 		});

// 		Production.view.simulation(production.feedstocks);

// 		Production.controller.simulate.elements.namedItem("submit").disabled = false;
// 		document.getElementById('ajax-loader').style.visibility = 'hidden';
// 	});
// };