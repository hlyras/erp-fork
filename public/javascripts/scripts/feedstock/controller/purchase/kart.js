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

		supplier_feedstock[0].amount = amount;

		Feedstock.purchase.controller.kart.insert("id", supplier_feedstock[0]);
		Feedstock.purchase.controller.kart.update("code");
		Feedstock.purchase.controller.kart.list("Feedstock.purchase.controller.kart", Feedstock.purchase.controller.kart.props);

		document.getElementById("purchase-feedstock-add-form").elements.namedItem('feedstock').value = "";
		document.getElementById("purchase-feedstock-add-form").elements.namedItem('feedstock').dataset.id = "";
		document.getElementById("purchase-feedstock-add-form").elements.namedItem('amount').value = "";
	});
}

Feedstock.purchase.controller.kart.list = function(kart, props){
	let kart_div = document.getElementById(this.name+"-div"); kart_div.innerHTML = "";

	if(this.items.length){
		for(i in this.items){

			let feedstock_div = lib.element.create("div", { class: "mobile-box b1 container grid border-explicit margin-top-5 padding-5" });

			feedstock_div.appendChild(lib.element.info("b10", "Código", this.items[i].code));
			feedstock_div.appendChild(lib.element.info("b2-5", "Nome", this.items[i].name));
			feedstock_div.appendChild(lib.element.info("b5", "Cor", this.items[i].color_name));

			this.items[i].uom == "cm" && feedstock_div.appendChild(lib.element.param("b5 border", "Preço do metro", "input", {
				type: "text",
				class: "mobile-box b1 em12 border-bottom padding-3 margin-top-5 center", 
				id: "storage-feedstock-"+this.items[i].id, 
				onchange: this.variable+".updatePrice("+this.items[i].id+", this.value);lib.focus(this);",
				value: this.items[i].price.toFixed(2)
			}));

			this.items[i].uom == "un" && feedstock_div.appendChild(lib.element.param("b5 border", "Preço da unidade", "input", {
				type: "text",
				class: "mobile-box b1 em12 border-bottom padding-3 margin-top-5 center", 
				id: "storage-feedstock-"+this.items[i].id, 
				onchange: this.variable+".updatePrice("+this.items[i].id+", this.value);lib.focus(this);",
				value: this.items[i].price.toFixed(2)
			}));

			feedstock_div.appendChild(lib.element.icon('b10', 20, "/images/icon/save.png", "Feedstock.purchase.controller.feedstock.update("+this.items[i].id+")"));
			
			this.items[i].uom == "cm" && feedstock_div.appendChild(lib.element.info("b5", "Medida do rolo", (this.items[i].unit/100)+"m"));
			this.items[i].uom == "un" && feedstock_div.appendChild(lib.element.info("b5", "Qtd do pacote", this.items[i].unit+"un"));
			
			this.items[i].uom == "cm" && feedstock_div.appendChild(lib.element.info("b5 bold", "Qtd de rolos", lib.roundValue((this.items[i].amount * 100) / this.items[i].unit).toFixed(2)));
			this.items[i].uom == "un" && feedstock_div.appendChild(lib.element.info("b5 bold", "Qtd de pacotes", lib.roundValue(this.items[i].amount / this.items[i].unit).toFixed(2)));

			this.items[i].uom == "cm" && feedstock_div.appendChild(lib.element.param("b4 border", "Qtd em metros", "input", {
				type: "text",
				class: "mobile-box b1 em12 border-bottom padding-3 margin-top-5 center", 
				id: "purchase-feedstock-id-"+this.items[i].id, 
				onchange: this.variable+".updateAmount("+this.items[i].id+", this.value);lib.focus(this);",
				value: parseFloat(this.items[i].amount)
			}));

			this.items[i].uom == "un" && feedstock_div.appendChild(lib.element.param("b4 border", "Qtd em unidades", "input", {
				type: "text",
				class: "mobile-box b1 em12 border-bottom padding-3 margin-top-5 center", 
				id: "purchase-feedstock-id-"+this.items[i].id, 
				onchange: this.variable+".updateAmount("+this.items[i].id+", this.value);lib.focus(this);",
				value: parseFloat(this.items[i].amount)
			}));

			feedstock_div.appendChild(lib.element.info("b4", "Valor total", this.items[i].total_value.toFixed(2)));
			feedstock_div.appendChild(lib.element.icon('b10', 20, "/images/icon/trash.png", this.variable+".remove("+this.items[i].id+")"));

			kart_div.append(feedstock_div);
		};
	} else {
		document.getElementById(this.name+"-div").innerHTML = "<div class='center'>Carrinho vazio, inclua para continuar a compra.</div>";
	};
};

