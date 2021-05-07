Ecommerce.sale.controller = {};

Ecommerce.sale.controller.save = document.getElementById("ecommerce-sale-create-submit");
if(Ecommerce.sale.controller.save){
	Ecommerce.sale.controller.save.addEventListener("click", async event => {
		for(let i in Ecommerce.sale.package.kart.items){
			for(let j in Ecommerce.sale.package.product){
				if(Ecommerce.sale.package.kart.items[i].id == Ecommerce.sale.package.product[j].id){
					Ecommerce.sale.package.kart.items[i].products = Ecommerce.sale.package.product[j].items;
				};
			};
		};

		let sale = {
			id: document.getElementById("ecommerce-sale-create-form").elements.namedItem("id").value.trim(),
			origin: document.getElementById("ecommerce-sale-create-form").elements.namedItem("origin").value,
			datetime: lib.datetimeToTimestamp(document.getElementById("ecommerce-sale-create-form").elements.namedItem("datetime").value),
			code: document.getElementById("ecommerce-sale-create-form").elements.namedItem("code").value.trim(),
			customer_user: document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value.trim(),
			customer_name: document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value.trim(),
			customer_phone: document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-phone").value.trim(),
			tracker: document.getElementById("ecommerce-sale-create-form").elements.namedItem("tracker").value.trim(),
			status: document.getElementById("ecommerce-sale-create-form").elements.namedItem("status").value,
			obs: document.getElementById("ecommerce-sale-create-form").elements.namedItem("obs").value,
			products: JSON.stringify(Ecommerce.sale.product.kart.items),
			packages: JSON.stringify(Ecommerce.sale.package.kart.items)
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Ecommerce.sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		document.getElementById("ecommerce-sale-create-form").elements.namedItem("origin").value = "";
		lib.localStorage.remove("ecommerce-sale-origin");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("code").value = "";
		lib.localStorage.remove("ecommerce-sale-code");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value = "";
		lib.localStorage.remove("ecommerce-sale-customer-user");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value = "";
		lib.localStorage.remove("ecommerce-sale-customer-name");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-phone").value = "";
		lib.localStorage.remove("ecommerce-sale-customer-phone");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("datetime").value = "";
		lib.localStorage.remove("ecommerce-sale-datetime");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("tracker").value = "";
		lib.localStorage.remove("ecommerce-sale-tracker");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("status").value = "";
		lib.localStorage.remove("ecommerce-sale-status");
		document.getElementById("ecommerce-sale-create-form").elements.namedItem("obs").value = "";
		lib.localStorage.remove("ecommerce-sale-obs");
		Ecommerce.sale.product.kart.items = [];
		lib.localStorage.remove("ecommerce-sale-product-kart");
		Ecommerce.sale.package.kart.items = [];
		lib.localStorage.remove("ecommerce-sale-package-kart");

		Ecommerce.sale.product.kart.list(Ecommerce.sale.product.kart.variable, Ecommerce.sale.product.kart.props);
		Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);
		
		Ecommerce.sale.package.product = [];

		if(document.getElementById("ecommerce-sale-create-form").elements.namedItem("id").value){
			document.getElementById("ecommerce-sale-create-form").elements.namedItem("id").value = "";
			Ecommerce.sale.controller.filter.submit.click();
		};
	});
};

Ecommerce.sale.controller.filter = document.getElementById("ecommerce-sale-filter-form");
if(Ecommerce.sale.controller.filter){
	Ecommerce.sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			code: event.target.elements.namedItem("code").value,
			customer_name: event.target.elements.namedItem("customer").value,
			customer_user: event.target.elements.namedItem("customer").value,
			status: event.target.elements.namedItem("status").value,
			tracker: event.target.elements.namedItem("tracker").value,
			periodStart: lib.datetimeToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.datetimeToTimestamp(event.target.elements.namedItem("periodEnd").value)
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let sales = await Ecommerce.sale.filter(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sales) { return false };

		document.getElementById("ecommerce-sale-show-box").style.display = "none";

		Ecommerce.sale.view.filter(sales);
	});
};

Ecommerce.sale.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let sale = await Ecommerce.sale.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!sale) { return false };

	Ecommerce.sale.view.edit(sale);

	document.getElementById("ecommerce-sale-filter-box").style.display = "none";
};