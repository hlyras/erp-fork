Sale.package.controller = {};

Sale.package.controller.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let package = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};
		
		if(package.name.length > 2){
			let products = await Product.package.filter(package);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", ["code","name","color","weight"]);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", ["code","name","color","weight"]);
		};
	}
};

Sale.package.kart = new lib.kart("sale-package-kart", "Sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"price":"Preço"},{"weight":"Peso"}]);

Sale.package.kart.add = document.getElementById("sale-package-kart-form");
if(Sale.package.kart.add){
	Sale.package.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("sale-package-kart-form").elements.namedItem("package").readOnly){ 
			return alert("Pacote inválido");
		};

		let package = document.getElementById("sale-package-kart-form").elements.namedItem("package");
		let amount = document.getElementById("sale-package-kart-form").elements.namedItem("amount").value;

		if(package.dataset.id <= 0 || !package.dataset.id || isNaN(package.dataset.id)){
			alert("É necessário selecionar um pacote.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de pacotes.");
			return;
		};

		package = await API.response(Product.package.findById, package.dataset.id);
		if(!package){ return false };

		package.amount = parseInt(amount);
		package.package_id = 1;
		package.setup = "padrão";

		for(let i in Sale.package.kart.items){
			if(package.package_id <= parseInt(Sale.package.kart.items[i].package_id)){
				package.package_id = parseInt(Sale.package.kart.items[i].package_id) + 1;
			};
		};

		package.total_weight = package.amount * package.weight;
		
		let price = { category_id: parseInt(Sale.controller.category.value), package_id: package.id };

		price = await API.response(Sale.package.price.find, price);
		if(!price){ return alert("Não foi possível encontrar o valor do pacote, favor tentar novamente, caso o erro persista favor contatar o suporte"); };

		package.price = price.price;
		package.total_price = package.amount * package.price;

		package.id = package.package_id;

		Sale.package.kart.insert("id", package);
		Sale.package.kart.update("code");

		Sale.package.product = Sale.package.kart.items.reduce((kart_package, backup_package) => {
			for(let i in Sale.package.product){
				if(Sale.package.product[i].id == backup_package.id){
					return Sale.package.product;
				};
			};

			Sale.package.product["kart"+backup_package.id] = new lib.kart("sale-package-product-kart"+backup_package.id, "Sale.package.product.kart"+backup_package.id, [{"product_info":"Descrição"}]);
			Sale.package.product["kart"+backup_package.id].id = backup_package.id;

			for(let j in backup_package.products){
				Sale.package.product["kart"+backup_package.id].insert("product_id", backup_package.products[j]);
			};
			Sale.package.product["kart"+backup_package.id].update("product_code");

			return Sale.package.product;
		}, Sale.package.product);

		Sale.package.kart.list("Sale.package.kart", Sale.package.kart.props);
	
		for(let i in Sale.package.product){ Sale.package.kart.set(Sale.package.product[i].id); };

		document.getElementById("sale-package-kart-form").elements.namedItem('package').value = "";
		document.getElementById("sale-package-kart-form").elements.namedItem('package').dataset.id = "";
		document.getElementById("sale-package-kart-form").elements.namedItem('amount').value = "";
	});
};

Sale.package.kart.activate = () => {
	for(let i in Sale.package.product){ Sale.package.kart.set(Sale.package.product[i].id); };
};

