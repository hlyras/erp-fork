Outcome.category.controller = {};

Outcome.category.controller.create = document.getElementById("outcome-category-create-form");
if(Outcome.category.controller.create){
	Outcome.category.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value
		};

		let response = await API.response(Outcome.category.save, category);
		if(!response){ return false };

		
		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		
		Outcome.category.controller.filter.submit.click();
	});
}

Outcome.category.controller.filter = document.getElementById("outcome-category-filter-form");
if(Outcome.category.controller.filter){
	Outcome.category.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			name: event.target.elements.namedItem("name").value
		};

		let categories = await API.response(Outcome.category.filter, category);
		if(!categories){ return false };
		
		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("outcome-category-filter-box", Outcome.category.view.filter, categories, pagination); }());
	});
}

Outcome.category.controller.show = async (id) => {
	let category = await API.response(Outcome.category.findById, id);
	if(!category){ return false };
	
	document.getElementById("outcome-origin-create-form").elements.namedItem("category-id").value = category.id;
	document.getElementById("outcome-origin-filter-form").elements.namedItem("category-id").value = category.id;
	
	document.getElementById("outcome-origin-create-form").style.display = "";
	
	Outcome.category.view.show(category);
	Outcome.origin.controller.filter.submit.click();
};

Outcome.category.controller.edit = async (id) => {
	let category = await API.response(Outcome.category.findById, id);
	if(!category){ return false };

	document.getElementById("outcome-category-create-form").elements.namedItem("id").value = category.id;
	document.getElementById("outcome-category-create-form").elements.namedItem("name").value = category.name;
};

Outcome.category.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a categoria?');
	if(r){
		if(!await API.response(Outcome.category.delete, id)){ return false };
		
		Outcome.category.controller.filter.submit.click();
	};
};