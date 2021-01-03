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
		html += "<input type='text' id='"+input+"' class='box one dropdown-input center' oninput='Product.controller.filter.input(this)' value='"+input_value+"' onfocus='this.value=`"+null+"`; this.value=`"+input_value+"`' autocomplete='off'>";
		html += "<ul class='box one container'>";
		for(i in products){
			html += "<li><input type='button' class='box one dropdown-input' value='"+products[i].name+" | "+products[i].color+" | "+products[i].size+"'></li>";
		};
		html += "</ul>";

		document.getElementById(dropdown).innerHTML = html;
	}
};