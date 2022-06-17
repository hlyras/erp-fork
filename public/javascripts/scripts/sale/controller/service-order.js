Sale.serviceOrder.controller = {};

Sale.serviceOrder.controller.filter = document.getElementById("service-order-filter-form");
if(Sale.serviceOrder.controller.filter) {
	Sale.serviceOrder.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let service_order = {
			id: e.target.elements.namedItem("id").value,
			method: e.target.elements.namedItem("method").value,
			status: e.target.elements.namedItem("status").value,
			periodStart: lib.dateToTimestamp(e.target.elements.namedItem("period-start").value),
			periodEnd: lib.dateToTimestamp(e.target.elements.namedItem("period-end").value) + lib.timestampDay()
		};

		let service_orders = await API.response(Sale.serviceOrder.filter, service_order);
		if(!service_orders){ return false; }

		lib.display("service-order-detail-box", "none");
		lib.display("service-order-filter-box", "");

		Sale.serviceOrder.view.filter(service_orders);
	});
}

Sale.serviceOrder.controller.detail = async (service_order_id) => {
	let service_order = await API.response(Sale.serviceOrder.findById, service_order_id);
	if(!service_order) { return false }

	lib.display("service-order-filter-box", "none");
	lib.display("service-order-detail-box", "");

	Sale.serviceOrder.view.detail(service_order);
};