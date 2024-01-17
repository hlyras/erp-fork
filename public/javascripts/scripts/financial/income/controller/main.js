const IncomeController = {};

IncomeController.create = document.getElementById("income-create-form");
if (IncomeController.create) {
	IncomeController.create.addEventListener("submit", async e => {
		e.preventDefault();

		let income = {
			id: e.target.elements.namedItem("id").value || null,
			date: lib.dateToTimestamp(e.target.elements.namedItem("date").value) || null,
			category_id: e.target.elements.namedItem("category-id").value || null,
			origin_id: e.target.elements.namedItem("origin-id").value || null,
			cash: e.target.elements.namedItem("cash").value || null,
			description: e.target.elements.namedItem("description").value || null
		};

		income = await API.response(Income.create, income);
		if (!income) { return false };

		e.target.elements.namedItem("id").value = "";
		e.target.elements.namedItem("date").value = "";
		e.target.elements.namedItem("category-id").value = "";
		e.target.elements.namedItem("origin-id").value = "";
		e.target.elements.namedItem("cash").value = "0.00";
		e.target.elements.namedItem("description").value = "";

		IncomeController.filter.submit.click();
	});
}

IncomeController.filter = document.getElementById("income-filter-form");
if (IncomeController.filter) {
	IncomeController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let income = {
			id: "",
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value
		};

		let incomes = await API.response(Income.filter, income);
		if (!incomes) { return false };

		document.getElementById("income-show-box").style.display = "none";

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("income-filter-box", Income.view.filter, incomes, pagination); }());
	});
}

IncomeController.edit = async (id) => {
	let income = await API.response(Income.findById, id);
	if (!income) { return false };

	document.getElementById("income-create-form").elements.namedItem("id").value = income.id;
	document.getElementById("income-create-form").elements.namedItem("date").value = lib.convertDate(lib.timestampToDate(income.date));
	document.getElementById("income-create-form").elements.namedItem("category-id").value = income.category_id;
	await IncomeController.fillOriginSelect(document.getElementById("income-create-form").elements.namedItem("category-id").value, "income-create-form");
	document.getElementById("income-create-form").elements.namedItem("origin-id").value = income.origin_id;
	document.getElementById("income-create-form").elements.namedItem("description").value = income.description;
	document.getElementById("income-create-form").elements.namedItem("cash").value = income.cash;
};

IncomeController.show = async (id) => {
	let income = await API.response(Income.findById, id);
	if (!income) { return false };

	document.getElementById("income-filter-box").style.display = "none";

	IncomeView.show(income);
};

IncomeController.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a entrada?');
	if (r) {
		if (!await API.response(Income.delete, id)) { return false };

		IncomeController.filter.submit.click();
	}
};

IncomeController.fillOriginSelect = async (category_id, form) => {
	let html = "";
	if (category_id) {
		let origins = await API.response(IncomeOrigin.filter, { category_id });
		if (!origins) { return false };

		html += "<option value=''>Origem</option>";
		for (let i in origins) { html += "<option value='" + origins[i].id + "'>" + origins[i].name + "</option>"; };
	} else {
		html += "<option value=''>Origem</option>";
	}

	document.getElementById(form).elements.namedItem("origin-id").innerHTML = html;
};