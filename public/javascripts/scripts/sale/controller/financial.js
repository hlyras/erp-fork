Sale.controller = {};

Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value
		};
		
		let sales = await API.response(Sale.filter, sale);

		document.getElementById("sale-filter-box").style.display = "";
		document.getElementById("sale-show-box").style.display = "none";
		if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };

		const setup = { pageSize: 10, page: 0, status: sale.status };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); }());
	});
};

Sale.controller.show = async (sale_id, status) => {
	let sale = await API.response(Sale.findById, sale_id);
	
	Sale.view.show(sale, status);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "";
	if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };
};

Sale.controller.confirmPayment = async sale_id => {
	let r = confirm("Deseja realmente confirmar o pagamento?");
	if(r){
		let response = await API.response(Sale.confirmPayment, sale_id);
		if(!response){ return false; };
		
		alert(response);
		Sale.controller.filter.submit.click();
	};
};