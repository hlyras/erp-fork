Sale.transport.controller = {};

Sale.transport.serviceOrder = {};
Sale.transport.serviceOrder.method = "Retirada em Loja";
Sale.transport.serviceOrder.sales = [];
Sale.transport.serviceOrder.orders = [];

Sale.transport.controller.filter = async () => {
	let sale = {
		shipment_method: Sale.transport.serviceOrder.method,
		status: "Ag. envio p/ retirada"
	};

	let sales = await API.response(Sale.filter, sale);
	if(!sales){ return false; }

	Sale.transport.serviceOrder.sales = sales;

	lib.display("service-order", "");
	lib.display("sale-filter-box", "");

	Sale.transport.serviceOrder.render();
};

Sale.transport.controller.filter();

Sale.transport.controller.switch = (input) => {
	document.getElementById("order-filter-box").style.display && lib.display("sale-filter-box", "none");
	!document.getElementById("order-filter-box").style.display && lib.display("sale-filter-box", "");
	lib.displayDiv('order-filter-box', input, '/images/icon/down-arrow.png', '/images/icon/close.png');
};

Sale.transport.serviceOrder.add = (sale_id) => {
	for(let i in Sale.transport.serviceOrder.sales){
		Sale.transport.serviceOrder.sales[i].id == sale_id 
			&& Sale.transport.serviceOrder.orders.push(Sale.transport.serviceOrder.sales[i]) 
			&& Sale.transport.serviceOrder.sales.splice(i, 1)
	};
	Sale.transport.serviceOrder.render();
};

Sale.transport.serviceOrder.remove = (order_id) => {
	for(let i in Sale.transport.serviceOrder.orders){
		Sale.transport.serviceOrder.orders[i].id == order_id 
			&& Sale.transport.serviceOrder.sales.push(Sale.transport.serviceOrder.orders[i]) 
			&& Sale.transport.serviceOrder.orders.splice(i, 1)
	};
	Sale.transport.serviceOrder.render();
};

Sale.transport.serviceOrder.generate = () => {
	lib.display("service-order", "none");
	lib.display("service-order-detail", "");
	document.getElementById("transport-detail").innerHTML = Sale.transport.serviceOrder.method;
	document.getElementById("amount-detail").innerHTML = Sale.transport.serviceOrder.orders.length;

	Sale.transport.view.filter(Sale.transport.serviceOrder.orders, "orders-detail");
};

Sale.transport.serviceOrder.close = () => {
	lib.display("service-order", "");
	lib.display('service-order-detail', 'none');
};

Sale.transport.serviceOrder.confirm = async () => {
	if(!confirm("Deseja confirmar a O.S.?")){ return false; }

	let so = {
		shipment_method: Sale.transport.serviceOrder.method,
		orders: Sale.transport.serviceOrder.orders
	};

	let service_order = await API.response(Sale.serviceOrder.transport.save, so);
	if(!service_order) { return false; }

	Sale.transport.serviceOrder.method = "";
	Sale.transport.serviceOrder.sales = [];
	Sale.transport.serviceOrder.orders = [];
	Sale.transport.serviceOrder.render();

	lib.display("service-order-checkout", "none");
	lib.display("service-order-menu", "");
};