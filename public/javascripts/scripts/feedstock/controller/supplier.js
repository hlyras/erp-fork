Feedstock.supplier.controller = {};

Feedstock.supplier.controller.create = document.getElementById("feedstock-supplier-create-form");
if(Feedstock.supplier.controller.create){
	Feedstock.supplier.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let supplier = {
			id: event.target.elements.namedItem("id").value,
			cnpj: event.target.elements.namedItem("cnpj").value,
			trademark: event.target.elements.namedItem("trademark").value,
			brand: event.target.elements.namedItem("brand").value,
			name: event.target.elements.namedItem("name").value,
			phone: event.target.elements.namedItem("phone").value,
		};

		let response = await API.response(Feedstock.supplier.save, supplier);
		if(!response){ return false; }

		event.target.elements.namedItem('id').value = "";
		event.target.elements.namedItem('cnpj').value = "";
		event.target.elements.namedItem('trademark').value = "";
		event.target.elements.namedItem('brand').value = "";
		event.target.elements.namedItem('name').value = "";
		event.target.elements.namedItem('phone').value = "";
	});
}

Feedstock.supplier.controller.filter = document.getElementById("feedstock-supplier-filter-form");
if(Feedstock.supplier.controller.filter){
	Feedstock.supplier.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let supplier = {
			cnpj: event.target.elements.namedItem("cnpj").value,
			trademark: event.target.elements.namedItem("trademark").value,
			brand: event.target.elements.namedItem("brand").value,
			name: event.target.elements.namedItem("name").value
		};

		let suppliers = await API.response(Feedstock.supplier.filter, supplier);
		if(!suppliers){ return false; }

		document.getElementById("feedstock-supplier-filter-box").style.display = "";
		document.getElementById("supplier-storage-box").style.display = "none";

		const pagination = { pageSize: 10, page: 0};
		(function(){ lib.carousel.execute("feedstock-supplier-filter-box", Feedstock.supplier.view.filter, suppliers, pagination); }());
	});
}

Feedstock.supplier.storage.controller = {};

Feedstock.supplier.storage.controller.open = async (supplier_id) => {
	let supplier = await API.response(Feedstock.supplier.storage.open, supplier_id);
	if(!supplier) { return false; }

	document.getElementById("feedstock-supplier-filter-box").style.display = "none";
	document.getElementById("supplier-storage-box").style.display = "";

	Feedstock.supplier.storage.view.open(supplier);
};

// Feedstock.supplier.controller.storage.add = async (feedstock_id) => {
// 	
// };


// if(!document.getElementById("sale-product-kart-form").elements.namedItem("product").readOnly){ 
// 	return alert("Produto inválido");
// };
// 
// let product = document.getElementById("sale-product-kart-form").elements.namedItem("product");
// let splitedProduct = product.value.split(" | ");
// let amount = document.getElementById("sale-product-kart-form").elements.namedItem("amount").value;
// 
// if(splitedProduct.length < 3 || !splitedProduct){
// 	alert("É necessário selecionar um produto.");
// 	return;
// };
// 
// if(amount < 0.01 || !amount){
// 	alert("É necessário preencher a quantidade do produto.");
// 	return;
// };
// 
// product = {
// 	id: product.dataset.id,
// 	code: splitedProduct[0],
// 	name: splitedProduct[1],
// 	color: splitedProduct[2],
// 	size: splitedProduct[3],
// 	weight: splitedProduct[4],
// 	amount: parseInt(amount)
// };