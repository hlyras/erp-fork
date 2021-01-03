Sale.view.product = {};

Sale.view.product.fillInput = (products) => {
	let html = "";
	html += "<option value=''>Selecionar produto</option>";
	for(i in products){
		html += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>";
	};
	document.getElementById("sale-kart-product-form").elements.namedItem("product").innerHTML = html;
};

Sale.view.product.filter = {
	input: (products, input_value, input, dropdown) => {
		let html = "";
		for(i in products){
			html += "<li><input type='button' class='box one dropdown-input' data-id='"+products[i].id+"' value='"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"' onclick='Product.controller.filter.inputFill(this)'></li>";
		};

		document.getElementById(dropdown).innerHTML = html;
	}
};