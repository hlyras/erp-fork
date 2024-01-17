Feedstock.controller = {};

Feedstock.controller.create = document.getElementById("feedstock-create-form");
if (Feedstock.controller.create) {
	Feedstock.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let feedstock = {
			id: event.target.elements.namedItem("id").value || null,
			code: event.target.elements.namedItem("code").value || null,
			name: event.target.elements.namedItem("name").value || null,
			color_id: event.target.elements.namedItem("color-id").value || null,
			unit: event.target.elements.namedItem("unit").value || null,
			uom: event.target.elements.namedItem("uom").value || null,
		};

		let response = await API.response(Feedstock.save, feedstock);
		if (!response) { return false; }

		event.target.elements.namedItem('id').value = "";
		event.target.elements.namedItem('code').value = "";
		event.target.elements.namedItem('name').value = "";
		event.target.elements.namedItem('color-id').value = "";
		event.target.elements.namedItem('unit').value = "";
		event.target.elements.namedItem('uom').value = "";

		Feedstock.controller.filter.submit.click();
	});
}

Feedstock.controller.filter = document.getElementById("feedstock-filter-form");
if (Feedstock.controller.filter) {
	Feedstock.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let feedstock = {
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color_id: event.target.elements.namedItem("color-id").value
		};

		let feedstocks = await API.response(Feedstock.filter, feedstock);
		if (!feedstocks) { return false; }

		lib.display("feedstock-filter-box", "none");

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("feedstock-filter-box", Feedstock.view.filter, feedstocks, pagination); }());
	});
}

Feedstock.controller.edit = async (feedstock_id) => {
	let feedstock = await API.response(Feedstock.findById, feedstock_id);
	if (!feedstock) { return false; }

	document.getElementById("feedstock-create-form").elements.namedItem("id").value = feedstock.id;
	document.getElementById("feedstock-create-form").elements.namedItem("code").value = feedstock.code;
	document.getElementById("feedstock-create-form").elements.namedItem("name").value = feedstock.name;
	document.getElementById("feedstock-create-form").elements.namedItem("color-id").value = feedstock.color_id;
	document.getElementById("feedstock-create-form").elements.namedItem("unit").value = feedstock.unit;
	document.getElementById("feedstock-create-form").elements.namedItem("uom").value = feedstock.uom;
};

Feedstock.controller.delete = async (feedstock_id) => {
	let r = confirm('Deseja realmente excluir a matéria-prima? Essa ação não pode ser revertida!');
	if (r) {
		if (!await API.response(Feedstock.delete, feedstock_id)) { return false; };
		Feedstock.controller.filter.submit.click();
	}
};

Feedstock.controller.report = async (feedstock_id) => {
	let feedstocks = await API.response(Feedstock.report, feedstock_id);
	if (!feedstocks) { return false; }

	lib.display("feedstock-filter-box", "none");

	const pagination = { pageSize: 10, page: 0 };
	(function () { lib.carousel.execute("feedstock-report-box", Feedstock.view.report, feedstocks, pagination); }());
};

Feedstock.controller.dropdown = {
	filter: async (input, dropdown_id) => {
		let feedstock = { name: input.value };

		let properties = ["code", "name", "color_name", "unit", "uom"];

		if (feedstock.name.length > 2) {
			let feedstocks = await API.response(Feedstock.filter, feedstock);
			if (!feedstocks) { return false; };

			lib.dropdown.render(feedstocks, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};