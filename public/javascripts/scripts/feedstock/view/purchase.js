Feedstock.purchase.view = {};

Feedstock.purchase.view.kart = () => {
	let kart_box = document.getElementById("purchase-feedstock-kart-box");
	Feedstock.purchase.controller.kart.items.length && lib.display(kart_box, "");
	!Feedstock.purchase.controller.kart.items.length && lib.display(kart_box, "none");
	
	let kart_value = document.getElementById("purchase-feedstock-kart-value");
	kart_value.innerHTML = "R$"+lib.roundValue(Feedstock.purchase.controller.kart.value).toFixed(2);

	let shipment_value = document.getElementById("purchase-feedstock-kart-shipment-value");
	shipment_value.innerHTML = "R$"+lib.roundValue(Feedstock.purchase.controller.kart.shipment_value).toFixed(2);

	let discount_value = document.getElementById("purchase-feedstock-kart-discount-value");
	discount_value.innerHTML = "R$"+lib.roundValue(Feedstock.purchase.controller.kart.shipment_value).toFixed(2);

	let kart_total_value = document.getElementById("purchase-feedstock-kart-total-value");
	kart_total_value.innerHTML = "R$"+lib.roundValue(Feedstock.purchase.controller.kart.total_value).toFixed(2);
};

Feedstock.purchase.view.filter = (purchases, pagination) => {
	let filter_div = document.getElementById("purchase-feedstock-filter-div");
	filter_div.innerHTML = "";

	if(purchases.length){
		for (let i = pagination.page * pagination.pageSize; i < purchases.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let purchase_div = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 border-explicit" });

			purchase_div.appendChild(lib.element.create("div", {
				class: "mobile-box b8 em11 tbl-show-link nowrap center bold",
				onclick: "Feedstock.purchase.controller.open("+purchases[i].id+")"
			}, purchases[i].id));

			purchase_div.appendChild(lib.element.info("b3", "Fornecedor", purchases[i].supplier_brand));
			purchase_div.appendChild(lib.element.info("b3", "Data da compra", lib.timestampToFulldate(purchases[i].date)));

			purchase_div.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Feedstock.purchase.controller.edit("+purchases[i].id+")"));
			purchase_div.appendChild(lib.element.icon('b10', 20, "/images/icon/trash.png", "Feedstock.purchase.controller.delete("+purchases[i].id+")"));

			filter_div.appendChild(purchase_div);
		};
	}

	document.getElementById("purchase-feedstock-filter-box").style.display = "";
};

