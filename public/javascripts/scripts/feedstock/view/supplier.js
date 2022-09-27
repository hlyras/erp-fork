Feedstock.supplier.view = {};

Feedstock.supplier.view.filter = (suppliers, pagination) => {
	let filter_box = document.getElementById("supplier-filter-box");
	let filter_div = document.getElementById("supplier-filter-div");
	filter_div.innerHTML = "";

	if (suppliers.length) {
		let div_header = lib.element.create("div", { class: "mobile-box b1 container border em07 margin-top-5 center" });

		div_header.appendChild(lib.element.create("div", { class: "mobile-box b6 padding-5" }, "Código"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-5" }, "Nome"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b6 padding-5" }, "Cor"));
		filter_div.appendChild(div_header);
		for (let i = pagination.page * pagination.pageSize; i < suppliers.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			let div_supplier = lib.element.create("div", { class: "mobile-box b1 container box-hover padding-5 margin-top-5 border" });
			let div_center = lib.element.create("div", { class: "mobile-box b3-4 container box-hover" });
			let div_right = lib.element.create("div", { class: "mobile-box b8 container box-hover center" });

			div_supplier.appendChild(lib.element.create("div", {
				class: "mobile-box b8 em11 tbl-show-link nowrap center bold",
				onclick: "Feedstock.supplier.storage.controller.open(" + suppliers[i].id + ")"
			}, suppliers[i].id));

			suppliers[i].cnpj && div_center.appendChild(lib.element.info("b2", "CNPJ", suppliers[i].cnpj));
			suppliers[i].trademark && div_center.appendChild(lib.element.info("b2", "Razão Social", suppliers[i].trademark));
			suppliers[i].brand && div_center.appendChild(lib.element.info("b2", "Marca", suppliers[i].brand));
			suppliers[i].name && div_center.appendChild(lib.element.info("b2", "Responsável", suppliers[i].name));

			div_right.appendChild(lib.element.icon('b1 padding-5', 20, "/images/icon/edit.png", "Feedstock.supplier.controller.edit(" + suppliers[i].id + ")"));
			div_right.appendChild(lib.element.icon('b1 padding-5', 20, "/images/icon/trash.png", "Feedstock.supplier.controller.delete(" + suppliers[i].id + ")"));

			div_supplier.appendChild(div_center);
			div_supplier.appendChild(div_right);
			filter_div.appendChild(div_supplier);
		};
		filter_box.style.display = "";
	} else {
		filter_div.innerHTML = "Sem resultados";
		filter_box.style.display = "";
	};
};

Feedstock.supplier.storage.view = {};

Feedstock.supplier.storage.view.open = (supplier) => {
	//Supplier Information
	let supplier_info_box = document.getElementById("supplier-storage-info"); supplier_info_box.innerHTML = "";

	supplier_info_box.appendChild(lib.element.info("b8", "Código", supplier.id));
	supplier.cnpj && supplier_info_box.appendChild(lib.element.info("b3-8", "CNPJ", supplier.cnpj));
	supplier.trademark && supplier_info_box.appendChild(lib.element.info("b2", "Razão Social", supplier.trademark));
	supplier.brand && supplier_info_box.appendChild(lib.element.info("b2", "Marca", supplier.brand));
	supplier.name && supplier_info_box.appendChild(lib.element.info("b2", "Responsável", supplier.name));

	//Fill supplier id in storage feedstock form
	document.getElementById("supplier-storage-add-form").elements.namedItem("supplier-id").value = supplier.id;
	document.getElementById("supplier-storage-filter-form").elements.namedItem("supplier-id").value = supplier.id;

	//Supplier feedstocks
	const pagination = { pageSize: 15, page: 0 };
	(function () { lib.carousel.execute("supplier-feedstock-box", Feedstock.supplier.storage.view.filter, supplier.storage, pagination); }());
};

Feedstock.supplier.storage.view.filter = (feedstocks, pagination) => {
	supplier_feedstock_div = document.getElementById("supplier-feedstock-div"); supplier_feedstock_div.innerHTML = "";

	for (let i = pagination.page * pagination.pageSize; i < feedstocks.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
		let feedstock_div = lib.element.create("div", { class: "box b3 container box-hover padding-5 margin-top-5 border-explicit" });

		feedstock_div.appendChild(lib.element.info("b4", "Código", feedstocks[i].code));
		feedstock_div.appendChild(lib.element.info("b2", "Nome", feedstocks[i].name));
		feedstock_div.appendChild(lib.element.info("b4", "Cor", feedstocks[i].color_name));
		feedstock_div.appendChild(lib.element.info("b3", "Medida do pacote", feedstocks[i].unit + "" + feedstocks[i].uom));
		feedstock_div.appendChild(lib.element.info("b4", "Un. de medida", feedstocks[i].uom));
		feedstock_div.appendChild(lib.element.create("input", {
			id: "storage-feedstock-" + feedstocks[i].id,
			type: "number",
			class: "mobile-box b4 em11 input-generic bold center",
			value: feedstocks[i].price.toFixed(4),
			step: 0.0001
		}));
		feedstock_div.appendChild(lib.element.icon('b12', 20, "/images/icon/save.png", "Feedstock.supplier.storage.controller.update(" + feedstocks[i].id + ")"));
		feedstock_div.appendChild(lib.element.icon('b12', 20, "/images/icon/trash.png", "Feedstock.supplier.storage.controller.remove(" + feedstocks[i].id + ")"));

		supplier_feedstock_div.appendChild(feedstock_div);
	};
};