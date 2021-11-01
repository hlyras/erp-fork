Feedstock.purchase.controller = {};

Feedstock.purchase.controller.setSupplier = (supplier_id) => {
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("supplier-id").value = supplier_id;
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("feedstock").readOnly = false;
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("feedstock").value = "";
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("amount").value = "";

	if(!supplier_id){ return document.getElementById("purchase-feedstock-add-form").style.display = "none"; }
	document.getElementById("purchase-feedstock-add-form").style.display = "";
};