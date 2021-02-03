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
		
		let properties = ["code","name","color","price"];

		if(package.name.length > 2){
			let products = await Product.package.filter(package);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};

Sale.package.kart = new lib.kart("sale-package-kart", "Sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"price":"Preço"}]);

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

		document.getElementById('ajax-loader').style.visibility = 'visible';
		package = await Product.package.findById(package.dataset.id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!package){ return false };

		package.amount = parseInt(amount);

		if(lib.localStorage.verify("sale-package-product-kart-id")){
			package.id = parseInt(localStorage.getItem('sale-package-product-kart-id'));
			lib.localStorage.update("sale-package-product-kart-id", (parseInt(package.id) + 1));
		} else {
			package.id = 1;
			lib.localStorage.update("sale-package-product-kart-id", (parseInt(package.id) + 1));
		};

		Sale.package.kart.insert("id", package);
		Sale.package.kart.update("code");

		let stringified_kart = JSON.stringify(Sale.package.kart.items);
		lib.localStorage.update(Sale.package.kart.name, stringified_kart);

		for(let i in Sale.package.kart.items){
			Sale.package.product["kart"+Sale.package.kart.items[i].id] = new lib.kart("sale-package-product-kart"+Sale.package.kart.items[i].id, "Sale.package.product.kart"+Sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
			Sale.package.product["kart"+Sale.package.kart.items[i].id].id = Sale.package.kart.items[i].id;
			
			for(let j in Sale.package.kart.items[i].products){
				Sale.package.product["kart"+Sale.package.kart.items[i].id].insert("id", Sale.package.kart.items[i].products[j]);
			};
			
			Sale.package.product["kart"+Sale.package.kart.items[i].id].update("id");
		};
		Sale.package.kart.list("Sale.package.kart", Sale.package.kart.props);
	
		for(let i in Sale.package.product){ Sale.package.kart.set(Sale.package.product[i].id); };

		document.getElementById("sale-package-kart-form").elements.namedItem('package').value = "";
		document.getElementById("sale-package-kart-form").elements.namedItem('package').dataset.id = "";
		document.getElementById("sale-package-kart-form").elements.namedItem('amount').value = "";
	});
};

Sale.package.kart.list = (kart, props) => {
	if(Sale.package.kart.items.length){
		let html = "";
		for(i in Sale.package.kart.items){
			html += "<div class='box one container border center padding-5 margin-top-5'>";
				html += "<div id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-hider' class='mobile-box nine center pointer box-hover border-explicit' onclick='lib.displayDiv(`sale-package-product-kart"+Sale.package.kart.items[i].id+"-box`, this);'>P"+Sale.package.kart.items[i].id+"</div>";
				html += "<div class='mobile-box three center'>"+Sale.package.kart.items[i].name+"</div>";
				html += "<div class='mobile-box nine center'>"+Sale.package.kart.items[i].color+"</div>";
				html += "<div class='mobile-box twelve center'>$"+Sale.package.kart.items[i].price+"</div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-15' src='/images/icon/decrease.png' onclick='"+kart+".decrease("+Sale.package.kart.items[i].id+")'></div>";
				html += "<input class='mobile-box nine border-explicit center' type='text' id='sale-package-kart"+Sale.package.kart.items[i].id+"' onchange='"+kart+".updateAmount("+Sale.package.kart.items[i].id+", this.value);lib.focus(this)' value='"+Sale.package.kart.items[i].amount+"'>";
				html += "<div class='mobile-box twelve center'><img class='icon size-15' src='/images/icon/increase.png' onclick='"+kart+".increase("+Sale.package.kart.items[i].id+")'></div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-20' src='/images/icon/trash.png' onclick='"+kart+".remove("+Sale.package.kart.items[i].id+")'></div>";

				html += "<div id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-box' class='box one container border margin-top-10' style='display:none'>";
					html += "<form id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-form' class='box one container'>";
					html += "<input type='hidden' name='id' value=''>";
					html += "<div class='mobile-box two-thirds container dropdown ground margin-top-5'>";
					html += "<ul class='box one container'>";
					html += "<li>";
					html += "<input type='hidden' name='package_id' value='"+Sale.package.kart.items[i].id+"'>";
					html += "<input type='hidden' name='product_id'>";
					html += "<input type='text' id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-dropdown-input' name='product' data-id='' class='box one input-generic center' oninput='Sale.product.controller.dropdown.filter(this, `sale-product-package-kart"+Sale.package.kart.items[i].id+"-dropdown`)' placeholder='Descrição do produto' onclick='if(this.readOnly){this.value=``; this.readOnly = false;}' autocomplete='off'>";
					html += "<ul id='sale-product-package-kart"+Sale.package.kart.items[i].id+"-dropdown' class='box one'></ul>";
					html += "</li></ul></div>";
					html += "<input type='number' name='amount' class='mobile-box six input-generic center margin-top-5' placeholder='Qtd'>";
					html += "<button type='submit' name='submit' class='mobile-box six submit-generic margin-top-5 pointer'><img class='img-tbl-btn' src='images/icon/increase.png'></button>";
					html += "</form>";

					html += "<table id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-table' class='tbl-info box one center ground padding-10 margin-top-10'></table>";
				html += "</div>";
			html += "</div>";
		};
		
		document.getElementById(Sale.package.kart.name+"-div").innerHTML = html;
		
		for(let i in Sale.package.kart.items){
			Sale.package.product["kart"+Sale.package.kart.items[i].id].list(Sale.package.product["kart"+Sale.package.kart.items[i].id].name, Sale.package.product["kart"+Sale.package.kart.items[i].id].props)
		};
	} else {
		document.getElementById(Sale.package.kart.name+"-div").innerHTML = "";
		lib.localStorage.update("sale-package-product-kart-id", 1);

	};
};

