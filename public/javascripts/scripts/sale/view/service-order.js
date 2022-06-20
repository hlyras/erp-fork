Sale.serviceOrder.view = {};

Sale.serviceOrder.view.filter = (service_orders) =>{
	let filter_div = document.getElementById("service-order-filter-div");
	filter_div.innerHTML = "";

	for(let i in service_orders) {
		let service_order_div = lib.element.create("div", { class: "box b2 container ground border-st radius-5 box-hover margin-top-5 padding-5" });
		service_order_div.append(lib.element.create("div", { 
			class: "mobile-box b10 lucida-grande bold border-st input-show center pointer noselect",
			onclick: `Sale.serviceOrder.controller.detail(${service_orders[i].id})` 
		}, service_orders[i].id));
		service_order_div.append(lib.element.create("div", { class: "mobile-box b5 lucida-grande em09 center" }, lib.timestampToDate(service_orders[i].datetime)));
		service_order_div.append(lib.element.create("div", { class: "mobile-box b3-10 lucida-grande bold em09 center" }, service_orders[i].method));
		service_order_div.append(lib.element.create("div", { class: "mobile-box b5 lucida-grande em09 center" }, service_orders[i].status));
		service_orders[i].size == 1 && service_order_div.append(lib.element.create("div", { class: "mobile-box b5 lucida-grande em09 center" }, `${service_orders[i].size} pedido`));
		service_orders[i].size > 1 && service_order_div.append(lib.element.create("div", { class: "mobile-box b5 lucida-grande em09 center" }, `${service_orders[i].size} pedidos`));
		
		filter_div.append(service_order_div);
	};
};

Sale.serviceOrder.view.detail = (service_order) => {
	let show_div = document.getElementById("service-order-detail-box");
	show_div.innerHTML = "";

	let service_order_div = lib.element.create("div", { class: "box b2 container ground padding-5 margin-top-10 margin-bottom-20 radius-5 border" });

	let service_order_info = lib.element.create("div", { class: "box b1 container ground padding-5" });
	service_order_info.append(lib.element.create("div", { class: "mobile-box b1 lucida-grande bold underline center" }, `Informações da O.S`));
	service_order_info.append(lib.element.createInfo("mobile-box b6 padding-5 margin-top-5", "Nº da O.S.", `${service_order.id}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b3 padding-5 margin-top-5", "Data", `${lib.convertDatetime(lib.timestampToDatetime(service_order.datetime))}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b3 padding-5 margin-top-5", "Status", `${service_order.status}` ));
	service_order.method != "Retirada em Loja" && service_order_info.append(lib.element.create("img", {
		src: "/images/icon/print.png",
		class: "image-prop size-30 center icon",
		onclick: `lib.openExternalLink('${window.location.origin}/sale/service-order/shipment/print/${service_order.id}')`
		// onclick: `openPrintWindow('/sale/service-order/shipment/print/${service_order.id}', 'to_print', 'width=700,height=400,_blank');`
	}));
	service_order_info.append(lib.element.createInfo("mobile-box b2-5 padding-5 margin-top-5", "Método", `${service_order.method}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b2-5 padding-5 margin-top-5", "Criado por", `${service_order.user_name}` ));
	service_order_info.append(lib.element.createInfo("mobile-box b5 padding-5 margin-top-5", "Pedidos", `${service_order.size}` ));
	service_order.collect_user && service_order_info.append(lib.element.createInfo("mobile-box b2 padding-5 margin-top-5", "coletado por", `${service_order.collect_user.name}` ));
	service_order.recept_user && service_order_info.append(lib.element.createInfo("mobile-box b2 padding-5 margin-top-5", "recebido por", `${service_order.recept_user.name}` ));
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

	show_div.append(service_order_div);
};