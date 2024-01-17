const IncomeOriginController = {};

IncomeOriginController.create = document.getElementById("income-origin-create-form");
if (IncomeOriginController.create) {
	IncomeOriginController.create.addEventListener("submit", async e => {
		e.preventDefault();

		let origin = {
			id: e.target.elements.namedItem("id").value || null,
			category_id: e.target.elements.namedItem("category-id").value || null,
			name: e.target.elements.namedItem("name").value || null
		};

		let response = await API.response(IncomeOrigin.create, origin);
		if (!response) { return false };

		e.target.elements.namedItem("id").value = "";
		e.target.elements.namedItem("name").value = "";
		IncomeOriginController.filter.submit.click();
	});
}

IncomeOriginController.filter = document.getElementById("income-origin-filter-form");
if (IncomeOriginController.filter) {
	IncomeOriginController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			category_id: event.target.elements.namedItem("category-id").value,
			name: event.target.elements.namedItem("name").value
		};

		let origins = await API.response(IncomeOrigin.filter, origin);
		if (!origins) { return false };

		document.getElementById("income-origin-filter-div").style.display = "";

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("income-origin-filter-box", IncomeOriginView.filter, origins, pagination); }());
	});
}

IncomeOriginController.show = async (id) => {
	let origin = await API.response(IncomeOrigin.findById, id);
	if (!origin) { return false };

	IncomeOriginView.show(origin);
};

IncomeOriginController.edit = async (id) => {
	let origin = await API.response(IncomeOrigin.findById, id);
	if (!origin) { return false };

	document.getElementById("income-origin-create-form").elements.namedItem("id").value = origin.id;
	document.getElementById("income-origin-create-form").elements.namedItem("category-id").value = origin.category_id;
	document.getElementById("income-origin-create-form").elements.namedItem("name").value = origin.name;
};

IncomeOriginController.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a origem?');
	if (r) {
		if (!await API.response(IncomeOrigin.delete, id)) { return false };

		IncomeOriginController.filter.submit.click();
	};
};