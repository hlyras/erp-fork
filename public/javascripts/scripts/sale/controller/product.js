Sale.product.controller = {};

Sale.product.controller.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let product = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};
		
		let properties = ["code","name","color","size"];

		if(product.name.length > 2){
			let products = await Product.filter(product);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};

Sale.product.kart = new lib.kart("sale-product-kart", "Sale.product.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"size":"Tamanho"}]);

Sale.product.kart.add = document.getElementById("sale-product-kart-form");
if(Sale.product.kart.add){
	Sale.product.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("sale-product-kart-form").elements.namedItem("product").readOnly){ 
			return alert("Produto inválido");
		};

		let product = document.getElementById("sale-product-kart-form").elements.namedItem("product");
		let splitedProduct = product.value.split(" | ");
		let amount = document.getElementById("sale-product-kart-form").elements.namedItem("amount").value;

		if(splitedProduct.length < 3 || !splitedProduct){
			alert("É necessário selecionar um produto.");
			return;
		};

		if(amount < 0.01 || !amount){
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

		let price = { category_id: 3, product_id: product.id };
		
		document.getElementById('ajax-loader').style.visibility = 'visible';
		price = await Sale.product.price.find(price);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!price){ return alert("Não foi possível encontrar o valor do produto, favor tentar novamente, caso o erro persista favor contatar o suporte"); };

		product.price = price.price;
		product.total_price = product.amount * product.price;

		Sale.product.kart.insert("id", product);
		Sale.product.kart.update("code");
		Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

		document.getElementById("sale-product-kart-form").elements.namedItem('product').value = "";
		document.getElementById("sale-product-kart-form").elements.namedItem('product').dataset.id = "";
		document.getElementById("sale-product-kart-form").elements.namedItem('amount').value = "";
	});
};

Sale.product.kart.list = function(kart, props){
	if(Sale.product.kart.items.length){
		let html = "";
		html += "<tr>";
		for(i in props){
			html += "<td>"+Object.entries(props[i])[0][1]+"</td>";
		};
		html += "</tr>";
		for(i in Sale.product.kart.items){
			html += "<tr>";
			for(j in props){
				if(j == 0){
					html += "<td>"+Sale.product.kart.items[i][Object.entries(props[j])[0][0]]+"</td>";
				} else {
					html += "<td>"+Sale.product.kart.items[i][Object.entries(props[j])[0][0]]+"</td>";
				};
			};
			html += "<td class='nowrap'>$"+Sale.product.kart.items[i].price.toFixed(2)+"</td>";

			html += "<td class='nowrap'><img class='img-tbl-btn' src='/images/icon/decrease.png' onclick='"+Sale.product.kart.variable+".decrease("+Sale.product.kart.items[i].id+")'></td>";
			html += "<td class='nowrap'><input type='text' id='"+Sale.product.kart.variable+"-"+Sale.product.kart.items[i].id+"' class='border-explicit center bold' onchange='"+Sale.product.kart.variable+".updateAmount("+Sale.product.kart.items[i].id+", this.value);lib.focus(this)' value='"+Sale.product.kart.items[i].amount+"'></td>";
			html += "<td class='nowrap'><img class='img-tbl-btn' src='/images/icon/increase.png' onclick='"+Sale.product.kart.variable+".increase("+Sale.product.kart.items[i].id+")'></td>";
			
			html += "<td class='nowrap bold'>$"+Sale.product.kart.items[i].total_price.toFixed(2)+"</td>";
			html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='"+Sale.product.kart.variable+".remove("+Sale.product.kart.items[i].id+")'></td>";
			
			html += "</tr>";
		};
		document.getElementById(Sale.product.kart.name+"-table").innerHTML = html;
		Sale.product.kart.updateValue();
		Sale.pos.updateValue();
	} else {
		document.getElementById(Sale.product.kart.name+"-table").innerHTML = "";
		Sale.product.kart.updateValue();
		Sale.pos.updateValue();
	};
};

Sale.product.kart.decrease = (obj_id) => {
	for(i in Sale.product.kart.items){
		if(Sale.product.kart.items[i].id == obj_id && Sale.product.kart.items[i].amount > 1){
			Sale.product.kart.items[i].amount -= 1;
			Sale.product.kart.items[i].total_price = Sale.product.kart.items[i].amount * Sale.product.kart.items[i].price;
		};
	};

	let stringified_kart = JSON.stringify(Sale.product.kart.items);
	lib.localStorage.update(Sale.product.kart.name, stringified_kart);
	Sale.product.kart.list(Sale.product.kart.variable, Sale.product.kart.props);
};

Sale.product.kart.increase = (obj_id) => {
	for(let i in Sale.product.kart.items){
		if(Sale.product.kart.items[i].id == obj_id){
			Sale.product.kart.items[i].amount += 1;
			Sale.product.kart.items[i].total_price = Sale.product.kart.items[i].amount * Sale.product.kart.items[i].price;
		};
	};

	let stringified_kart = JSON.stringify(Sale.product.kart.items);
	lib.localStorage.update(Sale.product.kart.name, stringified_kart);
	Sale.product.kart.list(Sale.product.kart.variable, Sale.product.kart.props);
};

Sale.product.kart.updateAmount = async (obj_id, amount) => {
	if(amount < 1){
		alert("Quantidade Inválida");
		return Sale.product.kart.list(Sale.product.kart.variable, Sale.product.kart.props);
	};

	for(i in Sale.product.kart.items){
		if(Sale.product.kart.items[i].id == obj_id){
			Sale.product.kart.items[i].amount = parseInt(amount);
			Sale.product.kart.items[i].total_price = Sale.product.kart.items[i].amount * Sale.product.kart.items[i].price;
			
			let stringified_kart = JSON.stringify(Sale.product.kart.items);
			lib.localStorage.update(Sale.product.kart.name, stringified_kart);

			return Sale.product.kart.list(Sale.product.kart.variable, Sale.product.kart.props);
		};
	};
};

Sale.product.kart.updateValue = () => {
	Sale.product.kart.total_value = 0;
	if(Sale.product.kart.items.length){
		for(i in Sale.product.kart.items){
			Sale.product.kart.total_value += Sale.product.kart.items[i].amount * Sale.product.kart.items[i].price;
		};
	} else {
		Sale.product.kart.total_value = 0;
	};
	document.getElementById("sale-product-value").innerHTML = "$"+Sale.product.kart.total_value.toFixed(2);
};