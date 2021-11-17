Product.price.view = {};

Product.price.view.filter = async (products, pagination) => {
	var html = "";
	for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		if(!products[i].pack){
			html += "<div class='box b1 container ground pointer padding-10 margin-top-5 center shadow-hover'>";
		} else {
			html += "<div class='box b1 container ground pointer padding-10 margin-top-5 center shadow-hover'>";
		};
		if(products[i].image){
			html += "<div class='mobile-box b4'><img class='height-125' src='"+products[i].image+"' alt=''/></div>";
		} else {
			html += "<div class='mobile-box b4'><img class='height-125' src='/images/product/no-product.png' alt=''/></div>";
		};
		html += `<div class="mobile-box b2 em12 avant-garde center padding-10 bold" style="color:#323232;">`+products[i].name+` - `+products[i].color+`</div>`;
		html += "<div class='mobile-box b4 center padding-5 container'>";
			html += "<div class='mobile-box b1 em08 italic'>à vista</div>";
			html += "<div class='mobile-box b1 em12 center bold' style='color:#467846;'>$"+products[i].price.toFixed(2)+"</div>";
		html += "</div>";
		html += "</div>";
	};
	document.getElementById("product-price-filter-div").innerHTML = html;
};

Product.price.category.view = {};

Product.price.category.view.filter = (categories, pagination) => {
		if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box b1 container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box b6 center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.show("+categories[i].id+")'>"+categories[i].id+"</h3></div>";
				html += "<div class='mobile-box b2-3 center'>"+categories[i].name+"</div>";
				html += "<div class='mobile-box b12 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+categories[i].id+")'></div>";
				html += "<div class='mobile-box b12 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+categories[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("product-price-category-filter-box").style.display = "";
		document.getElementById("product-price-category-filter-div").innerHTML = html;
	} else {
		document.getElementById("product-price-category-filter-box").style.display = "";
		document.getElementById("product-price-category-filter-div").innerHTML = "<div class='mobile-box b1 center'>Sem resultados</div>";
	};
};

Product.price.category.view.show = (category) => {
	let html = "";
	html += "<div class='mobile-box b1 underline center'>Informações da tabela</div>";
	html += "<h3 class='mobile-box b6 center margin-top-10 nowrap'>"+category.id+"</h3>";
	html += "<div class='mobile-box b2-3 margin-top-10 center'>"+category.name+"</div>";
	html += "<div class='mobile-box b12 center margin-top-10'><img class='icon size-20' src='/images/icon/edit.png' onclick='Product.price.category.controller.edit("+category.id+")'></div>";
	html += "<div class='mobile-box b12 center margin-top-10'><img class='icon size-20' src='/images/icon/trash.png' onclick='Product.price.category.controller.delete("+category.id+")'></div>";

	document.getElementById("product-price-category-show-info").innerHTML = html

	html = "";
	html += "<div class='box b1 em20 avant-garde italic center bold padding-5 margin-top-5'>PRODUTOS</div>";
	for(i in category.products){
		html += "<div class='box b1 container box-hover border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b8 center bold'>"+category.products[i].code+"</div>";
			html += "<div class='mobile-box b2 center'>"+category.products[i].name+" | "+category.products[i].color+" | "+category.products[i].size+"</div>";
			html += "<div class='mobile-box b3-8 container'>";
				html += "<div class='mobile-box b6 center'>$</div>";
				html += "<input type='number' id='product-price-category-price-"+category.products[i].id+"' class='mobile-box b2-3 input-border-bottom height-25 center' data-price='"+category.products[i].price.toFixed(2)+"' step='0.01' value='"+category.products[i].price.toFixed(2)+"' onfocus='if(this.value < 0.01){this.value=``}' onblur='if(this.value < 0.01){this.value=`0.00`}'>";
				html += "<div class='mobile-box b6 center'><input type='image' class='icon size-20' src='/images/icon/save.png' onclick='Product.price.controller.updatePrice("+category.products[i].price_id+", `product-price-category-price-"+category.products[i].id+"`);'></div>";
			html += "</div>";
		html += "</div>";
	};

	document.getElementById("product-price-category-show-div").innerHTML = html;

	html = "";
	html += "<div class='box b1 em20 avant-garde italic bold padding-5 center margin-top-5'>PACOTES</div>";
	for(i in category.packages){
		html += "<div class='box b1 container box-hover border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b8 center bold'>"+category.packages[i].code+"</div>";
			html += "<div class='mobile-box b2 center'>"+category.packages[i].name+" | "+category.packages[i].color+"</div>";
			html += "<div class='mobile-box b3-8 container'>";
				html += "<div class='mobile-box b6 center'>$</div>";
				console.log(category.packages[i].price);
				category.packages[i].price && html += "<input type='number' id='product-price-category-price-"+category.packages[i].id+"' class='mobile-box b2-3 input-border-bottom height-25 center' data-price='"+category.packages[i].price.toFixed(2)+"' step='0.01' value='"+category.packages[i].price.toFixed(2)+"' onfocus='if(this.value < 0.01){this.value=``}' onblur='if(this.value < 0.01){this.value=`0.00`}'>";
				html += "<div class='mobile-box b6 center'><input type='image' class='icon size-20' src='/images/icon/save.png' onclick='Product.controller.package.price.updatePrice("+category.packages[i].price_id+", `product-price-category-price-"+category.packages[i].id+"`);'></div>";
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
			html += "<div class='box b1 container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box b6 center'><h3 class='tbl-show-link nowrap' onclick='Product.price.category.controller.home.show("+categories[i].id+")'>"+categories[i].id+"</h3></div>";
				html += "<div class='mobile-box b2-3 center'>"+categories[i].name+"</div>";
			html += "</div>";
		};
		document.getElementById("product-price-category-home-filter-box").style.display = "";
		document.getElementById("product-price-category-home-filter-div").innerHTML = html;
	} else {
		document.getElementById("product-price-category-home-filter-box").style.display = "";
		document.getElementById("product-price-category-home-filter-div").innerHTML = "<div class='mobile-box b1 center'>Sem resultados</div>";
	};
};

