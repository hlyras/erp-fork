Ecommerce.sale.product.controller = {};

Ecommerce.sale.product.controller.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let product = {
			code: "",
			name: input.value,
			color: "",
			brand: ""
		};

		let properties = ["code", "name", "color", "size"];

		if (product.name.length > 2) {
			let products = await Product.filter(product);
			if (!products) { return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};

Ecommerce.sale.product.kart = new lib.kart("ecommerce-sale-product-kart", "Ecommerce.sale.product.kart", [{ "code": "Código" }, { "name": "Nome" }, { "color": "Cor" }, { "size": "Tamanho" }]);

Ecommerce.sale.product.kart.add = document.getElementById("ecommerce-sale-product-kart-form");
if (Ecommerce.sale.product.kart.add) {
	Ecommerce.sale.product.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (!document.getElementById("ecommerce-sale-product-kart-form").elements.namedItem("product").readOnly) {
			return alert("Produto inválido");
		};

		let product = document.getElementById("ecommerce-sale-product-kart-form").elements.namedItem("product");
		let splitedProduct = product.value.split(" | ");
		let amount = document.getElementById("ecommerce-sale-product-kart-form").elements.namedItem("amount").value;

		if (splitedProduct.length < 3 || !splitedProduct) {
			alert("É necessário selecionar um produto.");
			return;
		};

		if (amount < 0.01 || !amount) {
			alert("É necessário preencher a quantidade do produto.");
			return;
		};

		product = {
			id: product.dataset.id,
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount)
		};

		Ecommerce.sale.product.kart.insert("id", product);
		Ecommerce.sale.product.kart.update("code");
		Ecommerce.sale.product.kart.list("Ecommerce.sale.product.kart", Ecommerce.sale.product.kart.props);

		document.getElementById("ecommerce-sale-product-kart-form").elements.namedItem('product').value = "";
		document.getElementById("ecommerce-sale-product-kart-form").elements.namedItem('product').dataset.id = "";
		document.getElementById("ecommerce-sale-product-kart-form").elements.namedItem('amount').value = "";
	});
};

Ecommerce.sale.product.kart.list = function (kart, props) {
	if (Ecommerce.sale.product.kart.items.length) {
		let html = "";
		for (i in Ecommerce.sale.product.kart.items) {
			html += "<div class='box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b9 center margin-top-5'>" + Ecommerce.sale.product.kart.items[i].code + "</div>";
			html += "<div class='mobile-box b2-3 center margin-top-5'>" + Ecommerce.sale.product.kart.items[i].name + "</div>";
			html += "<div class='mobile-box b9 center margin-top-5'>" + Ecommerce.sale.product.kart.items[i].color + "</div>";
			html += "<div class='mobile-box b9 center margin-top-5'>" + Ecommerce.sale.product.kart.items[i].size + "</div>";
			html += "<div class='mobile-box b4 center center margin-top-5'><img class='icon size-15' src='/images/icon/decrease.png' onclick='" + Ecommerce.sale.product.kart.variable + ".decrease(" + Ecommerce.sale.product.kart.items[i].id + ")'></div>";
			html += "<input class='mobile-box b4 center border-explicit center margin-top-5 bold' type='text' id='" + Ecommerce.sale.product.kart.variable + "-" + Ecommerce.sale.product.kart.items[i].id + "' onchange='" + Ecommerce.sale.product.kart.variable + ".updateAmount(" + Ecommerce.sale.product.kart.items[i].id + ", this.value);lib.focus(this)' value='" + Ecommerce.sale.product.kart.items[i].amount + "'>";
			html += "<div class='mobile-box b4 center center margin-top-5'><img class='icon size-15' src='/images/icon/increase.png' onclick='" + Ecommerce.sale.product.kart.variable + ".increase(" + Ecommerce.sale.product.kart.items[i].id + ")'></div>";
			html += "<div class='mobile-box b4 center center margin-top-5'><img class='icon size-20' src='/images/icon/trash.png' onclick='" + Ecommerce.sale.product.kart.variable + ".remove(" + Ecommerce.sale.product.kart.items[i].id + ")'></div>";
			html += "</div>";
		};
		document.getElementById(Ecommerce.sale.product.kart.name + "-div").innerHTML = html;
	} else {
		document.getElementById(Ecommerce.sale.product.kart.name + "-div").innerHTML = "";
	};
};

Ecommerce.sale.product.kart.decrease = (obj_id) => {
	for (i in Ecommerce.sale.product.kart.items) {
		if (Ecommerce.sale.product.kart.items[i].id == obj_id && Ecommerce.sale.product.kart.items[i].amount > 1) {
			Ecommerce.sale.product.kart.items[i].amount -= 1;
		};
	};

	let stringified_kart = JSON.stringify(Ecommerce.sale.product.kart.items);
	Ecommerce.sale.product.kart.list(Ecommerce.sale.product.kart.variable, Ecommerce.sale.product.kart.props);
};

Ecommerce.sale.product.kart.increase = (obj_id) => {
	for (let i in Ecommerce.sale.product.kart.items) {
		if (Ecommerce.sale.product.kart.items[i].id == obj_id) {
			Ecommerce.sale.product.kart.items[i].amount += 1;
		};
	};

	let stringified_kart = JSON.stringify(Ecommerce.sale.product.kart.items);
	Ecommerce.sale.product.kart.list(Ecommerce.sale.product.kart.variable, Ecommerce.sale.product.kart.props);
};

Ecommerce.sale.product.kart.updateAmount = async (obj_id, amount) => {
	if (amount < 1) {
		alert("Quantidade Inválida");
		return Ecommerce.sale.product.kart.list(Ecommerce.sale.product.kart.variable, Ecommerce.sale.product.kart.props);
	};

	for (i in Ecommerce.sale.product.kart.items) {
		if (Ecommerce.sale.product.kart.items[i].id == obj_id) {
			Ecommerce.sale.product.kart.items[i].amount = parseInt(amount);

			let stringified_kart = JSON.stringify(Ecommerce.sale.product.kart.items);

			return Ecommerce.sale.product.kart.list(Ecommerce.sale.product.kart.variable, Ecommerce.sale.product.kart.props);
		};
	};
};