Sale.collect.view = {};

Sale.collect.view.filter = (service_orders) => {
	let filter_div = document.getElementById("service-order-filter-div");
	filter_div.innerHTML = "";

	if(!service_orders.length) {
		filter_div.append(lib.element.create("div", { class: "box b1 lucida-grande bold center" }, "Nenhuma ordem de serviço foi encontrada." ));
		return;
	}

	for(let i in service_orders) {
		let service_order_div = lib.element.create("div", { class: "box b2 container ground padding-10 margin-top-5 border radius-5" });
		service_order_div.append(lib.element.create("div", { 
			class: "mobile-box a8 lucida-grande bold input-show border-lg-st center pointer",
			onclick: `Sale.collect.controller.show(${service_orders[i].id})`
		}, service_orders[i].id));
		service_order_div.append(lib.element.create("div", { class: "mobile-box a3-8 lucida-grande em09 bold center" }, service_orders[i].method ));
		service_order_div.append(lib.element.create("div", { class: "mobile-box a4 lucida-grande em09 bold center" }, lib.timestampToDate(service_orders[i].datetime) ));
		service_order_div.append(lib.element.create("div", { class: "mobile-box a4 lucida-grande em09 bold center" }, service_orders[i].status ));
		filter_div.append(service_order_div);
	};
};

Sale.collect.view.show = (service_order) => {
	let show_div = document.getElementById("service-order-detail-box");
	show_div.innerHTML = "";

	let service_order_div = lib.element.create("div", { class: "box b2 container ground padding-5 margin-top-10 radius-5 border" });

	let service_order_info = lib.element.create("div", { class: "box b1 container ground padding-5" });
	service_order_info.append(lib.element.create("div", { class: "mobile-box b1 lucida-grande bold underline center" }, `Informações da O.S`));
	service_order_info.append(lib.element.createInfo("mobile-box b5 padding-5 margin-top-5", "Nº da O.S.", `${service_order.id}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b2-5 padding-5 margin-top-5", "Data", `${lib.timestampToDate(service_order.datetime)}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b2-5 padding-5 margin-top-5", "Status", `${service_order.status}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b2-5 padding-5 margin-top-5", "Método", `${service_order.method}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b2-5 padding-5 margin-top-5", "Criado por", `${service_order.user_name}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b5 padding-5 margin-top-5", "Pedidos", `${service_order.size}` ));
	service_order_div.append(service_order_info);

	let service_order_sales = lib.element.create("div", { class: "box b1 container ground padding-5 margin-top-10" });
	service_order_sales.append(lib.element.create("div", { class: "mobile-box b1 lucida-grande bold underline center" }, `Pedidos`));

	let service_order_sales_header = lib.element.create("div", { class: "box b1 container padding-5" });
	service_order_sales_header.append(lib.element.create("div", { class: "mobile-box lucida-grande em08 bold b8 margin-top-5 center" }, "Código"));
	service_order_sales_header.append(lib.element.create("div", { class: "mobile-box lucida-grande em08 bold b3-4 margin-top-5 center" }, "Cliente"));
	service_order_sales_header.append(lib.element.create("div", { class: "mobile-box lucida-grande em08 bold b8 margin-top-5 center" }, "Volumes"));
	service_order_sales.append(service_order_sales_header);

	for(let i in service_order.sales) {
		let service_order_sale = lib.element.create("div", { class: "box b1 container border box-hover padding-10 margin-top-5" });
		service_order_sale.append(lib.element.create("div", { class: "mobile-box b8 lucida-grande bold center" }, `${service_order.sales[i].sale_id}`));
		service_order.sales[i].customer_name && service_order_sale.append(lib.element.create("div", { class: "mobile-box b3-4 lucida-grande bold center" }, `${service_order.sales[i].customer_name}`));
		!service_order.sales[i].customer_name && service_order.sales[i].customer_trademark && service_order_sale.append(lib.element.create("div", { class: "mobile-box b3-4 lucida-grande bold center" }, `${service_order.sales[i].customer_trademark}`));
		service_order_sale.append(lib.element.create("div", { class: "mobile-box b8 lucida-grande bold center" }, `${service_order.sales[i].box_amount}`));
		service_order_sales.append(service_order_sale);
	};
	service_order_div.append(service_order_sales);
	
	service_order_div.append(lib.element.create("input", {
		type: "button",
		onclick: `Sale.collect.controller.confirm(${service_order.id})`,
		class: "mobile-box b2 lucida-grande em11 bold border-lg-st radius-5 padding-10 margin-top-10 margin-bottom-10 center pointer",
		style: "background-color: #32CD32",
		value: "Confirmar coleta"
	}));

	service_order_div.append(lib.element.create("input", {
		type: "button",
		onclick: `Sale.collect.controller.cancel(${service_order.id})`,
		class: "mobile-box b2 lucida-grande em11 bold border-lg-st radius-5 padding-10 margin-top-10 margin-bottom-10 center pointer",
		style: "background-color: #cd3232",
		value: "Cancelar coleta"
	}));

	show_div.append(service_order_div);
};