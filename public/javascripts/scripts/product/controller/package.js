Product.controller.package = {};

Product.controller.package.create = document.getElementById("product-package-create-form");
if(Product.controller.package.create){
	Product.controller.package.create.addEventListener("submit", async event => {
		event.preventDefault();

		let package = {
			id: event.target.elements.namedItem("id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			price: event.target.elements.namedItem("price").value,
			weight: event.target.elements.namedItem("weight").value,
			image: event.target.elements.namedItem("image").value,
			announcement: event.target.elements.namedItem("announcement").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		package = await Product.package.save(package);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!package){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("code").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("color").value = "";
		event.target.elements.namedItem("price").value = "0.00";
		event.target.elements.namedItem("weight").value = "";
		event.target.elements.namedItem("image").value = "";
		event.target.elements.namedItem("announcement").value = "";

		document.getElementById("product-package-show-box").style.display = "none";
		document.getElementById("product-package-filter-form").submit.click();
	});
};

Product.controller.package = {};

Product.controller.package.filter = document.getElementById("product-package-filter-form");
if(Product.controller.package.filter){
	Product.controller.package.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let package = {
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value
		};

		let packages = await API.response(Product.package.filter, package);
		if(!packages) { return false };

		packages = lib.sort(packages, "code");

		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("product-package-filter-box", Product.view.package.filter, packages, pagination); }());
	});
};

Product.controller.package.product = {};

Product.controller.package.product.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let product = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};

		let properties = ["code", "name", "color", "size"];

		if(product.name.length > 2){
			let products = await API.response(Product.filter, product);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};

Product.controller.package.show = async (package_id) => {
	let package = await API.response(Product.package.findById, package_id);
	if(!package){ return false };

	document.getElementById("product-package-id").value = package_id;
	Product.view.package.show(package);

	for(i in package.products){
		let product_info = lib.splitTextBy(package.products[i].product_info, " | ");
		package.products[i].code = product_info[0];
		package.products[i].name = product_info[1];
		package.products[i].color = product_info[2];
		package.products[i].size = product_info[3];
	};

	Product.package.product.kart.items = package.products;
	Product.package.product.kart.update("code");
	Product.package.product.kart.list("Product.package.product.kart", Product.package.product.kart.props);
};

Product.controller.package.product.update = async () => {
	let package = {
		id: document.getElementById("product-package-id").value,
		products: JSON.stringify(Product.package.product.kart.items)
	};

	package = await API.response(Product.package.product.update, package);
	if(!package){ return false };

	Product.package.product.kart.update("code");
	Product.package.product.kart.list("Product.package.product.kart", Product.package.product.kart.props);
};

Product.controller.package.edit = async (id) => {
	let package = await API.response(Product.package.findById, id);
	if(!package){ return false };

	document.getElementById('product-package-create-form').elements.namedItem("id").value = package.id;
	document.getElementById('product-package-create-form').elements.namedItem("code").value = package.code;
	document.getElementById('product-package-create-form').elements.namedItem("name").value = package.name;
	document.getElementById('product-package-create-form').elements.namedItem("color").value = package.color;
	document.getElementById('product-package-create-form').elements.namedItem("price").value = package.price;
	document.getElementById('product-package-create-form').elements.namedItem("weight").value = package.weight;
	document.getElementById('product-package-create-form').elements.namedItem("image").value = package.image;
	document.getElementById('product-package-create-form').elements.namedItem("announcement").value = package.announcement;
};

Product.controller.package.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o pacote?');
	if(r){
		let response = await API.response(Product.package.delete, id);
		if(!response){ return false };

		document.getElementById("product-package-show-box").style.display = "none";
		document.getElementById("product-package-filter-form").submit.click();
	};
};

Product.package.product.kart = new lib.kart("product-package-product-kart", "Product.package.product.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"size":"Tamanho"}]);

Product.package.product.kart.add = document.getElementById("product-package-product-kart-form");
if(Product.package.product.kart.add){
	Product.package.product.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("product-package-product-kart-form").elements.namedItem("product").readOnly){ 
			return alert("Produto inválido");
		};

		let product = document.getElementById("product-package-product-kart-form").elements.namedItem("product");
		let splitedProduct = product.value.split(" | ");
		let amount = document.getElementById("product-package-product-kart-form").elements.namedItem("amount").value;

		if(splitedProduct.length < 3 || !splitedProduct){
			alert("É necessário selecionar um produto.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade do produto.");
			return;
		};

		product = {
			id: parseInt(product.dataset.id),
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount)
		};

		Product.package.product.kart.insert("id", product);
		Product.package.product.kart.update("code");
		Product.package.product.kart.list("Product.package.product.kart", Product.package.product.kart.props);

		document.getElementById("product-package-product-kart-form").elements.namedItem('product').value = "";
		document.getElementById("product-package-product-kart-form").elements.namedItem('product').dataset.id = "";
		document.getElementById("product-package-product-kart-form").elements.namedItem('amount').value = "";
	});
};

Product.controller.package.image = {};

Product.controller.package.image.add = async (package_id) => {
	let image_url = prompt("Preencha com a URL da imagem");
	if(image_url){
		if(image_url.length < 7){
			return alert('URL inválida!');
		};
		if(image_url.length > 200){
			return alert('URL inválida!');
		};

		let img = '<img src="'+ image_url +'"/>';

		$(img).on("load", async () =>  {
			if(!await API.response(Product.package.image.add, package_id, image_url)){ return false };

			await Product.controller.package.show(package_id);
		}).bind('error', () => {
			return alert('URL inválida!');
		});
	};
};

Product.controller.package.image.remove = async (image_id, package_id) => {
	let r = confirm("Deseja realmente excluir a image?");
	if(r){
		if(!await API.response(Product.package.image.remove, image_id)){ return false };
		Product.controller.package.show(package_id);
	};
};

Product.controller.package.price = {};

Product.controller.package.price.updatePrice = async (price_id, input_id) => {
	let price = {
		id: price_id,
		price: parseFloat(document.getElementById(input_id).value)
	};

	if(isNaN(price.price) || price.price < 0){
		document.getElementById(input_id).value = document.getElementById(input_id).dataset.price;
		return alert('Preço inválido');
	};

	price = await API.response(Product.package.price.update, price);
	if(!price){ return false };
};