Product.price.view = {};

Product.price.category.view = {};

Product.price.category.view.filter = (categories, pagination) => {
		if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box one container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box six center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.show("+categories[i].id+")'>"+categories[i].id+"</h3></div>";
				html += "<div class='mobile-box two-thirds center'>"+categories[i].name+"</div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+categories[i].id+")'></div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+categories[i].id+")'></div>";
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
	let html = "";
	html += "<div class='mobile-box one underline center'>Informações da tabela</div>";
	html += "<h3 class='mobile-box six center margin-top-10 nowrap'>"+category.id+"</h3>";
	html += "<div class='mobile-box two-thirds margin-top-10 center'>"+category.name+"</div>";
	html += "<div class='mobile-box twelve center margin-top-10'><img class='icon size-20' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+category.id+")'></div>";
	html += "<div class='mobile-box twelve center margin-top-10'><img class='icon size-20' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+category.id+")'></div>";

	document.getElementById("product-price-category-show-info").innerHTML = html

	html = "";
	html += "<div class='box one em20 avant-garde italic center bold padding-5 margin-top-5'>PRODUTOS</div>";
	for(i in category.products){
		html += "<div class='box one container box-hover border padding-5 margin-top-5'>";
			html += "<div class='mobile-box eight center bold'>"+category.products[i].code+"</div>";
			html += "<div class='mobile-box two center'>"+category.products[i].name+" | "+category.products[i].color+" | "+category.products[i].size+"</div>";
			html += "<div class='mobile-box three-eighths container'>";
				html += "<div class='mobile-box six center'>$</div>";
				html += "<input type='number' id='product-price-category-price-"+category.products[i].id+"' class='mobile-box two-thirds input-border-bottom height-25 center' data-price='"+category.products[i].price.toFixed(2)+"' step='0.01' value='"+category.products[i].price.toFixed(2)+"' onfocus='if(this.value < 0.01){this.value=``}' onblur='if(this.value < 0.01){this.value=`0.00`}'>";
				html += "<div class='mobile-box six center'><input type='image' class='icon size-20' src='/images/icon/save.png' onclick='Product.price.controller.updatePrice("+category.products[i].price_id+", `product-price-category-price-"+category.products[i].id+"`);'></div>";
			html += "</div>";
		html += "</div>";
	};

	document.getElementById("product-price-category-show-div").innerHTML = html;

	html = "";
	html += "<div class='box one em20 avant-garde italic bold padding-5 center margin-top-5'>PACOTES</div>";
	for(i in category.packages){
		html += "<div class='box one container box-hover border padding-5 margin-top-5'>";
			html += "<div class='mobile-box eight center bold'>"+category.packages[i].code+"</div>";
			html += "<div class='mobile-box two center'>"+category.packages[i].name+" | "+category.packages[i].color+"</div>";
			html += "<div class='mobile-box three-eighths container'>";
				html += "<div class='mobile-box six center'>$</div>";
				html += "<input type='number' id='product-price-category-price-"+category.packages[i].id+"' class='mobile-box two-thirds input-border-bottom height-25 center' data-price='"+category.packages[i].price.toFixed(2)+"' step='0.01' value='"+category.packages[i].price.toFixed(2)+"' onfocus='if(this.value < 0.01){this.value=``}' onblur='if(this.value < 0.01){this.value=`0.00`}'>";
				html += "<div class='mobile-box six center'><input type='image' class='icon size-20' src='/images/icon/save.png' onclick='Product.controller.package.price.updatePrice("+category.packages[i].price_id+", `product-price-category-price-"+category.packages[i].id+"`);'></div>";
			html += "</div>";
		html += "</div>";
	};

	document.getElementById("product-package-price-category-show-div").innerHTML = html;
};

Product.price.category.view.home = {};

Product.price.category.view.home.filter = (categories, pagination) => {
		if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box one container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box six center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.home.show("+categories[i].id+")'>"+categories[i].id+"</h3></div>";
				html += "<div class='mobile-box two-thirds center'>"+categories[i].name+"</div>";
			html += "</div>";
		};
		document.getElementById("product-price-category-home-filter-box").style.display = "";
		document.getElementById("product-price-category-home-filter-div").innerHTML = html;
	} else {
		document.getElementById("product-price-category-home-filter-box").style.display = "";
		document.getElementById("product-price-category-home-filter-div").innerHTML = "<div class='mobile-box one center'>Sem resultados</div>";
	};
};

Product.price.category.view.home.show = (category) => {
	let html = "";
	html += "<div class='mobile-box b3 em12 avant-garde center nowrap'>"+category.id+"</div>";
	html += "<div class='mobile-box b3 em15 avant-garde bold center'>"+category.name+"</div>";

	document.getElementById("product-price-category-home-show-info").innerHTML = html

	html = "";
	html += "<div class='box one em20 avant-garde italic bold padding-5 center margin-top-5'>Produtos</div>";
	for(i in category.products){
		if(category.products[i].status == "Disponível"){
			html += "<div class='box one container box-hover border padding-5 margin-top-5'>";
				html += "<div class='mobile-box b8 padding-5 bold center'>"+category.products[i].code+"</div>";
				html += "<div class='mobile-box b5-8 padding-5 bold center'>"+category.products[i].name+" | "+category.products[i].color+" | "+category.products[i].size+"</div>";
				html += "<div class='mobile-box b4 padding-5 avant-garde bold'>$"+category.products[i].price.toFixed(2)+"</div>"
			html += "</div>";
		};
	};

	document.getElementById("product-price-category-home-show-div").innerHTML = html;

	html = "";
	html += "<div class='box one em20 avant-garde italic bold padding-5 center margin-top-5'>Pacotes</div>";
	for(i in category.packages){
		if(category.packages[i].status == "Disponível"){
			html += "<div class='box one container box-hover border padding-5 margin-top-5'>";
				html += "<div class='mobile-box b8 padding-5 bold center'>"+category.packages[i].code+"</div>";
				html += "<div class='mobile-box b5-8 padding-5 bold center'>"+category.packages[i].name+" | "+category.packages[i].color+"</div>";
				html += "<div class='mobile-box b4 padding-5 avant-garde bold'>$"+category.packages[i].price.toFixed(2)+"</div>"
			html += "</div>";
		};
	};

	document.getElementById("product-package-price-category-home-show-div").innerHTML = html;
};