//Excluir produto e remover o item do localstorage (lib.localstorage.remove)

Sale.package.kart.remove = (obj_id) => {
	var kart_backup = [];
	for(let i in Sale.package.kart.items){
		if(Sale.package.kart.items[i].id != obj_id){
			kart_backup.push(Sale.package.kart.items[i]);
		};
	};

	Sale.package.kart.items = kart_backup;

	let stringified_kart = JSON.stringify(Sale.package.kart.items);
	lib.localStorage.update(Sale.package.kart.name, stringified_kart);
	lib.localStorage.remove("sale-package-product-kart"+obj_id);
	Sale.package.kart.list(Sale.package.kart.variable, Sale.package.kart.props);
};

Sale.package.product = {};

Sale.package.kart.set = (id) => {
	Sale.package.product["kart"+id].add = document.getElementById(Sale.package.product["kart"+id].name+"-form");
	if(Sale.package.product["kart"+id].add){
		Sale.package.product["kart"+id].add.addEventListener("submit", async event => {
			event.preventDefault();

			let product = {
				id: event.target.elements.namedItem("product").dataset.id,
				product_info: event.target.elements.namedItem("product").value,
				amount: parseInt(event.target.elements.namedItem("amount").value),
			};

			if(product.id <= 0 || !product.id || isNaN(product.id)){
				return alert("É necessário selecionar um pacote.");
			};

			if(product.amount < 0.01 || !product.amount){
				return alert("É necessário preencher a quantidade de pacotes.");
			};

			Sale.package.product["kart"+id].insert("id", product);
			Sale.package.product["kart"+id].update("id");
			Sale.package.product["kart"+id].list(Sale.package.product["kart"+id].name, Sale.package.product["kart"+id].props);

			event.target.elements.namedItem("product").dataset.id = "";
			event.target.elements.namedItem("product").value = "";
			event.target.elements.namedItem("amount").value = "";
		});
	};
};

if(lib.localStorage.verify("sale-package-kart")){
	let sale_package_kart = JSON.parse(localStorage.getItem("sale-package-kart"));
	Sale.package.kart.items = sale_package_kart;
	Sale.package.kart.update("code");

	let sale_package_product_kart = "";
	for(let i in Sale.package.kart.items){
		Sale.package.product["kart"+Sale.package.kart.items[i].id] = new lib.kart("sale-package-product-kart"+Sale.package.kart.items[i].id, "Sale.package.product.kart"+Sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
		Sale.package.product["kart"+Sale.package.kart.items[i].id].id = Sale.package.kart.items[i].id;
		
		if(JSON.parse(localStorage.getItem(Sale.package.product["kart"+Sale.package.kart.items[i].id].name))){
			// console.log(JSON.parse(localStorage.getItem(Sale.package.product["kart"+Sale.package.kart.items[i].id].name)));
			let sale_package_product_kart = JSON.parse(localStorage.getItem(Sale.package.product["kart"+Sale.package.kart.items[i].id].name));
			if(sale_package_product_kart.length > 0){
				Sale.package.product["kart"+Sale.package.kart.items[i].id].items = sale_package_product_kart;
				Sale.package.product["kart"+Sale.package.kart.items[i].id].update("id");
			}
		} else {
			for(let j in Sale.package.kart.items[i].products){
				Sale.package.product["kart"+Sale.package.kart.items[i].id].insert("id", Sale.package.kart.items[i].products[j]);
			};
		};
		
	};

	Sale.package.kart.list("Sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"price":"Preço"}]);
	for(let i in Sale.package.product){ Sale.package.kart.set(Sale.package.product[i].id); };
};