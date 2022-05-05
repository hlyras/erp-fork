Sale.view = {};

Sale.view.filter = (sales, setup) => {
	let filter_div = document.getElementById("sale-filter-div");
	filter_div.innerHTML = "";

	for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
		let sale_div = lib.element.create("div", { class: "box b2 container ground border-st shadow-hover padding-10 margin-top-10 radius-5" });
		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b6 lucida-grande em09 bold input-show nowrap border shadow center pointer",
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
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, sales[i].status));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, sales[i].user_name));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande em09 padding-2 center",
		}, lib.timestampToDate(sales[i].sale_date)));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande em09 padding-2 center",
		}, `<label class='em08'>Total</label> <label class='em09 bold'>R$${sales[i].value.toFixed(2)}</label>`));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande em09 padding-2 center",
		}, `<label class='em08'>Frete</label> <label class='em09 bold'>R$${sales[i].shipment_value.toFixed(2)}</label>`));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande em09 padding-2 center",
		}, `<label class='em08'>Desconto</label> <label class='em09 bold'>R$${sales[i].discount_value.toFixed(2)}</label>`));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande em09 padding-2 center",
		}, `<label class='em08'>Valor</label> <label class='em09 bold'>R$${(sales[i].product_value + sales[i].package_value).toFixed(2)}</label>`));

		filter_div.append(sale_div);
	};
};

