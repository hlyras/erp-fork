Sale.deliver.controller = {};

Sale.deliver.controller.filter = document.getElementById("sale-filter-form");
if(Sale.deliver.controller.filter){
	Sale.deliver.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			id: event.target.elements.namedItem("id").value,
			customer_name: event.target.elements.namedItem("customer_name").value,
			status: event.target.elements.namedItem("status").value
		};

		let sales = await API.response(Sale.filter, sale);
		if(!sales){ return false; }

  	lib.display("sale-filter-box", "");
  	lib.display("sale-detail-box", "none");

  	Sale.deliver.view.filter(sales);
	});
};

Sale.deliver.controller.filter.submit.click();

Sale.deliver.controller.detail = async (sale_id, status) => {
	let sale = await API.response(Sale.findById, sale_id);

	Sale.deliver.view.detail(sale, status);

	document.getElementById("sale-filter-box").style.display = "none";
	document.getElementById("sale-detail-box").style.display = "";
};

Sale.deliver.controller.confirm = async (sale_id, input) => {
	if(!confirm("Tem certeza que deseja confirmar a entrega?")){ return false; }
	
	let response = await API.response(Sale.deliver.confirm, sale_id);
	if(!response) { return false; }

	input.style.display = "none";

	let detail_div = document.getElementById("sale-detail-div");
	detail_div.append(lib.element.create("input", {
		type: "button",
		onclick: `lib.openExternalLink('${window.location.origin}/sale/deliver/print/${sale_id}');`,
		// onclick: `openPrintWindow('/sale/deliver/print/${sale_id}', 'to_print', 'width=700,height=400,_blank');`,
		class: "box b3 ground lucida-grande em11 bold border-st box-hover radius-5 padding-10 margin-top-10 margin-bottom-10 center pointer",
		value: "Imprimir etiqueta"
	}));
};