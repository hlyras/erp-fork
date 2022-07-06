Product.conference.view = {};

Product.conference.view.filter = (products) => {
	let filter_div = document.getElementById("product-filter-div");
	filter_div.innerHTML = "";

	if(!products.length) {
		return filter_div.append(lib.element.create("div", 
			{ class: "box b1 lucida-grande bold center" }, "Sem resultados"));
	};

	for (let i in products){
		let product_div = lib.element.create("div", { 
			class: "box b3 container ground border-lg-st padding-10 margin-top-5 radius-5",
			onclick: `Product.conference.controller.detail(${products[i].id})`
		});
		
		let image_box = lib.element.create("div", { class: "box b2 container ground padding-5 center" });
		image_box.append(lib.element.create("img", {
			src: `${products[i].image || "/images/product/no-product.png"}`,
			class: "image-card height-250 center"
		}));
		product_div.append(image_box);

		let info_box = lib.element.create("div", { class: "box b2 container ground padding-5 center" });
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b1 lucida-grande bold underline center" }, `${products[i].code} | ${products[i].name}`));
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b1 lucida-grande bold center" }, products[i].color));
		product_div.append(info_box);

		products[i].image && filter_div.appendChild(product_div);
	};
};

Product.conference.view.detail = (product) => {
	let detail_box = document.getElementById("product-detail-div");
	detail_box.innerHTML = "";

	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b8 lucida-grande center bold" }, `#${product.code}`));
	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b5-8 lucida-grande center bold" }, product.name));
	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b4 lucida-grande center bold" }, product.color));

	const pagination = { pageSize: 1, page: 0 };
	(function(){ lib.carousel.execute("product-image-box", Product.conference.view.images, product.images, pagination); }());

	let conference_info_box = document.getElementById("conference-info-box");
	conference_info_box.innerHTML = "";

	product.conference_video && conference_info_box.append(lib.element.create("iframe", {
		class: "box b1 border radius-5 height-500",
		src: product.conference_video,
		allowfullscreen: 'on',
		frameborder: 0,
		allow: "accelerometer"
	}));

	conference_info_box.append(lib.element.create("div", {
		class: "box b1 padding-10 pre-wrap"
	}, product.conference_obs || "Ainda não foram adicionadas observações sobre este produto."));
};

Product.conference.view.images = (images, pagination) => {
	let image_div = document.getElementById("product-image-div");
	image_div.innerHTML = "";

  for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
  	let image = lib.element.create("img", { class: 'image-prop size-500', src: images[i].url });

  	image_div.appendChild(image);
	};
};