Sale.package.kart.list = (kart, props) => {
	if(Sale.package.kart.items.length){
		let html = "";
		for(i in Sale.package.kart.items){
			html += "<div class='box b1 container border center padding-5 margin-top-5'>";
				html += "<div id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-hider' class='mobile-box b6 center pointer box-hover border-explicit' onclick='lib.displayDiv(`sale-package-product-kart"+Sale.package.kart.items[i].id+"-box`, this);'>P"+Sale.package.kart.items[i].id+"</div>";
				html += "<div class='mobile-box b2 center'>"+Sale.package.kart.items[i].name+"</div>";
				html += "<div class='mobile-box b6 center'>"+Sale.package.kart.items[i].color+"</div>";
				html += "<div class='mobile-box b6 center'>$"+Sale.package.kart.items[i].price.toFixed(2)+"</div>";
				html += "<div id='sale-package-product-kart"+Sale.package.kart.items[i].package_id+"-setup' class='mobile-box a3 bold center'>"+Sale.package.kart.items[i].setup+"</div>";
				html += "<div class='mobile-box a9 center margin-top-10'><img class='icon size-15' src='/images/icon/decrease.png' onclick='"+kart+".decrease("+Sale.package.kart.items[i].id+")'></div>";
				html += "<input class='mobile-box a6 border-explicit center margin-top-10 bold' type='text' id='sale-package-kart"+Sale.package.kart.items[i].id+"' onchange='"+kart+".updateAmount("+Sale.package.kart.items[i].id+", this.value);lib.focus(this)' value='"+Sale.package.kart.items[i].amount+"'>";
				html += "<div class='mobile-box a9 center margin-top-10'><img class='icon size-15' src='/images/icon/increase.png' onclick='"+kart+".increase("+Sale.package.kart.items[i].id+")'></div>";
				html += "<div class='mobile-box a6 center margin-top-10 bold'>$"+Sale.package.kart.items[i].total_price.toFixed(2)+"</div>";
				html += "<div class='mobile-box a9 center margin-top-10'><img class='icon size-20' src='/images/icon/trash.png' onclick='"+kart+".remove("+Sale.package.kart.items[i].id+")'></div>";

				html += "<div id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-box' class='box b1 container border margin-top-10' style='display:none'>";
					html += "<form id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-form' class='box b1 container'>";
					html += "<input type='hidden' name='id' value=''>";
					html += "<div class='mobile-box b2-3 container dropdown ground margin-top-5'>";
					html += "<ul class='box b1 container'>";
					html += "<li>";
					html += "<input type='hidden' name='package_id' value='"+Sale.package.kart.items[i].id+"'>";
					html += "<input type='hidden' name='product_id'>";
					html += "<input type='text' id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-dropdown-input' name='product' data-id='' class='box b1 input-generic center' oninput='Sale.product.controller.dropdown.filter(this, `sale-product-package-kart"+Sale.package.kart.items[i].id+"-dropdown`)' placeholder='Descrição do produto' onclick='if(this.readOnly){this.value=``; this.readOnly = false;}' autocomplete='off'>";
					html += "<ul id='sale-product-package-kart"+Sale.package.kart.items[i].id+"-dropdown' class='box b1'></ul>";
					html += "</li></ul></div>";
					html += "<input type='number' name='amount' class='mobile-box b6 input-generic center margin-top-5' placeholder='Qtd'>";
					html += "<button type='submit' name='submit' class='mobile-box b6 submit-generic margin-top-5 pointer'><img class='img-tbl-btn' src='/images/icon/increase.png'></button>";
					html += "</form>";

					html += "<table id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-table' class='tbl-info box b1 center ground padding-10 margin-top-10'></table>";
				html += "</div>";
			html += "</div>";
		};
		
		document.getElementById(Sale.package.kart.name+"-div").innerHTML = html;
		
		for(let i in Sale.package.kart.items){
			Sale.package.product["kart"+Sale.package.kart.items[i].package_id].update("product_code");
			Sale.package.product["kart"+Sale.package.kart.items[i].id].list(Sale.package.product["kart"+Sale.package.kart.items[i].id].name, Sale.package.product["kart"+Sale.package.kart.items[i].id].props)
		};
		Sale.package.kart.updateValue();
		Sale.package.kart.updateWeight();
		Sale.pos.updateValue();
		Sale.pos.updateWeight();
	} else {
		document.getElementById(Sale.package.kart.name+"-div").innerHTML = "";
		
		Sale.package.kart.updateValue();
		Sale.package.kart.updateWeight();
		Sale.pos.updateValue();
		Sale.pos.updateWeight();
	};
};

Sale.package.kart.decrease = (obj_id) => {
	for(i in Sale.package.kart.items){
		if(Sale.package.kart.items[i].id == obj_id && Sale.package.kart.items[i].amount > 1){
			Sale.package.kart.items[i].amount -= 1;
			Sale.package.kart.items[i].total_price = Sale.package.kart.items[i].amount * Sale.package.kart.items[i].price;
			Sale.package.kart.items[i].total_weight = Sale.package.kart.items[i].amount * Sale.package.kart.items[i].weight;
		};
	};
	
	Sale.package.kart.list(Sale.package.kart.variable, Sale.package.kart.props);
	Sale.package.kart.activate();
};

Sale.package.kart.increase = (obj_id) => {
	for(let i in Sale.package.kart.items){
		if(Sale.package.kart.items[i].id == obj_id){
			Sale.package.kart.items[i].amount += 1;
			Sale.package.kart.items[i].total_price = Sale.package.kart.items[i].amount * Sale.package.kart.items[i].price;
			Sale.package.kart.items[i].total_weight = Sale.package.kart.items[i].amount * Sale.package.kart.items[i].weight;
		};
	};
	
	Sale.package.kart.list(Sale.package.kart.variable, Sale.package.kart.props);
	Sale.package.kart.activate();
};

Sale.package.kart.remove = (obj_id) => {
	var kart_backup = [];
	for(let i in Sale.package.kart.items){
		if(Sale.package.kart.items[i].id != obj_id){
			kart_backup.push(Sale.package.kart.items[i]);
		};
	};

	Sale.package.kart.items = kart_backup;

	for(let i in Sale.package.product){
		if(Sale.package.product[i].id == obj_id){
			delete Sale.package.product[i];
		};
	};

	
	Sale.package.kart.list(Sale.package.kart.variable, Sale.package.kart.props);
	Sale.package.kart.activate();
};

Sale.package.product = {};

