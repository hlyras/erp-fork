Ecommerce.sale.controller = {};

Ecommerce.sale.controller.filter = document.getElementById("ecommerce-sale-filter-form");
if (Ecommerce.sale.controller.filter) {
	Ecommerce.sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			periodStart: lib.datetimeToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.datetimeToTimestamp(event.target.elements.namedItem("periodEnd").value),
			origin: event.target.elements.namedItem("origin").value,
			code: event.target.elements.namedItem("code").value,
			customer_name: event.target.elements.namedItem("customer_name").value,
			customer_user: event.target.elements.namedItem("customer_user").value,
			status: event.target.elements.namedItem("status").value,
			tracker: event.target.elements.namedItem("tracker").value
		};

		let sales = await API.response(Ecommerce.sale.filter, sale);
		if (!sales) { return false };

		lib.display("ecommerce-sale-filter-box", "");
		lib.display("ecommerce-sale-show-box", "none");

		Ecommerce.sale.view.triage.filter(sales);
	});
};

Ecommerce.sale.controller.triage = {};

Ecommerce.sale.controller.triage.show = async (id) => {
	let sale = await API.response(Ecommerce.sale.findById, id);
	if (!sale) { return false };

	Ecommerce.sale.view.triage.show(sale);
};

Ecommerce.sale.controller.update = async (sale_id, status) => {
	let r = confirm("Deseja realmente confirmar o embalo?");
	if (r) {
		let sale = {
			id: sale_id,
			status: status
		};

		sale = await API.response(Ecommerce.sale.update, sale);
		if (!sale) { return false };

		Ecommerce.sale.controller.filter.submit.click();
	};
};