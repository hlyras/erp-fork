Product.view = {};

Product.view.filter = (products) => {
	let filter_div = document.getElementById("product-filter-div");
	filter_div.innerHTML = "";

	if(!products.length) {
		return filter_div.append(lib.element.create("div", 
			{ class: "box b1 lucida-grande bold center" }, "Sem resultados"));
	};

	for (let i in products){
		let product_div = lib.element.create("div", { class: "box b2 container ground padding-10 margin-top-5 radius-5" });
		
		let image_box = lib.element.create("div", { class: "box b4 container ground padding-5 border center" });
		image_box.append(lib.element.create("img", {
			src: `${products[i].image}`,
			class: "image-prop size-100 center",
			onclick: "Product.controller.show("+products[i].id+")"
		}))
		product_div.append(image_box);

		let info_box = lib.element.create("div", { class: "box b3-4 container ground padding-5 center" });
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b3 lucida-grande bold center" }, products[i].code));
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b3 lucida-grande bold center" }, products[i].name));
		info_box.appendChild(lib.element.create("div", { class: "mobile-box b3 lucida-grande bold center" }, products[i].color));
		product_div.append(info_box);

		products[i].image && filter_div.appendChild(product_div);
	};
};

Product.view.show = (product) => {
	let show_div = document.getElementById("product-show-div");
	show_div.innerHTML = "";

	show_div.appendChild(lib.element.create("div", { class: "box b1 underline center bold", }, product.name))

	show_div.appendChild(lib.element.info("b8", "Id", product.id));
	show_div.appendChild(lib.element.info("b8", "Código", product.code));
	show_div.appendChild(lib.element.info("b3-8", "Nome", product.name));
	show_div.appendChild(lib.element.info("b8", "Tamanho", product.size));
	show_div.appendChild(lib.element.info("b8", "Cor", product.color));
	show_div.appendChild(lib.element.icon("b8", 25, "/images/icon/add-image.png", "Product.image.controller.add("+product.id+")"));
};

Product.view.fillSelect = (products, select) => {
	select.innerHTML = "";
	if(products.length){
		for(i in products){
			select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
		};
	} else {
		select.innerHTML += "<option value=''>Sem resultados</option>"
	};
};