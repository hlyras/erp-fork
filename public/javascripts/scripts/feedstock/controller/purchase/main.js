Feedstock.purchase.controller = {};

Feedstock.purchase.controller.setSupplier = (supplier_id) => {
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("supplier-id").value = supplier_id;
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("feedstock").readOnly = true;
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("feedstock").value = "";
	document.getElementById("purchase-feedstock-add-form").elements.namedItem("amount").value = "";

	if (!supplier_id) { return document.getElementById("purchase-feedstock-add-form").style.display = "none"; }
	document.getElementById("purchase-feedstock-add-form").style.display = "";
};

Feedstock.purchase.controller.confirm = async () => {
	let purchase = {
		id: document.getElementById("purchase-id").value,
		supplier_id: document.getElementById("purchase-supplier-id").value,
		status: document.getElementById("purchase-feedstock-kart-status").value,
		payment_method: document.getElementById("purchase-feedstock-kart-payment-method").value,
		value: Feedstock.purchase.controller.kart.value,
		discount_value: Feedstock.purchase.controller.kart.discount_value,
		shipment_value: Feedstock.purchase.controller.kart.shipment_value,
		total_value: Feedstock.purchase.controller.kart.total_value,
		feedstocks: JSON.stringify(Feedstock.purchase.controller.kart.items)
	};

	purchase = await API.response(Feedstock.purchase.save, purchase);
	if (!purchase) { return false; }

	document.getElementById("purchase-id").value = "";
	document.getElementById("purchase-supplier-id").value = "";
	document.getElementById("purchase-feedstock-kart-status").value = "";
	document.getElementById("purchase-feedstock-kart-payment-method").value = "";
	Feedstock.purchase.controller.kart.total_value = 0;
	Feedstock.purchase.controller.kart.items = [];
	Feedstock.purchase.controller.kart.update("code");
	Feedstock.purchase.controller.kart.list("Feedstock.purchase.controller.kart", Feedstock.purchase.controller.kart.props);

	if (document.getElementById("feedstock-purchase-kart")) { Feedstock.purchase.controller.filter.submit.click(); }
};

Feedstock.purchase.controller.shipmentValue = document.getElementById("purchase-feedstock-kart-shipment-value");
if (Feedstock.purchase.controller.shipmentValue) {
	Feedstock.purchase.controller.shipmentValue.addEventListener("change", event => {
		event.preventDefault();

		Feedstock.purchase.controller.kart.update("code");
	});
};

Feedstock.purchase.controller.discountValue = document.getElementById("purchase-feedstock-kart-discount-value");
if (Feedstock.purchase.controller.discountValue) {
	Feedstock.purchase.controller.discountValue.addEventListener("change", event => {
		event.preventDefault();

		Feedstock.purchase.controller.kart.update("code");
	});
};

Feedstock.purchase.controller.filter = document.getElementById("purchase-feedstock-filter-form");
if (Feedstock.purchase.controller.filter) {
	Feedstock.purchase.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let purchase = {
			id: event.target.elements.namedItem("id").value,
			supplier_id: event.target.elements.namedItem("supplier-id").value,
			period_start: lib.dateToTimestamp(event.target.elements.namedItem("period-start").value),
			period_end: parseFloat(lib.dateToTimestamp(event.target.elements.namedItem("period-end").value)) + parseFloat(lib.timestampDay())
		};

		console.log(purchase);

		let purchases = await API.response(Feedstock.purchase.filter, purchase);
		if (!purchases) { return false; }

		lib.display("purchase-feedstock-show-box", "none");
		lib.display("feedstock-purchase-kart", "none");
		lib.display("purchase-feedstock-filter-box", "");

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("purchase-feedstock-filter-box", Feedstock.purchase.view.filter, purchases, pagination); }());
	});
}

Feedstock.purchase.controller.open = async (purchase_id) => {
	let purchases = await API.response(Feedstock.purchase.filter, { id: purchase_id });
	if (!purchases) { return false; }

	purchases[0].feedstocks = await API.response(Feedstock.purchase.feedstock.filter, { purchase_id: purchase_id });
	if (!purchases[0].feedstocks) { return false; }

	document.getElementById("purchase-feedstock-filter-box").style.display = "none";

	Feedstock.purchase.view.show(purchases[0]);
};

Feedstock.purchase.controller.edit = async purchase_id => {
	let purchases = await API.response(Feedstock.purchase.filter, { id: purchase_id });
	if (!purchases) { return false; }

	purchases[0].feedstocks = await API.response(Feedstock.purchase.feedstock.filter, { purchase_id: purchase_id });
	if (!purchases[0].feedstocks) { return false; }


	if (purchases[0].status == "Ag. aprovação") {
		let r = confirm("Deseja retornar o pedido para Em orçamento?");
		if (r) {
			if (!await API.response(Feedstock.purchase.update, { id: purchase_id, status: 'Em orçamento' })) { return false; };
			Feedstock.purchase.controller.filter.submit.click();
		}
	} else if (purchases[0].status == "Em orçamento") {
		Feedstock.purchase.view.edit(purchases[0]);

		document.getElementById("purchase-feedstock-filter-box").style.display = "none";
		document.getElementById("feedstock-purchase-kart").style.display = "";
	}
};

Feedstock.purchase.controller.delete = async (purchase_id) => {
	let r = confirm('Deseja realmente excluir a compra? Essa ação não pode ser revertida!');
	if (r) {
		if (!await API.response(Feedstock.purchase.delete, purchase_id)) { return false; };
		Feedstock.purchase.controller.filter.submit.click();
	}
};