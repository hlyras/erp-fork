Ecommerce.sale.controller = {};

Ecommerce.sale.controller.filter = document.getElementById("ecommerce-sale-filter-form");
if (Ecommerce.sale.controller.filter) {
	Ecommerce.sale.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let sale = {
			periodStart: lib.datetimeToTimestamp(lib.sanitize(e.target.periodStart.value)),
			periodEnd: lib.datetimeToTimestamp(lib.sanitize(e.target.periodEnd.value)),
			origin: lib.sanitize(e.target.origin.value),
			code: lib.sanitize(e.target.code.value),
			customer_name: lib.sanitize(e.target.customer_name.value),
			customer_user: lib.sanitize(e.target.customer_user.value),
			status: lib.sanitize(e.target.status.value),
			tracker: lib.sanitize(e.target.tracker.value)
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