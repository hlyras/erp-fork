Sale.recept.controller = {};

Sale.recept.serviceOrder = {};
Sale.recept.serviceOrder.sales = [];
Sale.recept.serviceOrder.orders = [];

Sale.recept.controller.filter = document.getElementById("service-order-filter-form");
if(Sale.recept.controller.filter) {
	Sale.recept.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let service_order = {
			id: e.target.elements.namedItem("id").value,
			status: "Em transporte",
			periodStart: lib.dateToTimestamp(e.target.elements.namedItem("period-start").value),
			periodEnd: lib.dateToTimestamp(e.target.elements.namedItem("period-end").value) + lib.timestampDay()
		};

		let service_orders = await API.response(Sale.serviceOrder.filter, service_order);
		if(!service_orders){ return false; }

		lib.display("service-order-detail-box", "none");
		lib.display("service-order-filter-box", "");

		Sale.recept.view.filter(service_orders);
	});
}

Sale.recept.controller.filter.submit.click();

Sale.recept.controller.checkin = (sale_id, input) => {
	let sale = Sale.recept.serviceOrder.orders.filter(order => order.sale_id == sale_id);

	if(sale[0]) {
		for(let i in Sale.recept.serviceOrder.orders){
			sale[0].sale_id == Sale.recept.serviceOrder.orders[i].sale_id && Sale.recept.serviceOrder.orders.splice(i, 1);
		};
		input.innerHTML = "";
		return;
	}

	sale = Sale.recept.serviceOrder.sales.filter(order => order.sale_id == sale_id);
	Sale.recept.serviceOrder.orders.push(sale[0]);

	input.innerHTML = "";
	input.append(lib.element.create("div", { class: "mobile-box b1 lucida-grande em13 bold center" }, 'V'))
};

Sale.recept.serviceOrder.show = async service_order_id => {
	let service_order = await API.response(Sale.serviceOrder.findById, service_order_id);
	if(!service_order) { return false }

	Sale.recept.serviceOrder.sales = service_order.sales;

	lib.display("service-order-filter-box", "none");
	lib.display("service-order-detail-box", "");

	Sale.recept.view.show(service_order);
};

Sale.recept.serviceOrder.confirm = async (service_order_id) => {
	if(!confirm("Deseja confirmar o recebimento?")){ return false; };

	let serviceOrder = {
		id: service_order_id,
		orders: Sale.recept.serviceOrder.orders
	};

	if(Sale.recept.serviceOrder.orders.length < Sale.recept.serviceOrder.sales.length) {
		if(confirm('Alguns pedidos não estão sendo confirmados, deseja prosseguir?')) {
			let response = await API.response(Sale.serviceOrder.recept.confirm, serviceOrder);
			if(!response) { return false }
		} else {
			return false;
		}
	}

	let response = await API.response(Sale.serviceOrder.recept.confirm, serviceOrder);
	if(!response) { return false; }

	Sale.recept.controller.filter.submit.click();
};

Sale.recept.serviceOrder.cancel = async (service_order_id) => {
	if(!confirm("Deseja cancelar o recebimento?")){ return false; };

	let response = await API.response(Sale.serviceOrder.recept.cancel, service_order_id);
	if(!response) { return false }

	Sale.recept.controller.filter.submit.click();
};