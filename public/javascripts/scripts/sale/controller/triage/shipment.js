Sale.shipment.controller = {};

Sale.shipment.serviceOrder = {};
Sale.shipment.serviceOrder.method = "";
Sale.shipment.serviceOrder.sales = [];
Sale.shipment.serviceOrder.orders = [];

Sale.shipment.controller.confirm = async sale_id => {
	if (!confirm("Deseja confirmar envio?")) { return false; }

	let response = await API.response(Sale.shipment.confirm, sale_id);
	if (!response) { return false; };

	alert(response);
	Sale.controller.filter.submit.click();
};

Sale.shipment.controller.filter = async (shipment_method) => {
	lib.display("filter-status", "none");

	let sale = {
		shipment_method: document.getElementById("sale-filter-form").elements.namedItem("shipment_method").value,
		status: document.getElementById("sale-filter-form").elements.namedItem("status").value
	};

	let sales = await API.response(Sale.filter, sale);
	if (!sales) { return false; }

	lib.display("service-order", "");
	lib.display("sale-filter-box", "");

	Sale.shipment.serviceOrder.method = shipment_method;

	for (let i in sales) {
		shipment_method == "Correios"
			&& (sales[i].shipment_method == "Correios Pac" || sales[i].shipment_method == "Correios sedex") && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Jadlog" && sales[i].shipment_method == "Jadlog" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Total Express" && sales[i].shipment_method == "Total Express" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Braspress" && sales[i].shipment_method == "Braspress" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Latam" && sales[i].shipment_method == "Latam" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Azul Cargo" && sales[i].shipment_method == "Azul Cargo" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Buslog" && sales[i].shipment_method == "Buslog" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Fedex" && sales[i].shipment_method == "Fedex" && Sale.shipment.serviceOrder.sales.push(sales[i]);
		shipment_method == "Hawk Transportes" && sales[i].shipment_method == "Hawk Transportes" && Sale.shipment.serviceOrder.sales.push(sales[i]);
	};

	Sale.shipment.serviceOrder.render();
};

Sale.shipment.controller.switch = (input) => {
	document.getElementById("order-filter-box").style.display && lib.display("sale-filter-box", "none");
	!document.getElementById("order-filter-box").style.display && lib.display("sale-filter-box", "");
	lib.displayDiv('order-filter-box', input, '/images/icon/down-arrow.png', '/images/icon/close.png');
};

Sale.shipment.serviceOrder.controller = {};

Sale.shipment.serviceOrder.add = (sale_id) => {
	for (let i in Sale.shipment.serviceOrder.sales) {
		Sale.shipment.serviceOrder.sales[i].id == sale_id
			&& Sale.shipment.serviceOrder.orders.push(Sale.shipment.serviceOrder.sales[i])
			&& Sale.shipment.serviceOrder.sales.splice(i, 1)
	};
	Sale.shipment.serviceOrder.render();
};

Sale.shipment.serviceOrder.remove = (order_id) => {
	for (let i in Sale.shipment.serviceOrder.orders) {
		Sale.shipment.serviceOrder.orders[i].id == order_id
			&& Sale.shipment.serviceOrder.sales.push(Sale.shipment.serviceOrder.orders[i])
			&& Sale.shipment.serviceOrder.orders.splice(i, 1)
	};
	Sale.shipment.serviceOrder.render();
};

Sale.shipment.serviceOrder.generate = () => {
	lib.display("service-order", "none");
	lib.display("service-order-detail", "");
	document.getElementById("shipment-detail").innerHTML = Sale.shipment.serviceOrder.method;
	document.getElementById("amount-detail").innerHTML = Sale.shipment.serviceOrder.orders.length;

	Sale.shipment.view.filter(Sale.shipment.serviceOrder.orders, "orders-detail");
};

Sale.shipment.serviceOrder.confirm = async () => {
	if (!confirm("Deseja confirmar a O.S.?")) { return false; }

	let so = {
		shipment_method: Sale.shipment.serviceOrder.method,
		orders: Sale.shipment.serviceOrder.orders
	};

	let service_order = await API.response(Sale.serviceOrder.shipment.save, so);
	if (!service_order) { return false; }

	Sale.shipment.serviceOrder.method = "";
	Sale.shipment.serviceOrder.sales = [];
	Sale.shipment.serviceOrder.orders = [];
	Sale.shipment.serviceOrder.render();

	lib.display("service-order-checkout", "none");
	lib.display("service-order-menu", "");

	document.getElementById("service-order-print-btn").addEventListener("click", e => {
		e.preventDefault();
		lib.openExternalLink(`${window.location.origin}/sale/service-order/shipment/print/${service_order.id}`);
	});
};

Sale.shipment.serviceOrder.close = () => {
	lib.display("service-order", "");
	lib.display('service-order-detail', 'none');
};