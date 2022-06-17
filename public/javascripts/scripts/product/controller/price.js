Product.price.controller = {};

Product.price.controller.filter = document.getElementById("product-price-filter-form");
if(Product.price.controller.filter){
	Product.price.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let product = {
			name: event.target.elements.namedItem("name").value,
			brand: "J.A Rio Militar",
			category_id: event.target.elements.namedItem("category_id").value
		};

		let response = await API.response(Product.price.filter, product);
		if(!response){ return false };

		let catalog_products = [...response.products];

		for(let i in response.packages){
			response.packages[i].pack = true;
			catalog_products.push(response.packages[i]);
		};

		catalog_products = lib.sort(catalog_products, "code");

		const pagination = { pageSize: 2, page: 0};
		(function(){ lib.carousel.execute("product-price-filter-box", Product.price.view.filter, catalog_products, pagination); }());
	});
};

Product.price.controller.updatePrice = async (price_id, input_id) => {
	let price = {
		id: price_id,
		price: parseFloat(document.getElementById(input_id).value)
	};

	if(isNaN(price.price) || price.price < 0){
		document.getElementById(input_id).value = document.getElementById(input_id).dataset.price;
		return alert('Preço inválido');
	};

	price = await API.response(Product.price.update, price);
	if(!price){ return false };
};

Product.price.category.controller = {};

Product.price.category.controller.create = document.getElementById("product-price-category-create-form");
if(Product.price.category.controller.create){
	Product.price.category.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value,
		};

		category = await API.response(Product.price.category.save, category);
		if(!category){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";

		document.getElementById("product-price-category-show-box").style.display = "none";
		document.getElementById("product-price-category-filter-form").submit.click();
	});
};

Product.price.category.controller.filter = document.getElementById("product-price-category-filter-form");
if(Product.price.category.controller.filter){
	Product.price.category.controller.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value
		};

		let categories = await API.response(await Product.price.category.filter, category);
		if(!categories) { return false };

		categories = lib.sort(categories, "id");

		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("product-price-category-filter-box", Product.price.category.view.filter, categories, pagination); }());
	});
};

Product.price.category.controller.show = async (category_id) => {
	let category = await API.response(await Product.price.category.findById, category_id);
	if(!category){ return false };

	document.getElementById("product-price-category-show-id").value = category_id;

	Product.price.category.view.show(category);

	document.getElementById("product-price-category-show-box").style.display = "";
	// const pagination = { pageSize: 10, page: 0};
	// (function(){ lib.carousel.execute("product-price-category-show-box", Product.price.category.view.showProducts, category.products, pagination); }());
};

Product.price.category.controller.edit = async (id) => {
	let category = await API.response(await Product.price.category.findById, id);
	if(!category){ return false };

	document.getElementById('product-price-category-create-form').elements.namedItem("id").value = category.id;
	document.getElementById('product-price-category-create-form').elements.namedItem("name").value = category.name;
};

Product.price.category.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a tabela?');
	if(r){
		let response = await API.response(await Product.price.category.delete, id);
		if(!response){ return false };

		// document.getElementById("product-package-show-box").style.display = "none";
		// document.getElementById("product-package-filter-form").submit.click();
	};
};

Product.price.category.controller.home = {};

Product.price.category.controller.home.filter = document.getElementById("product-price-category-home-filter-form");
if(Product.price.category.controller.home.filter){
	Product.price.category.controller.home.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let category = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value,
		};

		let categories = await API.response(Product.price.category.filter, category);
		if(!categories) { return false };

		categories = lib.sort(categories, "id");

		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("product-price-category-home-filter-box", Product.price.category.view.home.filter, categories, pagination); }());
	});
};

Product.price.category.controller.home.show = async (category_id) => {
	let category = await API.response(Product.price.category.findById, category_id);
	if(!category){ return false };

	document.getElementById("product-price-category-home-show-id").value = category_id;

	// Product.price.category.view.home.show(category);

	document.getElementById("product-price-category-home-show-box").style.display = "";
	// const pagination = { pageSize: 10, page: 0};
	// (function(){ lib.carousel.execute("product-price-category-show-box", Product.price.category.view.showProducts, category.products, pagination); }());
};