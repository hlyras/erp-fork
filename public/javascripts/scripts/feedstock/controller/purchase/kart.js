Feedstock.purchase.controller.kart = new lib.kart("purchase-feedstock-add", "Feedstock.purchase.controller.kart", [{"code":"Código"},{"name":"Nome"},{"color_name":"Cor"},{"unit":"Med. padrão"},{"uom":"Un de medida"}]);

Feedstock.purchase.controller.add = document.getElementById("purchase-feedstock-add-form");
if(Feedstock.purchase.controller.add){
	Feedstock.purchase.controller.add.addEventListener("submit", async event => {
		event.preventDefault();

		let feedstock = event.target.elements.namedItem("feedstock");
		if(!feedstock.readOnly){ return alert("Matéria-prima inválida"); };
		let supplier_id = event.target.elements.namedItem("supplier-id").value;
		let amount = parseFloat(event.target.elements.namedItem("amount").value);
		
		if(!feedstock){ return alert("É necessário selecionar um produto."); }
		if(amount < 0.01 || !amount){ return alert("É necessário preencher o preço do produto."); }

		let supplier_feedstock = { id: feedstock.dataset.id };

		supplier_feedstock = await API.response(Feedstock.supplier.storage.filter, supplier_feedstock);
		if(!supplier_feedstock) { return false; }

		console.log(supplier_feedstock);

		supplier_feedstock[0].amount = amount;
		if(supplier_feedstock[0].uom == "cm"){
			supplier_feedstock[0].total_value = lib.roundValue(parseFloat(amount) * parseFloat(supplier_feedstock[0].price));
		} else if(supplier_feedstock[0].uom == "un"){
			supplier_feedstock[0].total_value = lib.roundValue(parseFloat(amount) * (parseFloat(supplier_feedstock[0].price)));
		}

		Feedstock.purchase.controller.kart.insert("id", supplier_feedstock[0]);
		Feedstock.purchase.controller.kart.update("code");
		Feedstock.purchase.controller.kart.list("Feedstock.purchase.controller.kart", Feedstock.purchase.controller.kart.props);

		document.getElementById("purchase-feedstock-add-form").elements.namedItem('feedstock').value = "";
		document.getElementById("purchase-feedstock-add-form").elements.namedItem('feedstock').dataset.id = "";
		document.getElementById("purchase-feedstock-add-form").elements.namedItem('amount').value = "";

		if(!Feedstock.purchase.controller.kart.items.length){ return document.getElementById("purchase-supplier-select").disabled = false; }
		document.getElementById("purchase-supplier-select").disabled = true;
	});
}

lib.element.param = (box, param, element, option) => {
	let divParent = lib.element.create("div", { class: "mobile-box "+box+" container padding-5 margin-top-5" });
	let divInput = lib.element.create("div", { class: "mobile-box b1 em06" }, param);
	let divValue = lib.element.create(element, option);

	divParent.appendChild(divInput);
	divParent.appendChild(divValue);
	return divParent;
};

Feedstock.purchase.controller.kart.list = function(kart, props){
	let kart_div = document.getElementById(this.name+"-div"); kart_div.innerHTML = "";

	if(this.items.length){
		for(i in this.items){
			let feedstock_div = lib.element.create("div", { class: "mobile-box b1 container border-explicit margin-top-5 padding-5" });

			feedstock_div.appendChild(lib.element.info("b10", "Código", this.items[i].code));
			feedstock_div.appendChild(lib.element.info("b2-5", "Nome", this.items[i].name));
			feedstock_div.appendChild(lib.element.info("b5", "Cor", this.items[i].color_name));
			this.items[i].uom == "cm" && feedstock_div.appendChild(lib.element.info("b5", "Preço do metro", this.items[i].price.toFixed(2)));
			this.items[i].uom == "un" && feedstock_div.appendChild(lib.element.info("b5", "Preço da unidade", this.items[i].price.toFixed(2)));
			feedstock_div.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Feedstock.purchase.feedstock.controller.edit("+this.items[i].id+")"));
			
			this.items[i].uom == "cm" && feedstock_div.appendChild(lib.element.info("b5", "Medida do rolo", (this.items[i].unit/100)+"m"));
			this.items[i].uom == "un" && feedstock_div.appendChild(lib.element.info("b5", "Qtd do pacote", this.items[i].unit+"un"));
			
			feedstock_div.appendChild(lib.element.info("b5 bold", "Un de medida", this.items[i].uom));

			feedstock_div.appendChild(lib.element.param("b4 border", "Qtd em metros", "input", {
				type: "text",
				class: "mobile-box b1 em12 border-bottom padding-3 margin-top-5 center", 
				id: "purchase-feedstock-id-"+this.items[i].id, 
				onchange: this.variable+".updateAmount("+this.items[i].id+", this.value);lib.focus(this);",
				value: parseFloat(this.items[i].amount)
			}));

			feedstock_div.appendChild(lib.element.info("b5", "Valor total", this.items[i].total_value.toFixed(2)));
			// feedstock_div.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Feedstock.purchase.feedstock.controller.edit("+this.items[i].id+")"));

			// html += "<div class='box b1 container'>";
			// html += "<div class='padding-3'><img class='size-15 icon padding-3 pointer' src='/images/icon/decrease.png' onclick='"+this.variable+".decrease("+this.items[i].id+")'></div>";
			// html += "<div><input type='text' id='"+this.variable+"-"+this.items[i].id+"' class='width-100 em11 border-bottom center' onchange='"+this.variable+".updateAmount("+this.items[i].id+", this.value);lib.focus(this)' value='"+this.items[i].amount+"'></div>";
			// html += "<div class='padding-3'><img class='size-15 icon padding-3 pointer' src='/images/icon/increase.png' onclick='"+this.variable+".increase("+this.items[i].id+")'></div>";
			// html += "<div class='padding-3'><img class='size-20 icon padding-3 pointer' src='/images/icon/trash.png' onclick='"+this.variable+".remove("+this.items[i].id+")'></div>";
			// html += "</div>";
			kart_div.append(feedstock_div);
		};
	} else {
		document.getElementById(this.name+"-div").innerHTML = "Carrinho vazio, inclua para continuar a compra.";
	};
};

Feedstock.purchase.controller.kart.update = function(key) {
	return this.items = this.items.sort((a, b) => {
		return a[key] - b[key];
	});
};

Feedstock.purchase.controller.kart.updateAmount = function(key) {
	return this.items = this.items.sort((a, b) => {
		return a[key] - b[key];
	});
};

Feedstock.purchase.controller.feedstock = {};

Feedstock.purchase.controller.feedstock.edit = (feedstock_id) => {
	console.log(feedstock_id);
};