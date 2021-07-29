Income.controller = {};

Income.controller.create = document.getElementById("income-create-form");
if(Income.controller.create){
	Income.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let income = {
			id: event.target.elements.namedItem("id").value,
			date: lib.dateToTimestamp(event.target.elements.namedItem("date").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			cash: event.target.elements.namedItem("cash").value,
			description: event.target.elements.namedItem("description").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		income = await Income.save(income);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!income) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("date").value = "";
		event.target.elements.namedItem("category-id").value = "";
		event.target.elements.namedItem("origin-id").value = "";
		event.target.elements.namedItem("cash").value = "0.00";
		event.target.elements.namedItem("description").value = "";

		Income.controller.filter.submit.click();
	});
}

Income.controller.filter = document.getElementById("income-filter-form");
if(Income.controller.filter){
	Income.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let income = {
			id: "",
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		incomes = await Income.filter(income);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!incomes) { return false };

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("income-filter-box", Income.view.filter, incomes, pagination); });
	});
}

Income.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let income = await Income.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!income){ return false };

	document.getElementById("income-create-form").elements.namedItem("id").value = income.id;
	document.getElementById("income-create-form").elements.namedItem("date").value = lib.convertDate(lib.timestampToDate(income.date));
	document.getElementById("income-create-form").elements.namedItem("category-id").value = income.category_id;
	await Income.controller.fillOriginSelect(document.getElementById("income-create-form").elements.namedItem("category-id").value, "income-create-form");
	document.getElementById("income-create-form").elements.namedItem("origin-id").value = income.origin_id;
	document.getElementById("income-create-form").elements.namedItem("description").value = income.description;
	document.getElementById("income-create-form").elements.namedItem("cash").value = income.cash;
};

Income.controller.show = async (id) => {
	let income = await API.response(Income.findById, id);
	if(!income){ return false };

	Income.view.show(income);
};

Income.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a entrada?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Income.delete(id)){ return false };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Income.controller.filter.submit.click();
	}
};

Income.controller.fillOriginSelect = async (category_id, form) => {
	let html = "";
	if(category_id){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let origins = await Income.origin.findByCategoryId(category_id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!origins) { return false };

		html += "<option value=''>Origem</option>";
		for(let i in origins){ html += "<option value='"+origins[i].id+"'>"+origins[i].name+"</option>"; };
	} else {
		html += "<option value=''>Origem</option>";
	}
		
	document.getElementById(form).elements.namedItem("origin-id").innerHTML = html;
};