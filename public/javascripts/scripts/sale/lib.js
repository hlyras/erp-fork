lib.lastIndex = (array) => {
	return array.length - 1;
};

lib.kart = function(name) {
	this.name = name;
	this.items = [];

	this.add = function(key, item) {
		for(i in this.items){
			if(this.items[i][key] == item[key]){
				return alert("Você já incluiu este produto no carrinho.");
			};
		};

		this.items.push(item);
		this.update(this.items);

		let stringified_kart = JSON.stringify(this.items);
		lib.localStorage.update(this.name, stringified_kart);
	};

	this.list = function(properties) {
		if(this.items.length){
			var html = "";
			html += "<tr>";
			for(i in properties){
				html += "<td>Código</td>";
			};
			html += "</tr>";
			for(i in this.items){
				html += "<tr>";
				for(j in properties){
					if(j == 0){
						html += "<td class='nowrap'>"+this.items[i][properties[j]]+"</td>";
					} else {
						html += "<td'>"+this.items[i][properties[j]]+"</td>";
					};
				};
				// html += "<td class='nowrap'><img class='img-tbl-btn' src='/images/icon/decrease.png' onclick='Sale.controller.kart.product.decrease("+this.items[i].id+")'></td>";
				// html += "<td class='nowrap'><input type='text' id='kart-product-"+this.items[i].id+"' class='border-explicit center' onchange='Sale.controller.kart.product.updateAmount("+this.items[i].id+",this.value);lib.focus(this)' value='"+this.items[i].amount+"'></td>";
				// html += "<td class='nowrap'><img class='img-tbl-btn' src='/images/icon/increase.png' onclick='Sale.controller.kart.product.increase("+this.items[i].id+")'></td>";
				// html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Sale.controller.kart.product.remove("+this.items[i].id+")'></td>";
				html += "</tr>";
			};
			document.getElementById(this.name+"-table").innerHTML = html;
		} else {
			document.getElementById(this.name+"-table").innerHTML = "Não há registros!";
		};
	};
	
	this.update = function(key) {
		return this.items = this.items.sort((a, b) => {
			return a[key] - b[key];
		});	
	};

	this.increase = function() {

	};

	this.decrease = function() {

	};
};

lib.kart.add = function() {

};

let sale_kart = new lib.kart("sale-kart");

sale_kart.update("id");

console.log(sale_kart);