Production.controller = {};

Production.controller.simulate = document.getElementById("production-simulation-form");
if(Production.controller.simulate){ 
	Production.controller.simulate.addEventListener("submit", async (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';

		Production.controller.simulate.elements.namedItem("submit").disabled = true;

		if(!Production.product.kart.length){
			alert("É necessário selecionar algum produto para simular o gasto.");
			document.getElementById('ajax-loader').style.visibility = 'hidden';
			return Production.controller.simulate.elements.namedItem("submit").disabled = false;
		};

		let production = await Production.simulate(Production.product.kart);

		production.feedstocks.sort((a, b) => {
		  return a.code - b.code;
		});

		Production.view.simulation(production.feedstocks);

		Production.controller.simulate.elements.namedItem("submit").disabled = false;
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};