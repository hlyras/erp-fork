Ecommerce.sale.controller = {};

Ecommerce.sale.controller.filter = document.getElementById("ecommerce-sale-filter-form");
if(Ecommerce.sale.controller.filter){
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
		if(!sales) { return false }

		let service_orders = [];

		document.getElementById("ecommerce-sale-show-box").style.display = "none";

		Ecommerce.sale.view.manage.filter(sales, sale.status, service_orders);
	});
};

Ecommerce.sale.controller.manage = {};

Ecommerce.sale.controller.manage.show = async (id) => {
	let sale = await API.response(Ecommerce.sale.findById, id);
	if(!sale) { return false };

	Ecommerce.sale.view.manage.show(sale);

	document.getElementById('ecommerce-sale-os-create-form').style.display = "none";
};

Ecommerce.sale.controller.manage.changeStatus = async (id) => {
	let sale = {
		id: id,
		status: document.getElementById("ecommerce-sale-manage-change-status-select-id"+id).value
	};

	let r = confirm("Deseja realmente atualizar o status da venda.");

	if(sale.id && r){
		sale = await API.response(Ecommerce.sale.changeStatus, sale);
		if(!sale) { return false };

		Ecommerce.sale.controller.filter.submit.click();
	};
};