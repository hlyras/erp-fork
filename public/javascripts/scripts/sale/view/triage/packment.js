Sale.view = {};

Sale.view.filter = (sales, setup) => {
	let filter_div = document.getElementById("sale-filter-div");
	filter_div.innerHTML = "";

	sales = lib.sort(sales, "estimated_shipment_date", "asc");

	for (let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++) {
		let sale_div = lib.element.create("div", {
			class: "box b2 container ground border box-hover transition-01-01 padding-5 margin-top-5 noselect radius-5"
		});

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b6 lucida-grande em09 input-show border-st bold nowrap center pointer",
			onclick: `Sale.controller.show(${sales[i].id})`
		}, sales[i].id));

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b3-4 lucida-grande em09 padding-2 bold center",
		}, sales[i].customer_name));

		sales[i].status == 'Em negociação' && sale_div.append(lib.element.icon('b12', 20,
			"https://spaces.jariomilitar.com/erp-images/icon/edit.png",
			`Sale.controller.edit(${sales[i].id})`
		));

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande em09 bold padding-2 center",
		}, sales[i].shipment_method));

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande em09 bold padding-2 center",
		}, `${(sales[i].weight / 1000).toFixed(1)}kg`));

		sales[i].estimated_shipment_date < lib.genTimestamp() && sale_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande em09 bold padding-2 center",
			style: "color:red",
		}, lib.timestampToDate(sales[i].estimated_shipment_date)));

		sales[i].estimated_shipment_date >= lib.genTimestamp() && sale_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande em09 bold padding-2 center",
		}, lib.timestampToDate(sales[i].estimated_shipment_date)));

		filter_div.append(sale_div);
	};
};

Sale.view.show = (sale) => {
	document.getElementById("packment-confirm-form").elements.namedItem("sale-id").value = sale.id;
	sale.status == "Ag. embalo" && lib.display("packment-confirm-form", "");

	let show_box = document.getElementById("sale-show-box");
	show_box.innerHTML = "";

	show_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, `Dados da venda #${sale.id}`));

	let customer_info = lib.element.create("div", { class: "box b2 container ground padding-5 margin-top-5" });
	customer_info.append(lib.element.create("div", { class: "box b1 lucida-grande bold em09 underline center" }, "Cliente"));
	customer_info.append(lib.element.createInfo("b1 lucida-grande em09 padding-5", "Nome do cliente", `${sale.customer.name}`));
	sale.customer.trademark && customer_info.append(lib.element.createInfo("b1 lucida-grande em09 padding-5", "Razão social", `${sale.customer.trademark}`));
	show_box.append(customer_info);

	let sale_info = lib.element.create("div", { class: "box b2 container ground padding-5 margin-top-5" });
	sale_info.append(lib.element.create("div", { class: "box b1 lucida-grande bold em09 underline center" }, "Informações do pedido"));
	sale_info.append(lib.element.createInfo("mobile-box b2 lucida-grande em09 padding-5", "Vendedor", `${sale.user_name}`));
	sale_info.append(lib.element.createInfo("mobile-box b2 em09 padding-5", "Status", `${sale.status}`));
	sale_info.append(lib.element.createInfo("mobile-box b2 em09 padding-5", "Método de envio", `${sale.shipment_method}`));
	sale.estimated_shipment_date && sale_info.append(lib.element.createInfo("mobile-box b2 em09 padding-5", "Prazo de embalo", `${lib.timestampToDate(sale.estimated_shipment_date)}`));
	show_box.append(sale_info);

	show_box.append(lib.element.createInfo("mobile-box b1 bold border padding-5", "Observações", sale.obs));

	let product_section = lib.element.create("div", { class: "box b1 container margin-top-5" });

	let product_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	product_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Produtos"));
	for (let i in sale.products) {
		let product_div = lib.element.create("div", { class: "box b1 container ground box-hover border-explicit padding-10 margin-top-5" });
		product_div.append(lib.element.create("div", { class: "mobile-box b3-4 em09 v-center" }, sale.products[i].product_info));
		product_div.append(lib.element.create("div", { class: "mobile-box b4 lucida-grande center bold", style: "color:#060;" }, sale.products[i].amount + "un"));
		// product_div.append(lib.element.create("div", { class: "mobile-box b7 em09 center" }, "R$"+sale.products[i].price));
		// product_div.append(lib.element.create("div", { class: "mobile-box b7 em09 center" }, "R$"+(sale.products[i].amount * sale.products[i].price).toFixed(2) ));
		product_box.append(product_div);
	};
	product_section.append(product_box);

	let package_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	package_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Pacotes"));

	for (let i in sale.packages) {
		let package_div = lib.element.create("div", { class: "box b1 container ground border-explicit padding-10 margin-top-5" });
		let package_info = lib.element.create("div", { class: "box b1 container" });

		package_info.append(lib.element.create("div", {
			class: "mobile-box b8 center border-st pointer",
			onclick: "lib.displayDiv('package-" + sale.packages[i].package_id + "', this)"
		}, `P${sale.packages[i].package_id}`));

		package_info.append(lib.element.create("div", { class: "mobile-box b2 em09 center v-center" }, sale.packages[i].info));
		package_info.append(lib.element.create("div", { class: "mobile-box b3-8 center" }, sale.packages[i].setup));
		package_info.append(lib.element.create("div", { class: "mobile-box b3 lucida-grande center bold" }, sale.packages[i].amount + "un"));
		package_div.append(package_info);

		let package_product_box = lib.element.create("div", {
			id: "package-" + sale.packages[i].package_id,
			class: "box b1 container",
			style: "display:none;"
		});

		for (let j in sale.packages[i].products) {
			let package_product_div = lib.element.create("div", { class: "box b1 container border box-hover padding-5 margin-top-5 box-hover" });
			package_product_div.append(lib.element.create("div", { class: "mobile-box b5 lucida-grande center bold", style: "color:#060;" }, sale.packages[i].products[j].amount + "un"));
			package_product_div.append(lib.element.create("div", { class: "mobile-box b4-5 em09 v-center" }, sale.packages[i].products[j].product_info));
			package_product_box.append(package_product_div);
		};

		package_div.append(package_product_box);
		package_box.append(package_div);
	};

	product_section.append(package_box);
	show_box.append(product_section);
};