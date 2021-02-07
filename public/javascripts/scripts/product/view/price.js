Product.price.view = {};

Product.price.category.view = {};

Product.price.category.view.filter = (categories, pagination) => {
		if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box one container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box six center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.show("+categories[i].id+")'>"+categories[i].id+"</h3></div>";
				html += "<div class='mobile-box two-thirds center'>"+categories[i].name+"</div>";
				html += "<div class='mobile-box twelve center'><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+categories[i].id+")'></div>";
				html += "<div class='mobile-box twelve center'><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+categories[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("product-price-category-filter-box").style.display = "";
		document.getElementById("product-price-category-filter-div").innerHTML = html;
	} else {
		document.getElementById("product-price-category-filter-box").style.display = "";
		document.getElementById("product-price-category-filter-div").innerHTML = "Sem resultados";
	};
};

Product.price.category.view.show = (category) => {
	console.log(category.products);

	let html = "";
	html += "<div></div>";
	html += "<div></div>";
	html += "<div></div>";
	html += "<div></div>";
	html += "<div></div>";
};