lib.filterArrayByName = (input, param, array) => {
	let reg = new RegExp(input+'.+$', 'i');
	array = array.filter(function(cur, ind, arr){
		console.log(cur[param]);
	    return cur[param].search(reg) != -1;
	});
	return array;
};

Product.price.category.view.home.show = (category) => {
	let html = "";
	html += "<div class='mobile-box b3 em12 avant-garde center nowrap'>"+category.id+"</div>";
	html += "<div class='mobile-box b3 em15 avant-garde bold center'>"+category.name+"</div>";

	document.getElementById("product-price-category-home-show-info").innerHTML = html

	html = "";
	html += "<div class='box b1 em20 avant-garde italic bold padding-5 center margin-top-5'>Produtos</div>";
	for(i in category.products){
		if(category.products[i].status == "Disponível"){
			html += "<div class='box b1 container box-hover border padding-5 margin-top-5'>";
				html += "<div class='mobile-box b8 padding-5 bold center'>"+category.products[i].code+"</div>";
				html += "<div class='mobile-box b5-8 padding-5 bold center'>"+category.products[i].name+" | "+category.products[i].color+" | "+category.products[i].size+"</div>";
				html += "<div class='mobile-box b4 padding-5 avant-garde bold'>$"+category.products[i].price.toFixed(2)+"</div>";
			html += "</div>";
		};
	};

	document.getElementById("product-price-category-home-show-div").innerHTML = html;

	html = "";
	html += "<div class='box b1 em20 avant-garde italic bold padding-5 center margin-top-5'>Pacotes</div>";
	for(i in category.packages){
		if(category.packages[i].status == "Disponível"){
			html += "<div class='box b1 container box-hover border padding-5 margin-top-5'>";
				html += "<div class='mobile-box b8 padding-5 bold center'>"+category.packages[i].code+"</div>";
				html += "<div class='mobile-box b5-8 padding-5 bold center'>"+category.packages[i].name+" | "+category.packages[i].color+"</div>";
				html += "<div class='mobile-box b4 padding-5 avant-garde bold'>$"+category.packages[i].price.toFixed(2)+"</div>"
			html += "</div>";
		};
	};

	document.getElementById("product-package-price-category-home-show-div").innerHTML = html;
};