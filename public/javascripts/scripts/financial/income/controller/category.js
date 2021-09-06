Income.category.controller = {};

Income.category.controller.create = document.getElementById("income-category-create-form");
if(Income.category.controller.create){
	Income.category.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value
		};

		let response = await API.response(Income.category.save, category);
		if(!response){ return false };
		
		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		
		document.getElementById("income-category-show-box").style.display = "none";
		
		Income.category.controller.filter.submit.click();
	});
}

Income.category.controller.filter = document.getElementById("income-category-filter-form");
if(Income.category.controller.filter){
	Income.category.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			name: event.target.elements.namedItem("name").value
		};

		let categories = await API.response(Income.category.filter, category);
		if(!categories){ return false };

		document.getElementById("income-category-show-box").style.display = "none";
		
		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("income-category-filter-box", Income.category.view.filter, categories, pagination); }());
	});
}

Income.category.controller.show = async (id) => {
	let category = await API.response(Income.category.findById, id);
	if(!category){ return false };

	document.getElementById("income-category-show-box").style.display = "";
	document.getElementById("income-origin-filter-div").style.display = "none";
	document.getElementById("income-origin-filter-box").children.namedItem("carousel-navigation").style.display = "none";

	document.getElementById("income-origin-create-form").elements.namedItem("category-id").value = category.id;
	document.getElementById("income-origin-filter-form").elements.namedItem("category-id").value = category.id;
	
	Income.category.view.show(category);

	Income.origin.controller.filter.submit.click();
};

Income.category.controller.edit = async (id) => {
	let category = await API.response(Income.category.findById, id);
	if(!category){ return false };

	document.getElementById("income-category-show-box").style.display = "none";
	document.getElementById("income-category-create-form").elements.namedItem("id").value = category.id;
	document.getElementById("income-category-create-form").elements.namedItem("name").value = category.name;
};

Income.category.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a categoria?');
	if(r){
		if(!await API.response(Income.category.delete, id)){ return false };
		
		document.getElementById("income-category-show-box").style.display = "none";
		Income.category.controller.filter.submit.click();
	};
};