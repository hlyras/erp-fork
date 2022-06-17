Sale.collect.controller = {};

Sale.collect.controller.filter = document.getElementById("service-order-filter-form");
if(Sale.collect.controller.filter) {
	Sale.collect.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let service_order = {
			id: e.target.elements.namedItem("id").value,
			status: "Ag. coleta",
			periodStart: lib.dateToTimestamp(e.target.elements.namedItem("period-start").value),
			periodEnd: lib.dateToTimestamp(e.target.elements.namedItem("period-end").value) + lib.timestampDay()
		};

		let service_orders = await API.response(Sale.serviceOrder.filter, service_order);
		if(!service_orders){ return false; }

		lib.display("service-order-detail-box", "none");
		lib.display("service-order-filter-box", "");

		Sale.collect.view.filter(service_orders);
	});
}

Sale.collect.controller.filter.submit.click();

Sale.collect.controller.show = async service_order_id => {
	let service_order = await API.response(Sale.serviceOrder.findById, service_order_id);
	if(!service_order) { return false }

	lib.display("service-order-filter-box", "none");
	lib.display("service-order-detail-box", "");

	Sale.collect.view.show(service_order);
};

Sale.collect.controller.confirm = async (service_order_id) => {
	if(!confirm("Deseja confirmar a coleta?")){ return false; };

	let response = await API.response(Sale.serviceOrder.collect.confirm, service_order_id);
	if(!response) { return false }

	Sale.collect.controller.filter.submit.click();
};

Sale.collect.controller.cancel = async (service_order_id) => {
	if(!confirm("Deseja cancelar a coleta?")){ return false; };

	let response = await API.response(Sale.serviceOrder.collect.cancel, service_order_id);
	if(!response) { return false }

	Sale.collect.controller.filter.submit.click();
};