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
			id: "",
			origin: document.getElementById("ecommerce-sale-create-form").elements.namedItem("origin").value,
			datetime: document.getElementById("ecommerce-sale-create-form").elements.namedItem("datetime").value,
			code: document.getElementById("ecommerce-sale-create-form").elements.namedItem("code").value,
			customer_user: document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value,
			customer_name: document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value,
			tracker: document.getElementById("ecommerce-sale-create-form").elements.namedItem("tracker").value,
			status: document.getElementById("ecommerce-sale-create-form").elements.namedItem("status").value,
			products: JSON.stringify(Ecommerce.sale.product.kart.items),
			packages: JSON.stringify(Ecommerce.sale.package.kart.items)
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		sale = await Ecommerce.sale.save(sale);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!sale) { return false };

		console.log(sale);
	});
};

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

		console.log(sale);
	});
};
