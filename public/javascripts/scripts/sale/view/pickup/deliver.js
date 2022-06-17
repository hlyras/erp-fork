Sale.deliver.view = {};

Sale.deliver.view.filter = (sales) => {
	let filter_div = document.getElementById("sale-filter-div");
	filter_div.innerHTML = "";

	!sales.length && filter_div.append(lib.element.create("div", {
		class: "box b1 lucida-grande bold ground border radius-5 padding-15 noselect center"
	}, "Não há pedidos disponíveis para retirada"));

	for(let i in sales){
		let sale_div = lib.element.create("div", { 
			class: "box b2 container ground border box-hover transition-01-01 padding-5 margin-top-5 noselect radius-5"
		});

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b6 lucida-grande em09 input-show border-st bold nowrap center pointer",
			onclick: `Sale.deliver.controller.detail(${sales[i].id})`
		}, sales[i].id));

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b3-4 lucida-grande em09 padding-2 bold center",
		}, sales[i].customer_name));

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, sales[i].status));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, sales[i].user_name));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, `Volumes: <label class='em11'>${sales[i].box_amount}</label>`));

		filter_div.append(sale_div);
	};
};

Sale.deliver.view.detail = (sale) => {
	let sale_box = document.getElementById("sale-detail-div");
	sale_box.innerHTML = "";

	sale_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold underline margin-top-10 center" }, "Pedido: "+sale.id));

	let customer_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5" });
	customer_div.append(lib.element.create("div", { class: "box b1 lucida-grande em09 bold underline center" }, "Dados do cliente"));
	customer_div.append(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "Nome do cliente", `${sale.customer.name}` ));
	sale.customer.cpf && customer_div.append(lib.element.createInfo("b1 lucida-grande em09 padding-5", "CPF", `${sale.customer.cpf}` ));
	sale.customer.trademark && customer_div.append(lib.element.createInfo("b1 lucida-grande em09 padding-5", "Razão social", `${sale.customer.trademark}` ));
	sale.customer.brand && customer_div.append(lib.element.createInfo("b1 lucida-grande em09 padding-5", "Marca", `${sale.customer.brand}` ));
	sale.customer.cnpj && customer_div.append(lib.element.createInfo("b1 lucida-grande em09 padding-5", "CNPJ", `${sale.customer.cnpj}` ));

	sale_box.append(customer_div);

	let sale_info_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5" });
	sale_info_div.append(lib.element.create("div", { class: "box b1 lucida-grande em09 bold underline center" }, "Informações da venda"));
	sale_info_div.append(lib.element.createInfo("box b1 em09 padding-10", "Vendedor(a)", `${sale.user_name}` ));
	sale_info_div.append(lib.element.createInfo("mobile-box b3-7 lucida-grande em09 padding-10", "Data da venda", `${lib.timestampToDate(sale.sale_date)}` ));
	!sale.nf && sale_info_div.append(lib.element.createInfo("mobile-box b4-7 em09 padding-10", "Status", `${sale.status}` ));
	sale.nf && sale.nf.length < 20 && sale_info_div.append(lib.element.createInfo("mobile-box b4-7 em09 padding-10", "Status", `${sale.status}` ));
	sale.nf && sale.nf.length > 20 && sale_info_div.append(lib.element.createInfo("mobile-box b3-7 em09 padding-10", "Status", `${sale.status}` ));
	sale.nf && sale.nf.length > 20 && sale_info_div.append(lib.element.icon('mobile-box b7', 30, "https://spaces.jariomilitar.com/erp-images/icon/nf-e.png", "lib.openExternalLink('"+sale.nf+"')"));
	
	sale_info_div.append(lib.element.create("div", { class: "box b1 lucida-grande em09 bold margin-top-10 underline center" }, "Logística de envio"));
	sale_info_div.append(lib.element.createInfo("mobile-box b2 em09 padding-10", "Método de envio", `${sale.shipment_method}` ));
	sale.box_amount && sale_info_div.append(lib.element.createInfo("mobile-box b7 lucida-grande em09 padding-10", "Volumes:", `<label class='em11 bold'>${sale.box_amount || ''}</label>` ));
	sale_box.append(sale_info_div);

	let financial_info_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5" });
	financial_info_div.append(lib.element.create("div", { class: "box b1 lucida-grande em09 bold underline center" }, "Peso dos produtos"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Peso total:"))
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `${(sale.weight/1000).toFixed(1)}kg`))

	financial_info_div.append(lib.element.create("div", { class: "box b1 lucida-grande em09 bold margin-top-10 underline center" }, "Financeiro"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Produtos:"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.product_value.toFixed(2)}`))
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Pacotes:"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.package_value.toFixed(2)}`))
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Frete:"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.shipment_value.toFixed(2)}`))
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Desconto:"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.discount_value.toFixed(2)}`))
	
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b3" }));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2-3 underline" }));

	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09" }, "Total:"));
	financial_info_div.append(lib.element.create("div", { class: "mobile-box b2 em09 bold lucida-grande" }, `R$${sale.value.toFixed(2)}`))
	sale_box.append(financial_info_div);

	sale.obs && sale_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold padding-10 border-st" }, sale.obs));

	let product_section = lib.element.create("div", { class: "box b1 container margin-top-5" });

	let product_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	product_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Produtos"));
	for(let i in sale.products){
		let product_div = lib.element.create("div", { class: "box b1 container ground box-hover border-explicit padding-10 margin-top-5" });
		product_div.append(lib.element.create("div", { class: "mobile-box b6-7 em09 v-center" }, sale.products[i].product_info));
		product_div.append(lib.element.create("div", { class: "mobile-box b7 lucida-grande center bold", style: "color:#060;" }, sale.products[i].amount+"un"));
		product_box.append(product_div);
	};
	product_section.append(product_box);

	let package_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	package_box.append(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Pacotes"));

	for(let i in sale.packages){
		let package_div = lib.element.create("div", { class: "box b1 container ground border-explicit padding-10 margin-top-5" });
		let package_info = lib.element.create("div", { class: "box b1 container" });

		package_info.append(lib.element.create("div", {
			class: "mobile-box b8 center border-st box-hover pointer",
			onclick: "lib.displayDiv('package-"+sale.packages[i].package_id+"', this)"
		}, `P${sale.packages[i].package_id}`));

		package_info.append(lib.element.create("div", { class: "mobile-box b2 em09 center v-center" }, sale.packages[i].info));
		package_info.append(lib.element.create("div", { class: "mobile-box b4 center" }, sale.packages[i].setup));
		package_info.append(lib.element.create("div", { class: "mobile-box b8 lucida-grande center bold" }, sale.packages[i].amount+"un"));
		package_div.append(package_info);

		let package_product_box = lib.element.create("div", { 
			id: "package-"+sale.packages[i].package_id,
			class: "box b1 container",
			style: "display:none;"
		});

		for(let j in sale.packages[i].products) {
			let package_product_div = lib.element.create("div", { class: "box b1 container border box-hover padding-5 margin-top-5 box-hover" });
			package_product_div.append(lib.element.create("div", { class: "mobile-box b5 lucida-grande center bold", style: "color:#060;" }, sale.packages[i].products[j].amount+"un" ));
			package_product_div.append(lib.element.create("div", { class: "mobile-box b4-5 em09 v-center" }, sale.packages[i].products[j].product_info ));
			package_product_box.append(package_product_div);
		};

		package_div.append(package_product_box);
		package_box.append(package_div);
	};
	
	product_section.append(package_box);
	sale_box.append(product_section);

	sale.status == "Disponível para retirada" && sale_box.append(lib.element.create("input", {
		type: "button",
		onclick: `Sale.deliver.controller.confirm(${sale.id}, this)`,
		class: "box b3 lucida-grande em11 bold border-lg-st radius-5 padding-10 margin-top-10 margin-bottom-10 center pointer",
		style: "background-color: #32CD32",
		value: "Confirmar entrega"
	}));

	sale.status == "Entregue" && sale_box.append(lib.element.create("input", {
		type: "button",
		onclick: `openPrintWindow('/sale/deliver/print/${sale.id}', 'to_print', 'width=700,height=400,_blank');`,
		class: "box b3 ground lucida-grande em11 bold border-st box-hover radius-5 padding-10 margin-top-10 margin-bottom-10 center pointer",
		value: "Imprimir etiqueta"
	}));
};