Ecommerce.sale.controller = {};

Ecommerce.sale.controller.save = document.getElementById("ecommerce-sale-create-submit");
if (Ecommerce.sale.controller.save) {
	Ecommerce.sale.controller.save.addEventListener("click", async e => {
		for (let i in Ecommerce.sale.package.kart.items) {
			for (let j in Ecommerce.sale.package.product) {
				if (Ecommerce.sale.package.kart.items[i].id == Ecommerce.sale.package.product[j].id) {
					Ecommerce.sale.package.kart.items[i].products = Ecommerce.sale.package.product[j].items;
				};
			};
		};

		let sale = {
			id: lib.sanitize(e.target.id.value).trim() || null,
			origin: lib.sanitize(e.target.origin.value) || null,
			datetime: lib.datetimeToTimestamp(lib.sanitize(e.target.datetime.value)) || null,
			code: lib.sanitize(e.target.code.value).trim() || null,
			customer_user: lib.sanitize(document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value).trim() || null,
			customer_name: lib.sanitize(document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value).trim() || null,
			customer_phone: lib.sanitize(document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-phone").value).trim() || null,
			tracker: lib.sanitize(e.target.tracker.value).trim() || null,
			status: lib.sanitize(e.target.status.value) || null,
			obs: lib.sanitize(e.target.obs.value) || null,
			products: JSON.stringify(Ecommerce.sale.product.kart.items) || null,
			packages: JSON.stringify(Ecommerce.sale.package.kart.items) || null
		};

		sale = await API.response(Ecommerce.sale.save, sale);
		if (!sale) { return false };

		e.target.origin.value = "";
		e.target.code.value = "";
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value = "";
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value = "";
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-phone").value = "";
		e.target.datetime.value = "";
		e.target.tracker.value = "";
		e.target.status.value = "";
		e.target.obs.value = "";
		Ecommerce.sale.product.kart.items = [];
		Ecommerce.sale.package.kart.items = [];

		Ecommerce.sale.product.kart.list(Ecommerce.sale.product.kart.variable, Ecommerce.sale.product.kart.props);
		Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);

		Ecommerce.sale.package.product = [];

		if (document.getElementById("ecommerce-sale-create-form").elements.namedItem("id").value) {
			document.getElementById("ecommerce-sale-create-form").elements.namedItem("id").value = "";
			Ecommerce.sale.controller.filter.submit.click();
		};
	});
};

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
		if (!sales) { return false }

		document.getElementById("ecommerce-sale-show-box").style.display = "none";

		Ecommerce.sale.view.filter(sales);
	});
};

Ecommerce.sale.controller.edit = async (id) => {
	let sale = await API.response(Ecommerce.sale.findById, id);
	if (!sale) { return false };

	Ecommerce.sale.view.edit(sale);

	document.getElementById("ecommerce-sale-filter-box").style.display = "none";
};