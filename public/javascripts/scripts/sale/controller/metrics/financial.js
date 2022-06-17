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
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value) + lib.timestampDay(),
			status: event.target.elements.namedItem("status").value,
			user_id: event.target.elements.namedItem("user-id").value
		};

		let sales = await API.response(Sale.financial.filter, sale);

		lib.display("sale-filter-box", "");
		lib.display("sale-show-box", "none");

		let days = (parseInt(sale.periodEnd) - parseInt(sale.periodStart)) / lib.timestampDay();

		Sale.view.metrics(sales, days);

		const setup = { pageSize: 10, page: 0 };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); }());
	});
};

Sale.controller.show = async (sale_id) => {
	let sale = await API.response(Sale.findById, sale_id);

	Sale.view.show(sale);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "";
};