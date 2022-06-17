Sale.controller = {};

Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			id: event.target.elements.namedItem("id").value,
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_cnpj: event.target.elements.namedItem("customer_cnpj").value,
			shipment_method: event.target.elements.namedItem("shipment_method").value,
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value
		};

		let sales = await API.response(Sale.filter, sale);
		if(!sales){ return false; }

  	lib.display("sale-filter-box", "");
  	lib.display("sale-show-box", "none");
		if(document.getElementById("sale-edit-box")){ document.getElementById("sale-edit-box").style.display = "none"; };

		const setup = { pageSize: 10, page: 0, status: sale.status };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, setup); }())
	});
};

Sale.controller.show = async (sale_id) => {
	let sale = await API.response(Sale.findById, sale_id);
	if(!sale){ return false; }

	Sale.view.show(sale);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-show-box").style.display = "";
};

Sale.packment.controller = {};

Sale.packment.controller.confirm = document.getElementById("packment-confirm-form");
if(Sale.packment.controller.confirm){
	Sale.packment.controller.confirm.addEventListener("submit", async e => {
		e.preventDefault();

		let packmentInfo = {
			sale_id: e.target.elements.namedItem("sale-id").value,
			box_amount: e.target.elements.namedItem("box-amount").value
		};

		let r = confirm("Deseja realmente confirmar o embalo?");
		if(r){
			let response = await API.response(Sale.packment.confirm, packmentInfo);
			if(!response){ return false; }

			e.target.elements.namedItem("sale-id").value = "";
			e.target.elements.namedItem("box-amount").value = "";

			Sale.controller.filter.submit.click();
		};
	});
}

Sale.nf.controller = {};

Sale.nf.controller.save = async e => {
	e.preventDefault();

	let sale = {
		id: e.target.elements.namedItem("id").value,
		nf_code: e.target.elements.namedItem("code").value,
		nf: e.target.elements.namedItem("url").value
	};

	let r = confirm("Deseja confirmar anexo da Nota Fiscal?");

	if(r) {
		if(!e.target.elements.namedItem("code").value && !e.target.elements.namedItem("url").value) {
			r = confirm("Nenhuma Nota fiscal será incluída neste pedido, deseja prosseguir?");
			if(!r) { return false; }
			let response = await API.response(Sale.nf.save, sale);
			if(!response){ return false; };

			alert(response);
			Sale.controller.filter.submit.click();
		} else if(e.target.elements.namedItem("code").value && e.target.elements.namedItem("url").value.length > 10) {
			let response = await API.response(Sale.nf.save, sale);
			if(!response){ return false; };

			alert(response);
			Sale.controller.filter.submit.click();
		} else {
			!e.target.elements.namedItem("code").value && alert("Nº da NF é inválido");
			e.target.elements.namedItem("url").value.length < 10 && alert("URL da NF é inválida");
			return;
		}
	}
};