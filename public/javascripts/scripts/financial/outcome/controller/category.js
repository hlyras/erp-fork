const OutcomeCategoryController = {};

OutcomeCategoryController.create = document.getElementById("outcome-category-create-form");
if (OutcomeCategoryController.create) {
	OutcomeCategoryController.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value || null,
			name: event.target.elements.namedItem("name").value || null
		};

		let response = await API.response(OutcomeCategory.create, category);
		if (!response) { return false };


		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";

		OutcomeCategoryController.filter.submit.click();
	});
}

OutcomeCategoryController.filter = document.getElementById("outcome-category-filter-form");
if (OutcomeCategoryController.filter) {
	OutcomeCategoryController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			name: event.target.elements.namedItem("name").value
		};

		let categories = await API.response(OutcomeCategory.filter, category);
		if (!categories) { return false };

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("outcome-category-filter-box", OutcomeCategoryView.filter, categories, pagination); }());
	});
}

OutcomeCategoryController.show = async (id) => {
	let category = await API.response(OutcomeCategory.findById, id);
	if (!category) { return false };

	console.log(category);

	document.getElementById("outcome-origin-create-form").elements.namedItem("category-id").value = category.id;
	document.getElementById("outcome-origin-filter-form").elements.namedItem("category-id").value = category.id;

	document.getElementById("outcome-origin-create-form").style.display = "";

	OutcomeCategoryView.show(category);
	OutcomeOriginController.filter.submit.click();
};

OutcomeCategoryController.edit = async (id) => {
	let category = await API.response(OutcomeCategory.findById, id);
	if (!category) { return false };

	document.getElementById("outcome-category-create-form").elements.namedItem("id").value = category.id;
	document.getElementById("outcome-category-create-form").elements.namedItem("name").value = category.name;
};

OutcomeCategoryController.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a categoria?');
	if (r) {
		if (!await API.response(OutcomeCategory.delete, id)) { return false };

		OutcomeCategoryController.filter.submit.click();
	};
};