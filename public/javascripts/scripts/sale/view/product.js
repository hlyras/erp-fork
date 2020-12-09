Sale.view.product = {};

Sale.view.product.fillInput = (products) => {
	let html = "";
	html += "<option value=''>Selecionar produto</option>";
	for(i in products){
		html += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>";
	};
	document.getElementById("sale-product-kart-form").elements.namedItem("product").innerHTML = html;
};