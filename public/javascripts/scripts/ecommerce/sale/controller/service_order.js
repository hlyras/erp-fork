Ecommerce.sale.controller.service_order = {};

Ecommerce.sale.controller.service_order.save = document.getElementById("ecommerce-sale-os-create-form");
if(Ecommerce.sale.controller.service_order.save){
	Ecommerce.sale.controller.service_order.save.addEventListener("submit", async event => {
		event.preventDefault();

		let service_order = {
			datetime: event.target.elements.namedItem("datetime").value,
			code: event.target.elements.namedItem("code").value,
			sale_amount: event.target.elements.namedItem("sale-amount").value,
			sales: []
		};

		if(!service_order.datetime){ return alert("É necessário incluir a data e hora da OS.")};
		if(!service_order.code){ return alert("É necessário incluir o código da OS.")};
		if(!service_order.sale_amount || isNaN(service_order.sale_amount)){ return alert("É necessário incluir a quantidade de vendas da OS.")};

		for(let i in document.getElementsByName("ecommerce-sale-os-checkbox")){
			if(document.getElementsByName("ecommerce-sale-os-checkbox")[i].checked){
				service_order.sales.push({ id: document.getElementsByName("ecommerce-sale-os-checkbox")[i].value });
			};
		};

		if(service_order.sale_amount != service_order.sales.length){
			return alert("A quantidade de vendas selecionadas não corresponde a OS\n\nQuantidade de vendas selecionadas: "+service_order.sales.length+"\nQuantidade de vendas na OS: "+service_order.sale_amount);
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		service_order = await Ecommerce.sale.service_order.save(service_order);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!service_order) { return false };

		event.target.elements.namedItem("datetime").value = "";
		event.target.elements.namedItem("code").value = "";
		event.target.elements.namedItem("sale-amount").value = "";

		Ecommerce.sale.controller.filter.submit.click();
	});
};