const IncomeCategoryController = {};

IncomeCategoryController.create = document.getElementById("income-category-create-form");
if (IncomeCategoryController.create) {
	IncomeCategoryController.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value || null,
			name: event.target.elements.namedItem("name").value || null
		};

		let response = await API.response(IncomeCategory.create, category);
		if (!response) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";

		document.getElementById("income-category-show-box").style.display = "none";

		IncomeCategoryController.filter.submit.click();
	});
}

IncomeCategoryController.filter = document.getElementById("income-category-filter-form");
if (IncomeCategoryController.filter) {
	IncomeCategoryController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			name: event.target.elements.namedItem("name").value
		};

		let categories = await API.response(IncomeCategory.filter, category);
		if (!categories) { return false };

		console.log(categories);

		document.getElementById("income-category-show-box").style.display = "none";

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("income-category-filter-box", IncomeCategoryView.filter, categories, pagination); }());
	});
}

IncomeCategoryController.show = async (id) => {
	let category = await API.response(IncomeCategory.findById, id);
	if (!category) { return false };

	document.getElementById("income-category-show-box").style.display = "";
	document.getElementById("income-origin-filter-div").style.display = "none";
	document.getElementById("income-origin-filter-box").children.namedItem("carousel-navigation").style.display = "none";

	document.getElementById("income-origin-create-form").elements.namedItem("category-id").value = category.id;
	document.getElementById("income-origin-filter-form").elements.namedItem("category-id").value = category.id;

	IncomeCategoryView.show(category);

	IncomeOriginController.filter.submit.click();
};

IncomeCategoryController.edit = async (id) => {
	let category = await API.response(IncomeCategory.findById, id);
	if (!category) { return false };

	document.getElementById("income-category-show-box").style.display = "none";
	document.getElementById("income-category-create-form").elements.namedItem("id").value = category.id;
	document.getElementById("income-category-create-form").elements.namedItem("name").value = category.name;
};

IncomeCategoryController.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a categoria?');
	if (r) {
		if (!await API.response(IncomeCategory.delete, id)) { return false };

		document.getElementById("income-category-show-box").style.display = "none";
		IncomeCategoryController.filter.submit.click();
	};
};