Income.origin.controller = {};

Income.origin.controller.create = document.getElementById("income-origin-create-form");
if(Income.origin.controller.create){
	Income.origin.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			id: event.target.elements.namedItem("id").value,
			category_id: event.target.elements.namedItem("category-id").value,
			name: event.target.elements.namedItem("name").value
		};

		let response = await API.response(Income.origin.save, origin);
		if(!response){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		Income.origin.controller.filter.submit.click();
	});
}

Income.origin.controller.filter = document.getElementById("income-origin-filter-form");
if(Income.origin.controller.filter){
	Income.origin.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			category_id: event.target.elements.namedItem("category-id").value,
			name: event.target.elements.namedItem("name").value
		};

		let origins = await API.response(Income.origin.filter, origin);
		if(!origins){ return false };

		document.getElementById("income-origin-filter-div").style.display = "";

		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("income-origin-filter-box", Income.origin.view.filter, origins, pagination); }());
	});
}

Income.origin.controller.show = async (id) => {
	let origin = await API.response(Income.origin.findById, id);
	if(!origin){ return false };

	Income.origin.view.show(origin);
};

Income.origin.controller.edit = async (id) => {
	let origin = await API.response(Income.origin.findById, id);
	if(!origin){ return false };

	document.getElementById("income-origin-create-form").elements.namedItem("id").value = origin.id;
	document.getElementById("income-origin-create-form").elements.namedItem("category-id").value = origin.category_id;
	document.getElementById("income-origin-create-form").elements.namedItem("name").value = origin.name;
};

Income.origin.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a origem?');
	if(r){
		if(!await API.response(Income.origin.delete, id)){ return false };
		
		Income.origin.controller.filter.submit.click();
	};
};