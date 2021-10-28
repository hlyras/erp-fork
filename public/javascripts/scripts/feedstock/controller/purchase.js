Feedstock.purchase.controller = {};

Feedstock.purchase.controller.setSupplier = (supplier_id) => {
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("supplier-id").value = supplier_id;

	if(!supplier_id){ return document.getElementById("purchase-feedstock-add-form").style.display = "none"; }
	document.getElementById("purchase-feedstock-add-form").style.display = "";
};

Feedstock.purchase.controller.add = document.getElementById("purchase-feedstock-add-form");
if(Feedstock.purchase.controller.add){
	Feedstock.purchase.controller.add.addEventListener("submit", async event => {
		event.preventDefault();

		let feedstock = event.target.elements.namedItem("feedstock");
		if(!feedstock.readOnly){ return alert("Matéria-prima inválida"); };
		let supplier_id = event.target.elements.namedItem("supplier-id").value;
		let price = event.target.elements.namedItem("price").value;
		
		if(!feedstock){ return alert("É necessário selecionar um produto."); }
		if(price < 0.01 || !price){ return alert("É necessário preencher o preço do produto."); }

		let insert = {
			supplier_id: supplier_id,
			feedstock_id: feedstock.dataset.id,
			price: price
		};

		console.log(insert);

		// let response = await API.response(Feedstock.supplier.storage.add, insert);
		// if(!response) { return false; }

		// Feedstock.supplier.storage.controller.filter.submit.click();
	});
}