Sale.view.show = (sale, status) => {
	let sale_box = document.getElementById("sale-show-box");
	sale_box.innerHTML = "";

	console.log(sale);

	sale_box.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline margin-top-10 center" }, "Pedido: "+sale.id));

	let customer_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5" });
	customer_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Dados do cliente"));
	customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "Nome do cliente", `${sale.customer.name}` ));
	sale.customer.cpf && customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "CPF", `${sale.customer.cpf}` ));
	
	customer_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold margin-top-5 underline center" }, "Dados da empresa"));
	sale.customer.trademark && customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "Razão social", `${sale.customer.trademark}` ));
	sale.customer.brand && customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "Marca", `${sale.customer.brand}` ));
	sale.customer.cnpj && customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "CNPJ", `${sale.customer.cnpj}` ));

	customer_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold margin-top-5 underline center" }, "Contato"));
	sale.customer.email && customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "E-mail", `${sale.customer.email}` ));
	sale.customer.cellphone && customer_div.appendChild(lib.element.createInfo("b1 lucida-grande em09 margin-top-5 padding-5", "Telefone", `${sale.customer.cellphone}` ));
	sale_box.append(customer_div);

	let sale_info_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5" });
	sale_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Informações da venda"));
	sale_info_div.appendChild(lib.element.createInfo("box b1 em09 padding-10", "Vendedor(a)", `${sale.user_name}` ));
	
	sale_info_div.appendChild(lib.element.createInfo("box b3-7 lucida-grande em09 padding-10", "Data da venda", `${lib.timestampToDate(sale.sale_date)}` ));
	!sale.nf && sale_info_div.appendChild(lib.element.createInfo("b4-7 em09 padding-10", "Status", `${sale.status}` ));
	sale.nf && sale.nf.length < 20 && sale_info_div.appendChild(lib.element.createInfo("box b4-7 em09 padding-10", "Status", `${sale.status}` ));
	sale.nf && sale.nf.length > 20 && sale_info_div.appendChild(lib.element.createInfo("box b3-7 em09 padding-10", "Status", `${sale.status}` ));
	sale.nf && sale.nf.length > 20 && sale_info_div.appendChild(lib.element.icon('b7', 30, "https://spaces.jariomilitar.com/erp-images/icon/nf-e.png", "lib.openExternalLink('"+sale.nf+"')"));
	
	sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Método de pagamento", `${sale.payment_method || ''}` ));
	sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Prazo de pagamento", `${sale.payment_period || ''}` ));
	
	sale_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold margin-top-10 underline center" }, "Logística de envio"));
	sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Método de envio", `${sale.shipment_method}` ));
	sale.estimated_shipment_date && sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Prazo de embalo", `${lib.timestampToDate(sale.estimated_shipment_date)}` ));
	// 
	sale.payment_confirmation_date && sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Confirmação do pagamento", `${lib.convertDatetime(lib.timestampToDatetime(sale.payment_confirmation_date)) || ''}` ));
	sale.payment_user_name && sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Confirmação do pagamento", `${sale.payment_user_name || ''}` ));

	sale.packment_confirmation_date && sale_info_div.appendChild(lib.element.createInfo("box b3-7 em09 padding-10", "Data do embalo", `${lib.convertDatetime(lib.timestampToDatetime(sale.packment_confirmation_date)) || ''}` ));
	sale.packment_user_name && sale_info_div.appendChild(lib.element.createInfo("box b3-7 em09 padding-10", "Embalado por", `${sale.packment_user_name || ''}` ));
	sale.box_amount && sale_info_div.appendChild(lib.element.createInfo("box b7 em09 padding-10", "Volumes", `${sale.box_amount || ''}` ));
	
	sale.shipment_confirmation_date && sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Data do envio", `${lib.convertDatetime(lib.timestampToDatetime(sale.shipment_confirmation_date)) || ''}` ));
	sale.shipment_user_name && sale_info_div.appendChild(lib.element.createInfo("box b2 em09 padding-10", "Enviado por", `${sale.shipment_user_name || ''}` ));
	sale_box.appendChild(sale_info_div);

	let financial_info_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5" });
	financial_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Peso dos produtos"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Peso total:"))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `${(sale.weight/1000).toFixed(1)}kg`))

	financial_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold margin-top-10 underline center" }, "Financeiro"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Produtos:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.product_value}`))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Pacotes:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.package_value}`))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Frete:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.shipment_value}`))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Desconto:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.discount_value}`))
	
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b3" }));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2-3 underline" }));

	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09" }, "Total:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 bold lucida-grande" }, `R$${sale.value}`))
	sale_box.appendChild(financial_info_div);

	let product_section = lib.element.create("div", { class: "box b1 container margin-top-5" });

	let product_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	product_box.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Produtos"));
	for(let i in sale.products){
		let product_div = lib.element.create("div", { class: "box b1 container ground box-hover border-explicit padding-10 margin-top-5" });
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b4-7 em09 v-center" }, sale.products[i].product_info));
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b7 lucida-grande center bold", style: "color:#060;" }, sale.products[i].amount+"un"));
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b7 em09 center" }, "R$"+sale.products[i].price));
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b7 em09 center" }, "R$"+(sale.products[i].amount * sale.products[i].price).toFixed(2) ));
		product_box.appendChild(product_div);
	};
	product_section.appendChild(product_box);

	let package_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	package_box.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Pacotes"));

	for(let i in sale.packages){
		let package_div = lib.element.create("div", { class: "box b1 container ground border-explicit padding-10 margin-top-5" });
		let package_info = lib.element.create("div", { class: "box b1 container" });
		package_info.appendChild(lib.element.create("img", {
			src: "https://spaces.jariomilitar.com/erp-images/icon/down-arrow.png", 
			class: "mobile-box b8 size-25 icon center pointer",
			onclick: "lib.displayDiv('package-"+sale.packages[i].package_id+"', this, 'https://spaces.jariomilitar.com/erp-images/icon/down-arrow.png', 'https://spaces.jariomilitar.com/erp-images/icon/up-arrow.png')"
		}, `P${sale.packages[i].package_id}`));

		package_info.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 center v-center" }, sale.packages[i].info));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3-8 center" }, sale.packages[i].setup));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3 lucida-grande center bold" }, sale.packages[i].amount+"un"));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3 em09 center" }, "R$"+sale.packages[i].price.toFixed(2) ));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3 em09 center" }, "R$"+(sale.packages[i].amount * sale.packages[i].price).toFixed(2) ));
		package_div.appendChild(package_info);

		let package_product_box = lib.element.create("div", { 
			id: "package-"+sale.packages[i].package_id,
			class: "box b1 container",
			style: "display:none;"
		});

		for(let j in sale.packages[i].products) {
			let package_product_div = lib.element.create("div", { class: "box b1 container border box-hover padding-5 margin-top-5 box-hover" });
			package_product_div.appendChild(lib.element.create("div", { class: "mobile-box b5 lucida-grande center bold", style: "color:#060;" }, sale.packages[i].products[j].amount+"un" ));
			package_product_div.appendChild(lib.element.create("div", { class: "mobile-box b4-5 em09 v-center" }, sale.packages[i].products[j].product_info ));
			package_product_box.appendChild(package_product_div);
		};

		package_div.appendChild(package_product_box);
		package_box.appendChild(package_div);
	};
	
	product_section.appendChild(package_box);
	sale_box.appendChild(product_section);
};

Sale.view.edit = async (sale) => {
};