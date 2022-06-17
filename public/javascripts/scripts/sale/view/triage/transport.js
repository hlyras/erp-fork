Sale.transport.view = {};

Sale.transport.view.filter = (sales, box) => {
	let filter_div = document.getElementById(box);
	filter_div.innerHTML = "";

	sales = lib.sort(sales, "id", "asc");

	if(!sales.length) {
		let sale_div = lib.element.create("div", { 
			class: "box b1 lucida-grande bold ground border padding-10 radius-5 center"
		}, "Sem pedidos");
		
		filter_div.append(sale_div);
	}

	for(let i in sales) {
		let sale_div = lib.element.create("div", { 
			class: "box b2 container ground border box-hover transition-01-01 padding-5 margin-top-5 noselect radius-5"
		});

		let info_div = lib.element.create("div", { 
			class: "mobile-box b8-9 container"
		});

		info_div.append(lib.element.create("div", {
			class: "mobile-box b6 lucida-grande em09 bold nowrap center"
		}, sales[i].id));

		info_div.append(lib.element.create("div", {
			class: "mobile-box b5-6 lucida-grande em09 padding-2 bold center",
		}, sales[i].customer_name));

		info_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande em09 bold padding-2 center",
		}, sales[i].shipment_method));

		sales[i].estimated_shipment_date < lib.genTimestamp() && info_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em09 bold padding-2 center",
			style: "color:red;",
		}, lib.timestampToDate(sales[i].estimated_shipment_date)));

		sales[i].estimated_shipment_date >= lib.genTimestamp() && info_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, sales[i].status));

		info_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em08 padding-2 center",
		}, `Volumes<label class='lucida-grande em12 bold'>: ${sales[i].box_amount}</label>`));

		sale_div.append(info_div);

		box == "sale-filter-div" && sale_div.append(lib.element.create("img", {
			src: "/images/icon/next-arrow-black.png", 
			class: "mobile-box b9 center size-30 icon",
			onclick: `Sale.transport.serviceOrder.add(${sales[i].id})`
		}));

		box == "order-filter-div" && sale_div.append(lib.element.create("img", {
			src: "/images/icon/back-arrow-black.png", 
			class: "mobile-box b9 center size-30 icon",
			onclick: `Sale.transport.serviceOrder.remove(${sales[i].id})`
		}));

		filter_div.append(sale_div);
	};
};

Sale.transport.serviceOrder.render = () => {
	let so_box = document.getElementById("service-order-box");
	so_box.innerHTML = "";

	so_box.append(lib.element.createInfo("mobile-box b3 lucida-grande bold padding-5", "Método de Envio", `${Sale.transport.serviceOrder.method}` ));
	so_box.append(lib.element.createInfo("mobile-box b3 lucida-grande bold padding-5", "Quantidade de pedidos", `${Sale.transport.serviceOrder.orders.length}` ));
	so_box.append(lib.element.create("div", {
		class: "mobile-box b3 lucida-grande bold border-st shadow-hover padding-5 radius-5 center pointer",
		onclick: "Sale.transport.serviceOrder.generate();"
	}, `Gerar O.S.`));

	Sale.transport.view.filter(Sale.transport.serviceOrder.sales, "sale-filter-div");
	Sale.transport.view.filter(Sale.transport.serviceOrder.orders, "order-filter-div");
};