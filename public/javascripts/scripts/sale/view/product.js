Sale.product.view = {};

Sale.product.view.fillInput = (products) => {
	let html = "";
	html += "<option value=''>Selecionar produto</option>";
	for(i in products){
		html += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>";
	};
	document.getElementById("sale-kart-product-form").elements.namedItem("product").innerHTML = html;
};