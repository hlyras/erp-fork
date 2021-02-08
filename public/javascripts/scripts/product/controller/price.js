Product.price.controller = {};

Product.price.controller.updatePrice = async (price_id, input_id) => {
	let price = {
		id: price_id,
		price: parseFloat(document.getElementById(input_id).value)
	};

	if(isNaN(price.price) || price.price < 0){
		document.getElementById(input_id).value = document.getElementById(input_id).dataset.price;
		return alert('Preço inválido');
	};

	document.getElementById('ajax-loader').style.visibility = 'visible';
	price = await Product.price.update(price);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
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

		document.getElementById("ajax-loader").style.visibility = "visible";
		category = await Product.price.category.save(category);
		document.getElementById("ajax-loader").style.visibility = "hidden";
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
			name: event.target.elements.namedItem("name").value,
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let categories = await Product.price.category.filter(category);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!categories) { return false };

		categories = lib.sort(categories, "id");

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("product-price-category-filter-box", Product.price.category.view.filter, categories, pagination); });
	});
};

Product.price.category.controller.show = async (category_id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let category = await Product.price.category.findById(category_id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!category){ return false };

	document.getElementById("product-price-category-show-id").value = category_id;

	Product.price.category.view.show(category);

	document.getElementById("product-price-category-show-box").style.display = "";
	// const pagination = { pageSize: 10, page: 0};
	// $(() => { lib.carousel.execute("product-price-category-show-box", Product.price.category.view.showProducts, category.products, pagination); });
};

Product.price.category.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let category = await Product.price.category.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!category){ return false };

	document.getElementById('product-price-category-create-form').elements.namedItem("id").value = category.id;
	document.getElementById('product-price-category-create-form').elements.namedItem("name").value = category.name;
};

Product.price.category.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a tabela?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Product.price.category.delete(id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!response){ return false };

		// document.getElementById("product-package-show-box").style.display = "none";
		// document.getElementById("product-package-filter-form").submit.click();
	};
};