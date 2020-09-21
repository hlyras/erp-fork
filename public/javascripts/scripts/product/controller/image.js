Product.controller.image = {
	add: async (product_id) => {
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
				document.getElementById('ajax-loader').style.visibility = 'visible';

				if(!await Product.image.add(product_id, image_url)){ return false };

				await Product.controller.manage.show(product_id);

				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}).bind('error', () => {
				return alert('URL inválida!');
			});
		};
	},
	show: async (product_id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		let product = await Product.findById(product_id);
		if(!product){ return false };

		document.getElementById("product-manage-show-box").style.display = "none";
		document.getElementById("product-feedstock-add-box").style.display = "none";
		document.getElementById("product-feedstock-box").style.display = "none";

		document.getElementById("product-manage-show-box").style.display = "block";

		Product.view.manage.menu(product);
		Product.view.info(product, "product-manage-info-table");
			
		const pagination = { pageSize: 1, page: 0 };
		$(() => { lib.carousel.execute("product-manage-image-div", Product.view.image.show, product.images, pagination); });
		
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	},
	remove: async (image_id, product_id) => {
		let r = confirm("Deseja realmente excluir a image?");
		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';

			if(!await Product.image.remove(image_id)){ return false };

			await Product.controller.manage.show(product_id);

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		};
	}
};