Product.view = {};

Product.view.filter = (products) => {
	let filter_div = document.getElementById("product-filter-div");
	filter_div.innerHTML = "";

	if(!products.length) {
		return filter_div.append(lib.element.create("div", 
			{ class: "box b1 lucida-grande bold center" }, "Sem resultados"));
	};

	for (let i in products){
		let product_div = lib.element.create("div", { 
			class: "box b3 container ground border-lg-st padding-10 margin-top-5 radius-5",
			onclick: `Product.controller.detail(${products[i].id})`
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

Product.view.detail = (product) => {
	let detail_box = document.getElementById("product-detail-div");
	detail_box.innerHTML = "";

	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b8 lucida-grande center bold" }, `#${product.code}`));
	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b5-8 lucida-grande center bold" }, product.name));
	detail_box.appendChild(lib.element.create("box", { class: "mobile-box b4 lucida-grande center bold" }, product.color));
};

Product.view.images = (images, pagination) => {
	let image_div = document.getElementById("product-image-div");
	image_div.innerHTML = "";

  for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
  	let image = lib.element.create("img", { class: 'image-prop size-500', src: images[i].url });

  	image_div.appendChild(image);
	};
};