Feedstock.purchase.view.show = (purchase) => {
	console.log(purchase);

	let show_div = document.getElementById("purchase-feedstock-show-box");
	show_div.innerHTML = "";

	let supplier_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5 border-explicit" });
	let purchase_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5 border-explicit" });
	let financial_div = lib.element.create("div", { class: "box b3 container padding-5 margin-top-5 border-explicit" });

	supplier_div.appendChild(lib.element.create("div", { class: "box b1 underline center margin-top-5" }, "Informações do Fornecedor"));
	supplier_div.appendChild(lib.element.info("b6", "Código", purchase.supplier_id));
	supplier_div.appendChild(lib.element.info("b5-6", "Fornecedor", purchase.supplier_brand));
	purchase.supplier_cnpj && supplier_div.appendChild(lib.element.info("b1", "CNPJ", purchase.supplier_cnpj));
	purchase.supplier_name && supplier_div.appendChild(lib.element.info("b1", "Fornecedor", purchase.supplier_name));
	purchase.supplier_trademark && supplier_div.appendChild(lib.element.info("b1", "Razão Social", purchase.supplier_trademark));
	purchase.supplier_phone && supplier_div.appendChild(lib.element.info("b1", "Telefone", purchase.supplier_phone));

	purchase_div.appendChild(lib.element.create("div", { class: "box b1 underline center margin-top-5" }, "Informações da Compra"));
	purchase_div.appendChild(lib.element.info("b3", "Código", purchase.id));
	purchase_div.appendChild(lib.element.info("b2-3", "Status", purchase.status));
	purchase_div.appendChild(lib.element.info("b1", "Método de Pagamento", purchase.payment_method));
	purchase_div.appendChild(lib.element.info("b1", "Usuário", purchase.user_name));
	purchase.confirmation_date && purchase_div.appendChild(lib.element.info("b1", "Data da confirmação", purchase.confirmation_date));
	purchase.confirmation_user_name && purchase_div.appendChild(lib.element.info("b1", "Confirmado por:", purchase.confirmation_user_name));
	purchase.receiver_date && purchase_div.appendChild(lib.element.info("b1", "Data da confirmação", purchase.receiver_date));
	purchase.receiver_user_name && purchase_div.appendChild(lib.element.info("b1", "Confirmado por:", purchase.receiver_user_name));

	financial_div.appendChild(lib.element.create("div", { class: "box b1 underline center margin-top-5" }, "Valores da Compra"));
	financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3 margin-top-5" }, "Matérias-primas:"));
	financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3 margin-top-5 bold" }, "R$"+purchase.value.toFixed(2)));
	purchase.shipment_value && financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3" }, "Frete:"));
	purchase.shipment_value && financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3 bold" }, "R$"+purchase.shipment_value.toFixed(2)));
	purchase.discount_value && financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3" }, "Desconto:"));
	purchase.discount_value && financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3 bold" }, "R$"+purchase.discount_value.toFixed(2)));
	financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3" }));
	financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 underline" }));
	financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3 bold" }, "Valor Total"));
	financial_div.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-3 bold" }, "R$"+purchase.total_value.toFixed(2)));

	show_div.appendChild(supplier_div);	
	show_div.appendChild(purchase_div);
	show_div.appendChild(financial_div);

	let feedstock_box = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 border-explicit" });
	feedstock_box.appendChild(lib.element.create("div", { class: "box b1 underline center" }, "Lista das Matérias-Primas"))

	purchase.feedstocks.forEach(feedstock => {
		let feedstock_div = lib.element.create("div", { class: "box b3 container box-hover padding-5 margin-top-5 border-explicit" });

		feedstock_div.appendChild(lib.element.info("b4", "Código", feedstock.code));
		feedstock_div.appendChild(lib.element.info("b2", "Nome", feedstock.name));
		feedstock_div.appendChild(lib.element.info("b4", "Cor", feedstock.color_name));

		feedstock.uom == "cm" && feedstock_div.appendChild(lib.element.info("b6", "Met do Rolo", (feedstock.unit/100)+"m"));
		feedstock.uom == "un" && feedstock_div.appendChild(lib.element.info("b6", "Qtd Padrão", feedstock.unit));
		
		feedstock_div.appendChild(lib.element.info("b4", "Preço", "R$"+lib.roundValue(feedstock.price).toFixed(2)));
		
		feedstock.uom == "cm" && feedstock_div.appendChild(lib.element.info("b6", "Quantidade", feedstock.amount+"m"));
		feedstock.uom == "un" && feedstock_div.appendChild(lib.element.info("b6", "Quantidade", feedstock.amount+"un"));
		
		feedstock.uom == "cm" && feedstock_div.appendChild(lib.element.info("b6", "Rolos", feedstock.amount / (feedstock.unit / 100)+"un"));
		feedstock.uom == "un" && feedstock_div.appendChild(lib.element.info("b6", "Pacotes", feedstock.amount / feedstock.unit+"un"));

		feedstock_div.appendChild(lib.element.info("b4 bold", "Total", "R$"+lib.roundValue(feedstock.amount * feedstock.price).toFixed(2)));

		feedstock_box.appendChild(feedstock_div);
	});

	show_div.appendChild(feedstock_box);

	show_div.style.display = "";
};

Feedstock.purchase.view.edit = purchase => {
	//reset previous kart
	Feedstock.purchase.controller.kart.items = [];

	document.getElementById("purchase-id").value = purchase.id;

	document.getElementById("purchase-supplier-id").value = purchase.supplier_id;
	Feedstock.purchase.controller.setSupplier(purchase.supplier_id);

	document.getElementById("purchase-feedstock-kart-status").value = purchase.status;
	document.getElementById("purchase-feedstock-kart-payment-method").value = purchase.payment_method;

	Feedstock.purchase.controller.kart.shipment_value = purchase.shipment_value;
	Feedstock.purchase.controller.kart.discount_value = purchase.discount_value;
	document.getElementById("purchase-feedstock-kart-shipment-value").value = purchase.shipment_value;
	document.getElementById("purchase-feedstock-kart-discount-value").value = purchase.discount_value;

	purchase.feedstocks.forEach(feedstock => {
		Feedstock.purchase.controller.kart.insert("id", feedstock);
	});

	Feedstock.purchase.controller.kart.update("code");
	Feedstock.purchase.controller.kart.list("Feedstock.purchase.controller.kart", Feedstock.purchase.controller.kart.props);

	// console.log(Feedstock.purchase.controller.kart);
};