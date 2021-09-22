Product.view = {};

Product.view.filter = (products, pagination) => {
	let filter_box = document.getElementById("product-filter-box");
	let filter_div = document.getElementById("product-filter-div");
	filter_div.innerHTML = "";

	if(products.length){
		let div_header = lib.element.create("div", { class: "box b1 container border em07 center" });
		
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b5 padding-5" }, "Código"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b4-10 padding-5" }, "Nome"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b10 padding-5" }, "Tamanho"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b10 padding-5" }, "Cor"));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b10 padding-5" }, ""));
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b10 padding-5" }, ""));
		filter_div.appendChild(div_header);
		for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let div_product = lib.element.create("div", { class: "box b1 container box-hover padding-5 margin-top-5 border" });
			div_product.appendChild(lib.element.create("div", { 
				class: "mobile-box b5 em11 tbl-show-link nowrap center bold", 
				onclick: "Product.controller.show("+products[i].id+")"
			 }, products[i].code));
			div_product.appendChild(lib.element.create("div", { class: "mobile-box b4-10 center" }, products[i].name));
			div_product.appendChild(lib.element.create("div", { class: "mobile-box b10 center" }, products[i].size));
			div_product.appendChild(lib.element.create("div", { class: "mobile-box b10 center" }, products[i].color));
			div_product.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Product.controller.edit("+products[i].id+")"));
			div_product.appendChild(lib.element.icon('b10', 20, "/images/icon/trash.png", "Product.controller.delete("+products[i].id+")"));
			filter_div.appendChild(div_product);
		};
		filter_box.style.display = "";
	} else {
		filter_div.innerHTML = "Sem resultados";
		filter_box.style.display = "";
	};
};

Product.view.show = (product) => {
	let show_div = document.getElementById("product-show-div");
	show_div.innerHTML = "";

	let div_title = lib.element.create("div", {
		class: "box b1 underline center bold",
	}, product.name);
	show_div.appendChild(div_title);

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