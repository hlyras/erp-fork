Product.view.package = {};

Product.view.package.filter = (packages, pagination) => {
	let package_filter_box = document.getElementById("product-package-filter-box");
	let package_filter_div = document.getElementById("product-package-filter-div");
	package_filter_div.innerHTML = "";

	if(packages.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < packages.length && i < (pagination.page + 1) * pagination.pageSize; i++){

			let package_div = lib.element.create("div", { class: "box b1 container border padding-5 margin-top-5" });
			package_filter_div.appendChild(package_div);

			package_div.appendChild(lib.element.create("div", {
				class: "mobile-box b5 tbl-show-link nowrap center bold",
				onclick: "Product.controller.package.show("+packages[i].id+")"
			}, packages[i].code));
			package_div.appendChild(lib.element.create("div", { class: "mobile-box b2 center" }, packages[i].name ));
			package_div.appendChild(lib.element.create("div", { class: "mobile-box b10 center" }, packages[i].color ));
			package_div.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Product.controller.package.edit("+packages[i].id+")"));
			package_div.appendChild(lib.element.icon('b10', 20, "/images/icon/trash.png", "Product.controller.package.delete("+packages[i].id+")"));
			
			package_filter_box.style.display = "";
		};
	} else {
		package_filter_box.style.display = "";
		package_filter_div.innerHTML = "Sem resultados";
	};
};

Product.view.package.show = (package) => {
	let package_show_box = document.getElementById("product-package-show-box");
	let package_show_div = document.getElementById("product-package-show-div");
	package_show_div.innerHTML = "";

	let info_div = lib.element.create("div", { class: "box b1 container padding-10" });
	package_show_div.appendChild(info_div);

	info_div.appendChild(lib.element.create("div", { class: "box b1 underline center" }, "Informações do Pacote"));
	info_div.appendChild(lib.element.info("b6", "Código", package.code));
	info_div.appendChild(lib.element.info("b2", "Nome", package.name));
	info_div.appendChild(lib.element.info("b6", "Cor", package.color));
	info_div.appendChild(lib.element.icon("b6", 25, "/images/icon/add-image.png", "Product.controller.package.image.add("+package.id+")"));

	let pagination = { pageSize: 1, page: 0 };
	(function(){ lib.carousel.execute("product-package-image-box", Product.view.package.image.show, package.images, pagination); }());
};

Product.view.package.image = {};

Product.view.package.image = {
	show: (images, pagination) => {
		let image_div = document.getElementById("product-package-image-div");
		image_div.innerHTML = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
	    	let image = lib.element.create("img", { class: 'image-box', src: images[i].url });

	    	let remove_div = lib.element.create("div", { class: "box b1 container h-center" });
	    	let remove_btn = lib.element.create("button", {
	    		class: "box b3 submit-generic center pointer",
	    		onclick: "Product.controller.package.image.remove("+images[i].id+","+images[i].package_id+")"
	    	}, "Excluir imagem");

	    	image_div.appendChild(image);
	    	image_div.appendChild(remove_div);
	    	remove_div.appendChild(remove_btn);
		};
	}
};