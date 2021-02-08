Product.price.view = {};

Product.price.category.view = {};

Product.price.category.view.filter = (categories, pagination) => {
		if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box one container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box six center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.show("+categories[i].id+")'>"+categories[i].id+"</h3></div>";
				html += "<div class='mobile-box two-thirds center'>"+categories[i].name+"</div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-15' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+categories[i].id+")'></div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-15' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+categories[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("product-price-category-filter-box").style.display = "";
		document.getElementById("product-price-category-filter-div").innerHTML = html;
	} else {
		document.getElementById("product-price-category-filter-box").style.display = "";
		document.getElementById("product-price-category-filter-div").innerHTML = "<div class='mobile-box one center'>Sem resultados</div>";
	};
};

Product.price.category.view.show = (category) => {
	console.log(category);

	let html = "";
	html += "<div class='mobile-box one underline center'>Informações da tabela</div>";
	html += "<h3 class='mobile-box six center margin-top-10 nowrap'>"+category.id+"</h3>";
	html += "<div class='mobile-box two-thirds margin-top-10 center'>"+category.name+"</div>";
	html += "<div class='mobile-box twelve center margin-top-10'><img class='icon size-15' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+category.id+")'></div>";
	html += "<div class='mobile-box twelve center margin-top-10'><img class='icon size-15' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+category.id+")'></div>";

	document.getElementById("product-price-category-show-info").innerHTML = html
};

Product.price.category.view.showProducts = (category_products, pagination) => {
	let html = "";
	for(let i = pagination.page * pagination.pageSize; i < category_products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		html += "<div class='box one container box-hover border padding-5 margin-top-5'>";
			html += "<div class='mobile-box eight center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.show("+category_products[i].id+")'>"+category_products[i].code+"</h3></div>";
			html += "<div class='mobile-box two center'>"+category_products[i].name+" | "+category_products[i].color+" | "+category_products[i].size+"</div>";
			html += "<div class='mobile-box three-eighths container'>";
				html += "<div class='mobile-box six center'>$</div>";
				html += "<input type='number' id='product-price-category-price-"+category_products[i].id+"' class='mobile-box two-thirds input-border-bottom height-25 center' data-price='"+category_products[i].price+"' step='0.01' value='0.00' onfocus='if(this.value < 0.01){this.value=``}' onblur='if(this.value < 0.01){this.value=`0.00`}' value='"+category_products[i].price+"'>";
				html += "<div class='mobile-box six center'><img class='icon size-15' src='/images/icon/save.png' onclick='Product.price.category.controller.updatePrice("+category_products[i].price_id+", `product-price-category-price-"+category_products[i].id+"`);'></div>";
			html += "</div>";
		html += "</div>";
	};	

	document.getElementById("product-price-category-show-div").innerHTML = html;
};