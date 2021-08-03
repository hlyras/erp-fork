Outcome.controller = {};

Outcome.controller.create = document.getElementById("outcome-create-form");
if(Outcome.controller.create){
	Outcome.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let outcome = {
			id: event.target.elements.namedItem("id").value,
			date: lib.dateToTimestamp(event.target.elements.namedItem("date").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			income_category_id: event.target.elements.namedItem("income-category-id").value,
			cost: event.target.elements.namedItem("cost").value,
			description: event.target.elements.namedItem("description").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		outcome = await Outcome.save(outcome);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!outcome) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("date").value = "";
		event.target.elements.namedItem("category-id").value = "";
		event.target.elements.namedItem("origin-id").value = "";
		event.target.elements.namedItem("income-category-id").value = "";
		event.target.elements.namedItem("cost").value = "0.00";
		event.target.elements.namedItem("description").value = "";

		Outcome.controller.filter.submit.click();
	});
}

Outcome.controller.filter = document.getElementById("outcome-filter-form");
if(Outcome.controller.filter){
	Outcome.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let outcome = {
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			income_category_id: event.target.elements.namedItem("income-category-id").value,
			status: event.target.elements.namedItem("status").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		outcomes = await Outcome.filter(outcome);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!outcomes) { return false };

		document.getElementById("outcome-show-box").style.display = "none";

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("outcome-filter-box", Outcome.view.filter, outcomes, pagination); });
	});
}

Outcome.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let outcome = await Outcome.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!outcome){ return false };

	if(outcome.expense_id){ return alert("Não é possível editar saídas criadas por despesas."); };

	document.getElementById("outcome-create-form").elements.namedItem("id").value = outcome.id;
	document.getElementById("outcome-create-form").elements.namedItem("date").value = lib.convertDate(lib.timestampToDate(outcome.date));
	document.getElementById("outcome-create-form").elements.namedItem("category-id").value = outcome.category_id;
	await Outcome.controller.fillOriginSelect(document.getElementById("outcome-create-form").elements.namedItem("category-id").value, "outcome-create-form");
	document.getElementById("outcome-create-form").elements.namedItem("origin-id").value = outcome.origin_id;
	document.getElementById("outcome-create-form").elements.namedItem("income-category-id").value = outcome.income_category_id;
	document.getElementById("outcome-create-form").elements.namedItem("description").value = outcome.description;
	document.getElementById("outcome-create-form").elements.namedItem("cost").value = outcome.cost;
};

Outcome.controller.delete = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let outcome = await Outcome.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!outcome){ return false };

	console.log(outcome);

	if(outcome.expense_id){ return alert("Não é possível excluir saídas criadas por despesas."); };

	let r = confirm('Deseja realmente excluir a saída?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Outcome.delete(id)){ return false };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Outcome.controller.filter.submit.click();
	}
};

Outcome.controller.show = async (id) => {
	document.getElementById("ajax-loader").style.visibility = "visible";
	outcome = await Outcome.findById(id);
	document.getElementById("ajax-loader").style.visibility = "hidden";
	if(!outcome) { return false };

	document.getElementById("outcome-filter-box").style.display = "none";

	Outcome.view.show(outcome);
};

Outcome.controller.fillOriginSelect = async (category_id, form) => {
	let html = "";
	if(category_id){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let origins = await Outcome.origin.findByCategoryId(category_id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!origins) { return false };

		html += "<option value=''>Origem</option>";
		for(let i in origins){ html += "<option value='"+origins[i].id+"'>"+origins[i].name+"</option>"; };
	} else {
		html += "<option value=''>Origem</option>";
	}
	document.getElementById(form).elements.namedItem("origin-id").innerHTML = html;
};