Sale.package.kart.set = (id) => {
	Sale.package.product["kart"+id].add = document.getElementById(Sale.package.product["kart"+id].name+"-form");
	if(Sale.package.product["kart"+id].add){
		Sale.package.product["kart"+id].add.addEventListener("submit", async event => {
			event.preventDefault();

			if(!document.getElementById(Sale.package.product["kart"+id].name+"-form").elements.namedItem("product").readOnly){ 
				return alert("Produto inválido");
			};

			let product = document.getElementById(Sale.package.product["kart"+id].name+"-form").elements.namedItem("product");
			let splitedProduct = product.value.split(" | ");
			let amount = document.getElementById(Sale.package.product["kart"+id].name+"-form").elements.namedItem("amount").value;

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
				package_id: id,
				product_id: product.dataset.id,
				product_code: splitedProduct[0],
				product_info: product.value,
				amount: parseInt(amount)
			};

			for(let i in Sale.package.product['kart'+id].items){
				if(product.id <= parseInt(Sale.package.product['kart'+id].items[i].id)){
					product.id = parseInt(Sale.package.product['kart'+id].items[i].id) + 1;
				};
			};

			if(!Sale.package.product["kart"+id].insert("product_id", product)){ return false; };
			Sale.package.product["kart"+id].update("product_code");
			Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].name, Sale.package.product["kart"+id].props);

			Sale.package.updateSetup(id);

			event.target.elements.namedItem("product").dataset.id = "";
			event.target.elements.namedItem("product").value = "";
			event.target.elements.namedItem("amount").value = "";
		});
	};

	Sale.package.product["kart"+id].decrease = (obj_id) => {
		for(i in Sale.package.product["kart"+id].items){
			if(Sale.package.product["kart"+id].items[i].id == obj_id && Sale.package.product["kart"+id].items[i].amount > 1){
				Sale.package.product["kart"+id].items[i].amount -= 1;
			};
		};
		Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].variable, Sale.package.product["kart"+id].props);
	
		Sale.package.updateSetup(id);
	};

	Sale.package.product["kart"+id].increase = (obj_id) => {
		for(let i in Sale.package.product["kart"+id].items){
			if(Sale.package.product["kart"+id].items[i].id == obj_id){
				Sale.package.product["kart"+id].items[i].amount += 1;
			};
		};
		Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].variable, Sale.package.product["kart"+id].props);
		
		Sale.package.updateSetup(id);
	};

	Sale.package.product["kart"+id].updateAmount = async (obj_id, amount) => {
		if(amount < 1 || isNaN(amount)){
			alert("Quantidade Inválida");
			return Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].variable, Sale.package.product["kart"+id].props);
		};

		for(i in Sale.package.product["kart"+id].items){
			if(Sale.package.product["kart"+id].items[i].id == obj_id){
				Sale.package.product["kart"+id].items[i].amount = parseInt(amount);
				

				Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].variable, Sale.package.product["kart"+id].props);
				return Sale.package.updateSetup(id);
			};
		};
	};

	Sale.package.product["kart"+id].remove = (obj_id) => {
		var kart_backup = [];
		for(let i in Sale.package.product["kart"+id].items){
			if(Sale.package.product["kart"+id].items[i].id != obj_id){
				kart_backup.push(Sale.package.product["kart"+id].items[i]);
			};
		};

		Sale.package.product["kart"+id].items = kart_backup;

		if(!Sale.package.product["kart"+id].items.length){ return Sale.package.kart.remove(id);/**/ };

		Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].variable, Sale.package.product["kart"+id].props);
		
		Sale.package.updateSetup(id);
	};
};

Sale.package.updateSetup = (id) => {
	for(let i in Sale.package.kart.items){
		if(Sale.package.kart.items[i].package_id == id && Sale.package.kart.items[i].setup == "padrão"){ 
			Sale.package.kart.items[i].setup = "personalizado";
			document.getElementById("sale-package-product-kart"+Sale.package.kart.items[i].package_id+"-setup").innerHTML = "personalizado";
		};
	};
};

Sale.package.kart.updateValue = () => {
	Sale.package.kart.total_value = 0;
	if(Sale.package.kart.items.length){
		for(i in Sale.package.kart.items){
			Sale.package.kart.total_value += Sale.package.kart.items[i].amount * Sale.package.kart.items[i].price;
		};
	} else {
		Sale.package.kart.total_value = 0;
	};
	document.getElementById("sale-package-value").innerHTML = "$"+Sale.package.kart.total_value.toFixed(2);
};

Sale.package.kart.updateWeight = () => {
	Sale.package.kart.total_weight = 0;
	if(Sale.package.kart.items.length){
		for(i in Sale.package.kart.items){
			Sale.package.kart.total_weight += Sale.package.kart.items[i].amount * Sale.package.kart.items[i].weight;
		};
	} else {
		Sale.package.kart.total_weight = 0;
	};
	document.getElementById("sale-package-weight").innerHTML = Sale.package.kart.total_weight+"g";
};
