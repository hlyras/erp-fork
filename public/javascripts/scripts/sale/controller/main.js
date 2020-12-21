Sale.controller = {};

Sale.controller.save = document.getElementById("sale-create-submit");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("click", async event => {
		let customer = lib.splitSelectTextBy(document.getElementById("sale-customer"), " | ");
		if(!customer){ return alert("Ocorreu um erro ao coletar informações do cliente"); };

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

		// use loader
		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		// document.getElementById("").elements.namedItem("").value = "";
		document.getElementById("sale-id").value = "";
		document.getElementById("sale-customer").value = "";
		document.getElementById("sale-date").value = "";
		document.getElementById("estimated-shipping-date").value = "";
		document.getElementById("payment-method").value = "";
		document.getElementById("status").value = "";
		Sale.kart = [];
		Sale.product.view.kart.list(Sale.kart);
		
		let stringified_kart = JSON.stringify(Sale.kart);
		lib.localStorage.update("sale-kart", stringified_kart);

		let r = confirm("Deseja ir para a venda criada?\n código: #"+sale.id+"\n data: "+lib.convertDate(sale.sale_date)+"\n previsão de envio: "+lib.convertDate(sale.estimated_shipping_date)+"\n cliente: "+sale.customer_name+"\n Método de pagamento: "+sale.payment_method+"\n status: "+sale.status+"\n Valor: "+sale.value);
		if(r){ console.log("redireciona para venda #"+sale.id) };
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