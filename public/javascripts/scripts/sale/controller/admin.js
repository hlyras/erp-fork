Sale.controller = {};

Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			id: event.target.elements.namedItem("id").value,
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			customer_cpf: event.target.elements.namedItem("customer_cpf").value,
			shipment_method: event.target.elements.namedItem("shipment_method").value,
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value,
			user_id: event.target.elements.namedItem("user-id").value
		};

		let sales = await API.response(Sale.filter, sale);

		lib.display("sale-filter-box", "");
		lib.display("sale-show-box", "none");

		const setup = { pageSize: 10, page: 0 };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); }());
	});
};

Sale.controller.filterBy = (status) => {
	Sale.controller.filter.status.value = status;
	Sale.controller.filter.code = "";
	Sale.controller.filter.customer_name.value = "";
	Sale.controller.filter.customer_cnpj.value = "";
	Sale.controller.filter.customer_cpf.value = "";
	Sale.controller.filter.shipment_method.value = "";
	Sale.controller.filter.periodStart.value = "";
	Sale.controller.filter.periodEnd.value = "";
	Sale.controller.filter.submit.click();
};

Sale.controller.show = async (sale_id) => {
	let sale = await API.response(Sale.findById, sale_id);

	Sale.view.show(sale);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "";
};

Sale.controller.cancel = async sale_id => {
	let r = confirm("Deseja cancelar a venda?");
	if(r){
		let response = await API.response(Sale.cancel, sale_id);
		if(!response){ return false; };

		alert(response);
		Sale.controller.filter.submit.click();
	};
};