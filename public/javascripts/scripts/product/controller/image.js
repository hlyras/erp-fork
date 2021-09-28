Product.image.controller = {};

Product.image.controller.add = async (product_id) => {
	let image_url = prompt("Preencha com a URL da imagem");
	if(image_url){
		if(image_url.length < 7){ return alert('URL inválida!'); };
		if(image_url.length > 200){ return alert('URL inválida!'); };

		let img = new Image();
		img.src = image_url;

		img.onload = async () => {
			let image = { product_id: product_id, url: image_url };

			let response = await API.response(Product.image.add, image);
			if(!response) { return false; }

			Product.controller.show(product_id);
		};

		img.onerror = async () => { return alert('URL inválida!'); };
	};
};

Product.image.controller.show = async (product_id) => {
	let product = await Product.findById(product_id);
	if(!product){ return false };

	document.getElementById("product-manage-show-box").style.display = "none";
	document.getElementById("product-feedstock-add-box").style.display = "none";
	document.getElementById("product-feedstock-box").style.display = "none";

	document.getElementById("product-manage-show-box").style.display = "block";

	Product.view.manage.menu(product);
	Product.view.info(product, "product-manage-info-table");

	const pagination = { pageSize: 1, page: 0 };
	(function(){ lib.carousel.execute("product-manage-image-div", Product.view.image.show, product.images, pagination); }());
};

Product.image.controller.remove = async (image_id, product_id) => {
	let r = confirm("Deseja realmente excluir a image?");
	if(r){
		let response = API.response(Product.image.remove, image_id);
		if(!response) { return false; }

		Product.controller.show(product_id);
	};
};