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

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Income.origin.save(origin);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
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

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let origins = await Income.origin.filter(origin);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!origins){ return false };

		document.getElementById("income-origin-filter-div").style.display = "";

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("income-origin-filter-box", Income.origin.view.filter, origins, pagination); });
	});
}

Income.origin.controller.show = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let origin = await Income.origin.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!origin){ return false };

	Income.origin.view.show(origin);
};

Income.origin.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let origin = await Income.origin.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!origin){ return false };

	document.getElementById("income-origin-create-form").elements.namedItem("id").value = origin.id;
	document.getElementById("income-origin-create-form").elements.namedItem("category-id").value = origin.category_id;
	document.getElementById("income-origin-create-form").elements.namedItem("name").value = origin.name;
};

Income.origin.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a origem?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Income.origin.delete(id)){ return false };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Income.origin.controller.filter.submit.click();
	};
};