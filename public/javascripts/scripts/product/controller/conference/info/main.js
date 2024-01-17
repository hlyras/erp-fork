Product.conference.controller = {};

Product.conference.controller.filter = document.getElementById("product-filter-form");
if (Product.conference.controller.filter) {
	document.getElementById("product-filter-form").addEventListener("submit", async (e) => {
		e.preventDefault();

		let product = {
			name: e.target.name.value || null,
			code: e.target.code.value || null,
			color: e.target.color.value || null
		};

		let products = await API.response(Product.filter, product);
		if (!products) { return false; }

		lib.display("product-filter-box", "");
		lib.display("product-detail-box", "none");

		Product.conference.view.filter(products);
	});
};

Product.conference.controller.detail = async (product_id) => {
	let product = await API.response(Product.findById, product_id);
	if (!product) { return false };

	lib.display("product-detail-box", "");
	lib.display("product-filter-box", "none");

	Product.conference.view.detail(product);
};

Product.conference.controller.filter.submit.click();