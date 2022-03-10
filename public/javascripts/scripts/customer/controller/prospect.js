Prospect.controller = {};

Prospect.controller.save = document.getElementById("prospect-create-form");
if(Prospect.controller.save){
	Prospect.controller.save.addEventListener("submit", async e => {
		e.preventDefault();

		const prospect = {
			brand: lib.capitalizeFirst(e.target.elements.namedItem("brand").value),
			state: e.target.elements.namedItem("state").value,
			phone: e.target.elements.namedItem("phone").value,
			social_media: e.target.elements.namedItem("social-media").value,
			product_approach: e.target.elements.namedItem("product-approach").value
		};

		let response = await API.response(Prospect.save, prospect);
		if(!response) { return false; }

		e.target.elements.namedItem("brand").value = "";
		e.target.elements.namedItem("state").value = "";
		e.target.elements.namedItem("phone").value = "";
		e.target.elements.namedItem("social-media").value = "";
		e.target.elements.namedItem("product-approach").value = "";

		Prospect.controller.filter.submit.click();
	});
}

Prospect.controller.filter = document.getElementById("prospect-filter-form");
if(Prospect.controller.filter){
	Prospect.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		const prospect = {
			brand: e.target.elements.namedItem("brand").value,
			state: e.target.elements.namedItem("state").value,
			periodStart: lib.dateToTimestamp(e.target.elements.namedItem("period-start").value),
			periodEnd: parseInt(lib.dateToTimestamp(e.target.elements.namedItem("period-end").value)) + parseInt(lib.timestampDay())
		};

		let prospects = await API.response(Prospect.filter, prospect);
		if(!prospects) { return false; }

		Prospect.view.filter(prospects);
	});
}

Prospect.controller.confirmContact1 = async (id) => {
	let prospect = {
		id: id,
		manager: document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('manager').value,
		email: document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('mail').value,
		cellphone: document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('cellphone').value,
		comment: document.getElementById('prospect-form-'+id).getElementsByTagName('textarea').namedItem('comment').value,
		status: document.getElementById('prospect-form-'+id).getElementsByTagName('select').namedItem('status').value
	};

	if(prospect.manager && prospect.email && prospect.cellphone && prospect.status == "Contatar loja novamente"){
		let r = confirm("ATENÇÃO: \n Você já tem todas as informações para contatar o responsável, tem certeza que deseja contatar a loja novamente?");
		if(!r){ return; }
	}

	let response = await API.response(Prospect.confirmContact1, prospect);
	if(!response) { return false };

	document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('manager').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('mail').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('cellphone').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('textarea').namedItem('comment').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('select').namedItem('status').value = "";

	Prospect.controller.filter.submit.click();
};

Prospect.controller.confirmContact2 = async (id) => {
	let prospect = {
		id: id,
		manager: document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('manager').value,
		email: document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('mail').value,
		cellphone: document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('cellphone').value,
		comment: document.getElementById('prospect-form-'+id).getElementsByTagName('textarea').namedItem('comment').value,
		status: document.getElementById('prospect-form-'+id).getElementsByTagName('select').namedItem('status').value
	};

	if(prospect.manager && prospect.email && prospect.cellphone && prospect.status == "Contatar loja novamente"){
		let r = confirm("ATENÇÃO: \n Você já tem todas as informações para contatar o responsável, tem certeza que deseja contatar a loja novamente?");
		if(!r){ return; }
	}

	let response = await API.response(Prospect.confirmContact2, prospect);
	if(!response) { return false };
	
	document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('manager').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('mail').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('input').namedItem('cellphone').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('textarea').namedItem('comment').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('select').namedItem('status').value = "";

	Prospect.controller.filter.submit.click();
};

Prospect.controller.confirmContact3 = async (id) => {
	let prospect = {
		id: id,
		comment: document.getElementById('prospect-form-'+id).getElementsByTagName('textarea').namedItem('comment').value,
		status: document.getElementById('prospect-form-'+id).getElementsByTagName('select').namedItem('status').value
	};

	let response = await API.response(Prospect.confirmContact3, prospect);
	if(!response) { return false };
	
	document.getElementById('prospect-form-'+id).getElementsByTagName('textarea').namedItem('comment').value = "";
	document.getElementById('prospect-form-'+id).getElementsByTagName('select').namedItem('status').value = "";

	Prospect.controller.filter.submit.click();
};

Prospect.controller.sendMail = async (id, icon) => {
	let response = await API.response(Prospect.sendMail, id);
	if(!response) { return false };

	icon.remove();
};