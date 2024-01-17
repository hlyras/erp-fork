Ecommerce.sale.controller.service_order = {};

Ecommerce.sale.controller.service_order.save = document.getElementById("ecommerce-sale-os-create-form");
if (Ecommerce.sale.controller.service_order.save) {
	Ecommerce.sale.controller.service_order.save.addEventListener("submit", async e => {
		e.preventDefault();

		let service_order = {
			datetime: lib.sanitize(e.target.datetime.value) || null,
			code: lib.sanitize(e.target.code.value) || null,
			sale_amount: lib.sanitize(e.target.elements.namedItem("sale-amount").value) || null,
			sales: []
		};

		if (!service_order.datetime) { return alert("É necessário incluir a data e hora da OS.") };
		if (!service_order.code) { return alert("É necessário incluir o código da OS.") };
		if (!service_order.sale_amount || isNaN(service_order.sale_amount)) { return alert("É necessário incluir a quantidade de vendas da OS.") };

		for (let i in document.getElementsByName("ecommerce-sale-os-checkbox")) {
			if (document.getElementsByName("ecommerce-sale-os-checkbox")[i].checked) {
				service_order.sales.push({ id: document.getElementsByName("ecommerce-sale-os-checkbox")[i].value });
			};
		};

		if (service_order.sale_amount != service_order.sales.length) {
			return alert("A quantidade de vendas selecionadas não corresponde a OS\n\nQuantidade de vendas selecionadas: " + service_order.sales.length + "\nQuantidade de vendas na OS: " + service_order.sale_amount);
		};

		service_order = await API.response(Ecommerce.sale.service_order.save, service_order);
		if (!service_order) { return false };

		e.target.elements.namedItem("datetime").value = "";
		e.target.elements.namedItem("code").value = "";
		e.target.elements.namedItem("sale-amount").value = "";

		Ecommerce.sale.controller.filter.submit.click();
	});
};