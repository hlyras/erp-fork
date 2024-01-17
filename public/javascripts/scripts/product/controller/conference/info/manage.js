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

		lib.display("product-edit-box", "none");
		lib.display("product-detail-box", "none");
		lib.display("product-filter-box", "");

		Product.conference.view.filter(products);
	});
};

Product.conference.controller.detail = async (product_id) => {
	let product = await API.response(Product.findById, product_id);
	if (!product) { return false };

	lib.display("product-edit-box", "none");
	lib.display("product-filter-box", "none");
	lib.display("product-detail-box", "");

	Product.conference.view.detail(product);
};

Product.conference.controller.edit = async (product_id) => {
	lib.display("product-detail-box", "none");
	lib.display("product-filter-box", "none");
	lib.display("product-edit-box", "");

	let product = await API.response(Product.findById, product_id);
	if (!product) { return false };

	Product.conference.view.edit(product);
};

document.getElementById("product-edit-form").addEventListener("submit", async e => {
	e.preventDefault();

	let product = {
		id: e.target.elements.namedItem("product-id").value,
		conference_video: lib.replaceChar(e.target.elements.namedItem("conference-video").value, 'watch?v=', 'embed/'),
		conference_obs: e.target.elements.namedItem("conference-obs").value
	};

	let response = await API.response(Product.conference.update, product);
	if (!response) { return false };

	e.target.elements.namedItem("conference-video").value = product.conference_video;
});
