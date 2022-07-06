Product.conference.view = {};

Product.conference.view.filter = (products) => {
	let filter_div = document.getElementById("product-filter-div");
	filter_div.innerHTML = "";

	if(!products.length) {
		return filter_div.append(lib.element.create("div", 
			{ class: "box b1 lucida-grande bold center" }, "Sem resultados"));
	};

	for (let i in products){
		let product_div = lib.element.create("div", { class: "box b3 container ground height-125 border-lg-st padding-10 margin-top-5 radius-5" });
		
		product_div.append(lib.element.create("div", { 
			class: "mobile-box b7 lucida-grande bold input-show border-lg-st center noselect pointer", 
			onclick: `Product.conference.controller.detail(${products[i].id})`
		}, products[i].id));

		let image_box = lib.element.create("div", { class: "mobile-box b7 container ground padding-5 center" });
		image_box.append(lib.element.create("img", {
			src: `${products[i].image || "/images/product/no-product.png"}`,
			class: "image-card height-70 center"
		}));
		product_div.append(image_box);

		let info_box = lib.element.create("div", { class: "mobile-box b4-7 container ground padding-5 center" });
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b1 lucida-grande em09 bold underline center" }, `${products[i].code} | ${products[i].name}`));
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b1 lucida-grande em09 center" }, products[i].color));
		product_div.append(info_box);

		let menu_box = lib.element.create("div", { class: "mobile-box b7 container ground padding-5 center" });
		menu_box.appendChild(lib.element.icon('b1', 20, "/images/icon/edit.png", "Product.conference.controller.edit("+products[i].id+")"));
		product_div.append(menu_box);

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
		class: "box b1 border radius-5 height-250",
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

Product.conference.view.edit = (product) => {
	let detail_box = document.getElementById("product-edit-div");
	detail_box.innerHTML = "";

	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b8 lucida-grande center bold" }, `#${product.code}`));
	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b5-8 lucida-grande center bold" }, product.name));
	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b4 lucida-grande center bold" }, product.color));

	let image_div = document.getElementById("product-edit-image");
	image_div.innerHTML = "";
	
	let image = lib.element.create("img", { class: 'image-prop size-300', src: product.image });
	image_div.appendChild(image);

	let product_form = document.getElementById("product-edit-form");
	
	product_form.elements.namedItem("product-id").value = product.id;
	product_form.elements.namedItem("conference-video").value = product.conference_video || "";
	product_form.elements.namedItem("conference-obs").value = product.conference_obs || "";
};