Outcome.category.controller = {};

Outcome.category.controller.create = document.getElementById("outcome-category-create-form");
if(Outcome.category.controller.create){
	Outcome.category.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Outcome.category.save(category);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
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

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let categories = await Outcome.category.filter(category);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!categories){ return false };
		
		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("outcome-category-filter-box", Outcome.category.view.filter, categories, pagination); });
	});
}

Outcome.category.controller.show = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let category = await Outcome.category.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!category){ return false };
	
	document.getElementById("outcome-origin-create-form").elements.namedItem("category-id").value = category.id;
	document.getElementById("outcome-origin-filter-form").elements.namedItem("category-id").value = category.id;
	
	document.getElementById("outcome-origin-create-form").style.display = "";
	
	Outcome.category.view.show(category);
	Outcome.origin.controller.filter.submit.click();
};

Outcome.category.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let category = await Outcome.category.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!category){ return false };

	document.getElementById("outcome-category-create-form").elements.namedItem("id").value = category.id;
	document.getElementById("outcome-category-create-form").elements.namedItem("name").value = category.name;
};

Outcome.category.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a categoria?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Outcome.category.delete(id)){ return false };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Outcome.category.controller.filter.submit.click();
	};
};