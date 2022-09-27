Feedstock.view = {};

Feedstock.view.filter = (feedstocks, pagination) => {
	let filter_box = document.getElementById("feedstock-filter-box");
	let filter_div = document.getElementById("feedstock-filter-div");
	filter_div.innerHTML = "";

	if (feedstocks.length) {
		let div_header = lib.element.create("div", { class: "box b1 container border em07 margin-top-5 center" });

		div_header.appendChild(lib.element.create("div", { class: "mobile-box b6 padding-5" }, "Código"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b2 padding-5" }, "Nome"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b6 padding-5" }, "Cor"));
		filter_div.appendChild(div_header);
		for (let i = pagination.page * pagination.pageSize; i < feedstocks.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			let div_feedstock = lib.element.create("div", { class: "box b1 container box-hover padding-5 margin-top-5 border" });
			div_feedstock.appendChild(lib.element.create("div", {
				class: "mobile-box b6 em11 tbl-show-link nowrap center bold",
				onclick: "Feedstock.controller.report(" + feedstocks[i].id + ")"
			}, feedstocks[i].code));
			div_feedstock.appendChild(lib.element.create("div", { class: "mobile-box em08 b2 center" }, feedstocks[i].name));
			div_feedstock.appendChild(lib.element.create("div", { class: "mobile-box em08 b6 center" }, feedstocks[i].color_name));
			div_feedstock.appendChild(lib.element.icon('b12', 20, "/images/icon/edit.png", "Feedstock.controller.edit(" + feedstocks[i].id + ")"));
			div_feedstock.appendChild(lib.element.icon('b12', 20, "/images/icon/trash.png", "Feedstock.controller.delete(" + feedstocks[i].id + ")"));
			filter_div.appendChild(div_feedstock);
		};
		filter_box.style.display = "";
	} else {
		filter_div.innerHTML = "Sem resultados";
		filter_box.style.display = "";
	};
};

Feedstock.view.report = (feedstocks, pagination) => {
	let report_box = document.getElementById("feedstock-report-box");
	let report_div = document.getElementById("feedstock-report-div");
	report_div.innerHTML = "";

	if (feedstocks.length) {
		let div_header = lib.element.create("div", { class: "box b1 container margin-top-5" });

		div_header.appendChild(lib.element.info("b6 bold", "Id", feedstocks[0].id));
		div_header.appendChild(lib.element.info("b2 bold", "Nome da Matéria-Prima", feedstocks[0].name));
		div_header.appendChild(lib.element.info("b3 bold", "Cor", feedstocks[0].color_name));

		report_div.appendChild(div_header);
		for (let i = pagination.page * pagination.pageSize; i < feedstocks.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			let div_feedstock = lib.element.create("div", { class: "box b1 container box-hover padding-5 margin-top-5 border" });
			div_feedstock.appendChild(lib.element.create("div", { class: "mobile-box em08 b2-3 bold center" }, feedstocks[i].brand));
			div_feedstock.appendChild(lib.element.create("div", { class: "mobile-box b3 lucida-grande bold" }, `$${feedstocks[i].price}`));
			report_div.appendChild(div_feedstock);
		};
		report_box.style.display = "";
	} else {
		report_div.innerHTML = "Sem resultados";
		report_box.style.display = "";
	};
};