Feedstock.purchase.controller.kart.update = function(key) {
	this.items.forEach(item => {
		if(item.uom == "cm"){ item.total_value = lib.roundValue(parseFloat(item.amount) * parseFloat(item.price)); } 
		else if(item.uom == "un"){ item.total_value = lib.roundValue(parseFloat(item.amount) * (parseFloat(item.price))); }
	});

	!this.items.length && lib.disable("purchase-supplier-id", false);
	this.items.length && lib.disable("purchase-supplier-id", true);

	this.updateKart();

	return this.items = this.items.sort((a, b) => { return a[key] - b[key]; });
};

Feedstock.purchase.controller.kart.updatePrice = function(key, price) {
	if(price < 0 || isNaN(price)){
		alert("Preço Inválido");
		this.update("code");
		this.list(this.variable, this.props);
		return;
	};

	this.items.forEach(item => {
		if(item.id == key){
			item.price = parseFloat(price);

			this.update("code");
			this.list(this.variable, this.props);
			return;
		};
	});
};

Feedstock.purchase.controller.kart.updateAmount = function(key, amount) {
	if(amount < 1 || isNaN(amount)){
		alert("Quantidade Inválida");
		this.update("code");
		this.list(this.variable, this.props);
		return;
	};

	this.items.forEach(item => {
		if(item.id == key){
			item.amount = parseFloat(amount);

			this.update("code");
			this.list(this.variable, this.props);
			return;
		};
	});
};

Feedstock.purchase.controller.kart.updateKart = function() {
	this.value = 0;
	this.items.forEach(item => { this.value += item.total_value; });
	this.total_value = this.value;

	this.shipment_value = parseFloat(document.getElementById("purchase-feedstock-kart-shipment-value").value);
	this.discount_value = parseFloat(document.getElementById("purchase-feedstock-kart-discount-value").value);

	if(this.shipment_value){ this.total_value += this.shipment_value; }
	if(this.discount_value){ this.total_value -= this.discount_value; }

	Feedstock.purchase.view.kart();
};

Feedstock.purchase.controller.kart.remove = function(obj_id) {
	let kart_backup = [];
	for(let i in this.items){
		if(this.items[i].id != obj_id){
			kart_backup.push(this.items[i]);
		};
	};

	this.items = kart_backup;

	this.update("code");
	this.list(this.variable, this.props);
	return;
};

Feedstock.purchase.controller.feedstock = {};

Feedstock.purchase.controller.feedstock.update = async (feedstock_id) => {
	let r = confirm('Confirmar alteração do preço?');
	if(r){
		let feedstock = {
			id: feedstock_id,
			price: document.getElementById("storage-feedstock-"+feedstock_id).value
		};

		let response = await API.response(Feedstock.supplier.storage.update, feedstock);
		if(!response) { return false; }

		Feedstock.purchase.controller.kart.items.forEach(item => {
			if(item.id == feedstock_id){ 
				item.price = parseFloat(feedstock.price);
			};
		});

		Feedstock.purchase.controller.kart.update("code");
		Feedstock.purchase.controller.kart.list("Feedstock.purchase.controller.kart", Feedstock.purchase.controller.kart.props);
	}
};

Feedstock.purchase.controller.feedstock.updateAmount = async (feedstock_id, amount) => {
	let r = confirm('Confirmar alteração do preço?');
	if(r){
		let feedstock = {
			id: feedstock_id,
			price: document.getElementById("storage-feedstock-"+feedstock_id).value
		};

		let response = await API.response(Feedstock.supplier.storage.update, feedstock);
		if(!response) { return false; }

		Feedstock.purchase.controller.kart.items.forEach(item => {
			if(item.id == feedstock_id){ 
				item.price = parseFloat(feedstock.price);
			};
		});

		Feedstock.purchase.controller.kart.update("code");
		Feedstock.purchase.controller.kart.list("Feedstock.purchase.controller.kart", Feedstock.purchase.controller.kart.props);
	}
};