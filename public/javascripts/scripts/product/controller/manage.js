Product.controller.manage = {};

Product.controller.manage.create = document.getElementById("product-create-form");
if(Product.controller.manage.create){
	document.getElementById("product-create-form").addEventListener("submit", async (event) => {
		event.preventDefault();
		event.target.elements.namedItem("submit").disabled = true;

		let product = {
			id: event.target.elements.namedItem("id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			size: event.target.elements.namedItem("size").value,
			brand: event.target.elements.namedItem("brand").value,
			status: event.target.elements.namedItem("status").value,
			image: event.target.elements.namedItem("image").value,
			announcement: event.target.elements.namedItem("announcement").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		product = await Product.save(product, "product-create-form");
		event.target.elements.namedItem("submit").disabled = false;
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!product){ return false };

		// document.getElementById("product-filter-form").elements.namedItem("name").value = product.name;
		document.getElementById("product-filter-form").submit.click();

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("code").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("color").value = "";
		event.target.elements.namedItem("size").value = "";
		event.target.elements.namedItem("brand").value = "";
		event.target.elements.namedItem("status").value = "";
		event.target.elements.namedItem("image").value = "";
		event.target.elements.namedItem("announcement").value = "";
	});
};

Product.controller.manage.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let product = await Product.findById(id);
	if(!product){ return false };

	document.getElementById('product-create-form').elements.namedItem("id").value = product.id;
	document.getElementById('product-create-form').elements.namedItem("name").value = product.name;
	document.getElementById('product-create-form').elements.namedItem("code").value = product.code;
	document.getElementById('product-create-form').elements.namedItem("color").value = product.color;
	document.getElementById('product-create-form').elements.namedItem("size").value = product.size;
	document.getElementById('product-create-form').elements.namedItem("brand").value = product.brand;
	document.getElementById('product-create-form').elements.namedItem("status").value = product.status;
	document.getElementById('product-create-form').elements.namedItem("image").value = product.image;
	document.getElementById('product-create-form').elements.namedItem("announcement").value = product.announcement;

	document.getElementById('ajax-loader').style.visibility = 'hidden';
};

Product.controller.manage.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		if(!await Product.delete(id)){ return false };
		
		document.getElementById("product-filter-form").submit.click();
		
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	};
};

Product.controller.manage.show = async (product_id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';

	document.getElementById("product-feedstock-add-form").elements.namedItem("id").value = "";
	document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").disabled = false;
	
	document.getElementById('product-manage-image-box').style.display = 'block';
	document.getElementById("product-manage-info-box").style.display = "block";
	document.getElementById("product-manage-menu-box").style.display = "block";
	
	document.getElementById("product-feedstock-box").style.display = "none";
	document.getElementById("product-feedstock-add-box").style.display = "none";

	let product = await Product.findById(product_id);
	if(!product){ return false };

	Product.view.manage.menu(product);
	Product.view.manage.info(product, "product-manage-info-title", "product-manage-info-table");
	
	const pagination = { pageSize: 1, page: 0 };
	$(() => { lib.carousel.execute("product-manage-image-div", Product.view.manage.image.show, product.images, pagination); });

	document.getElementById('ajax-loader').style.visibility = 'hidden';
};