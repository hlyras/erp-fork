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
Sale.package.product = {};

Sale.package.kart.list = (kart, props) => {
	if(Sale.package.kart.items.length){
		let html = "";
		for(i in Sale.package.kart.items){
			html += "<div class='box one container border center padding-5 margin-top-5'>";
				html += "<div id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-hider' class='mobile-box nine center pointer box-hover border-explicit' onclick='lib.displayDiv(`sale-package-product-kart"+Sale.package.kart.items[i].id+"-table`, this);'>"+Sale.package.kart.items[i].code+"</div>";
				html += "<div class='mobile-box three center'>"+Sale.package.kart.items[i].name+"</div>";
				html += "<div class='mobile-box nine center'>"+Sale.package.kart.items[i].color+"</div>";
				html += "<div class='mobile-box twelve center'>"+Sale.package.kart.items[i].price+"</div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-15' src='/images/icon/decrease.png' onclick='"+kart+".decrease("+Sale.package.kart.items[i].id+")'></div>";
				html += "<input class='mobile-box nine border-explicit center' type='text' id='sale-package-kart"+Sale.package.kart.items[i].id+"' onchange='"+kart+".updateAmount("+Sale.package.kart.items[i].id+", this.value);lib.focus(this)' value='"+Sale.package.kart.items[i].amount+"'>";
				html += "<div class='mobile-box twelve center'><img class='icon size-15' src='/images/icon/increase.png' onclick='"+kart+".increase("+Sale.package.kart.items[i].id+")'></div>";
				html += "<div class='mobile-box twelve center'><img class='icon size-20' src='/images/icon/trash.png' onclick='"+kart+".remove("+Sale.package.kart.items[i].id+")'></div>";

				html += "<table id='sale-package-product-kart"+Sale.package.kart.items[i].id+"-table' class='tbl-info box one center ground padding-10 margin-top-10' style='display:none'></table>";
			html += "</div>";
		};
		document.getElementById(Sale.package.kart.name+"-div").innerHTML = html;
		
	} else {
		document.getElementById(Sale.package.kart.name+"-div").innerHTML = "";
	};
};

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

		Sale.package.kart.insert("id", package);
		Sale.package.kart.update("code");
		Sale.package.kart.list("Sale.package.kart", Sale.package.kart.props);

		for(i in Sale.package.kart.items){
			Sale.package.product["kart"+Sale.package.kart.items[i].id] = new lib.kart("sale-package-product-kart"+Sale.package.kart.items[i].id, "Sale.package.product"+Sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
			
			for(j in Sale.package.kart.items[i].products){
				Sale.package.product["kart"+Sale.package.kart.items[i].id].items.push(Sale.package.kart.items[i].products[j]);
			};
			
			Sale.package.product["kart"+Sale.package.kart.items[i].id].update("id");
			Sale.package.product["kart"+Sale.package.kart.items[i].id].list("Sale.package.product.kart"+Sale.package.kart.items[i].id, Sale.package.product["kart"+Sale.package.kart.items[i].id].props);
		};

		document.getElementById("sale-package-kart-form").elements.namedItem('package').value = "";
		document.getElementById("sale-package-kart-form").elements.namedItem('package').dataset.id = "";
		document.getElementById("sale-package-kart-form").elements.namedItem('amount').value = "";
	});
};

if(lib.localStorage.verify("sale-package-kart")){
	let kart = JSON.parse(localStorage.getItem("sale-package-kart"));
	Sale.package.kart.items = kart;
	Sale.package.kart.list("Sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"price":"Preço"}]);

	if(lib.localStorage.verify("sale-package-product-kart")){

	};

	for(i in Sale.package.kart.items){
		Sale.package.product["kart"+Sale.package.kart.items[i].id] = new lib.kart("sale-package-product-kart"+Sale.package.kart.items[i].id, "Sale.package.product.kart"+Sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
		
		for(j in Sale.package.kart.items[i].products){
			Sale.package.product["kart"+Sale.package.kart.items[i].id].items.push(Sale.package.kart.items[i].products[j]);
		};
		
		Sale.package.product["kart"+Sale.package.kart.items[i].id].update("id");
		Sale.package.product["kart"+Sale.package.kart.items[i].id].list("Sale.package.product.kart"+Sale.package.kart.items[i].id, Sale.package.product["kart"+Sale.package.kart.items[i].id].props);
	};
};