Ecommerce.sale.controller = {};

Ecommerce.sale.controller.filter = document.getElementById("ecommerce-sale-filter-form");
if(Ecommerce.sale.controller.filter){
	Ecommerce.sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			code: event.target.elements.namedItem("code").value,
			customer: event.target.elements.namedItem("customer").value,
			status: event.target.elements.namedItem("status").value,
			tracker: event.target.elements.namedItem("tracker").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Ecommerce.sale.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sales) { return false };

		document.getElementById("ecommerce-sale-show-box").style.display = "none";

		Ecommerce.sale.view.triage.filter(sales);
	});
};

Ecommerce.sale.controller.triage = {};

Ecommerce.sale.controller.triage.show = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let sale = await Ecommerce.sale.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!sale) { return false };

	Ecommerce.sale.view.triage.show(sale);
};

Ecommerce.sale.controller.update = async (sale_id, status) => {
	let sale = {
		id: sale_id,
		status: status
	};

	document.getElementById('ajax-loader').style.visibility = 'visible';
	sale = await Ecommerce.sale.update(sale);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!sale) { return false };
	
	Ecommerce.sale.controller.filter.submit.click();
};