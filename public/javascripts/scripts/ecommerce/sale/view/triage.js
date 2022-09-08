Ecommerce.sale.view.triage = {};

Ecommerce.sale.view.triage.filter = (sales) => {
	let filter_box = document.getElementById("ecommerce-sale-filter-box");
	filter_box.innerHTML = "";

	if(!sales.length) {
		return filter_box.append(lib.element.create("div", { 
			class: "box b1 lucida-grande bold border radius-5 padding-10 margin-top-10 center" 
		}, "Sem resultados"));
	}

	let salesOnDeadline = sales.filter(sale => sale.datetime < (lib.genTimestamp() - (lib.timestampDay() * 0.5)));

	filter_box.append(lib.element.create("div", { 
		class: "box b1 ground lucida-grande bold border radius-5 padding-10 margin-top-10 center" 
	}, `Quantidade de pedidos: ${sales.length}`));
	
	salesOnDeadline.length && filter_box.append(lib.element.create("div", {
		class: "box b1 ground lucida-grande bold border radius-5 padding-10 margin-top-5 center",
			style: salesOnDeadline.length && "color: red"
	}, `Atrasados: ${salesOnDeadline.length}`));
	
	for(let i in sales){
		let sale_div = lib.element.create("div", { class: "box b2 container ground border-lg-st radius-5 padding-5 margin-top-5" });

		let sale_deadline = sales[i].datetime < (lib.genTimestamp() - lib.timestampDay() * 0.5);
		
		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b2 bold em09 input-show border-lg-st padding-5 center pointer",
			onclick: sales[i].status == "Ag. Embalo" && `Ecommerce.sale.controller.triage.show(${sales[i].id})`
		}, sales[i].code));
		
		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b2 bold padding-5 center",
			style: sale_deadline && "color: red"
		}, lib.timestampToFulldate(sales[i].datetime)));
		sale_div.append(lib.element.createInfo("mobile-box b1 em09 padding-5", "Nome do cliente", `${sales[i].customer_name}` ));
		sale_div.append(lib.element.createInfo("mobile-box b2 em09 padding-5", "Usuário do cliente", `${sales[i].customer_user}` ));
		sale_div.append(lib.element.createInfo("mobile-box b2 em09 padding-5", "Rastreio", `${sales[i].tracker}` ));
		sale_div.append(lib.element.createInfo("mobile-box b3 em09 padding-5", "Status", `${sales[i].status}` ));
		sale_div.append(lib.element.createInfo("mobile-box b3 em09 padding-5", "Plataforma", `${sales[i].origin}` ));
		sale_div.append(lib.element.createInfo("mobile-box b3 em09 padding-5", "Coletor", `${sales[i].user_name}` ));
		filter_box.append(sale_div);
	};
};

Ecommerce.sale.view.triage.show = (sale) => {
	let html = "";
	html += "<div class='box b1 container ground'>";
		html += "<div class='box container b3 border-explicit padding-10 margin-top-5'>";
			html += "<div class='box b1 underline center bold'>Dados do cliente</div>";
			if(sale.customer_name){ 
				html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>Nome</div>";
					html += "<div class='box a1'>"+sale.customer_name+"</div>"; 
				html += "</div>";
			};
		html += "</div>";

		html += "<div class='box container b3 border-explicit padding-10 margin-top-5'>";
			html += "<div class='box b1 underline center bold'>Dados da venda</div>";
			html += "<div class='mobile-box b4 border container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Origem</div>";
				html += "<div class='box a1'>"+sale.origin+"</div>"; 
			html += "</div>";
			html += "<div class='mobile-box b3-4 border container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Código</div>";
				html += "<div class='box a1'>"+sale.code+"</div>"; 
			html += "</div>";
			html += "<div class='mobile-box b3 border container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Data da venda</div>";
				html += "<div class='box a1 em09'>"+lib.timestampToFulldate(sale.datetime)+"</div>"; 
			html += "</div>";
			html += "<div class='mobile-box b3 border container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Rastreio</div>";
				html += "<div class='box a1 em09'>"+sale.tracker+"</div>"; 
			html += "</div>";
			html += "<div class='mobile-box b3 border container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Status</div>";
				html += "<div class='box a1 em09'>"+sale.status+"</div>"; 
			html += "</div>";
		html += "</div>";
		html += "<div class='box container b3 border-explicit padding-10 margin-top-5'>";
			html += "<div class='box b1 underline center bold'>Dados operacionais</div>";
			html += "<div class='mobile-box a1 container border margin-top-5'>";
				html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>Data da coleta</div>";
					html += "<div class='box a1 em09'>"+lib.timestampToFulldate(sale.date)+"</div>"; 
				html += "</div>";
				html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>Coletor</div>";
					html += "<div class='box a1 em09'>"+sale.user_name+"</div>"; 
				html += "</div>";
			html += "</div>";
			if(sale.packing_datetime){
				html += "<div class='mobile-box a1 container border margin-top-5'>";
					html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
						html += "<div class='box a1 em06 bold'>Data do embalo</div>";
						html += "<div class='box a1 em09'>"+lib.timestampToFulldate(sale.packing_datetime)+"</div>"; 
					html += "</div>";
					html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
						html += "<div class='box a1 em06 bold'>Embalador</div>";
						html += "<div class='box a1 em09'>"+sale.packing_user_name+"</div>"; 
					html += "</div>";
				html += "</div>";
			}
		html += "</div>";
	html += "</div>";

	if(sale.obs){
		html += "<div class='mobile-box b1 border-explicit container margin-top-5 padding-5'>";
			html += "<div class='box a1 em06 bold'>Mensagem de observação</div>";
			html += "<div class='box a1 bold'>"+sale.obs+"</div>"; 
		html += "</div>";
	}

	html += "<div class='box b1 container ground'>";
		html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
		html += "<div class='box b1 underline center bold'>Produtos</div>";
		for(let i in sale.products){
			html += "<div class='box b1 b1 container ground box-hover border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box b3-4'>"+sale.products[i].info+"</div>";
				if(sale.products[i].amount > 1){
					html += "<div class='mobile-box b4 em14 center bold' style='color:red'>"+sale.products[i].amount+"un</div>";
				} else {
					html += "<div class='mobile-box b4 em12 center bold'>"+sale.products[i].amount+"un</div>";
				};
			html += "</div>";
		};
		html += "</div>";

		html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
		html += "<div class='box b1 underline center bold'>Pacotes</div>";
		for(let i in sale.packages){
			html += "<div class='box b1 b1 container ground border-explicit padding-10 margin-top-5'>";
				html += "<div class='box b1 container padding-10'>";
					html += "<div class='mobile-box b8 center pointer box-hover border-explicit' onclick='lib.displayDiv(`ecommerce-sale-show-package-product-"+sale.packages[i].package_id+"-div`, this);'>P"+sale.packages[i].package_id+"</div>";
					html += "<div class='mobile-box b2 center'>"+sale.packages[i].info+"</div>";
					html += "<h5 class='mobile-box b4 center border-explicit'>"+sale.packages[i].setup+"</h5>";
					if(sale.packages[i].amount > 1){
						html += "<div class='mobile-box b8 em14 center bold' style='color:red'>"+sale.packages[i].amount+"un</div>";
					} else {
						html += "<div class='mobile-box b8 em12 center bold'>"+sale.packages[i].amount+"un</div>";
					}
				html += "</div>";
				html += "<div id='ecommerce-sale-show-package-product-"+sale.packages[i].package_id+"-div' class='box b1 container' style='display:none'>";
				for(let j in sale.packages[i].products){
					html += "<div class='box b1 container border box-hover padding-5 margin-top-5'>";
						if(sale.packages[i].products[j].amount > 1){
							html += "<div class='mobile-box b5 center bold' style='color:red'>"+sale.packages[i].products[j].amount+"un</div>";
						} else {
							html += "<div class='mobile-box b5 center bold'>"+sale.packages[i].products[j].amount+"un</div>";
						};
						html += "<div class='mobile-box b4-5'>"+sale.packages[i].products[j].product_info+"</div>";
					html += "</div>";
				};
				html += "</div>";
			html += "</div>";
		};
		html += "</div>";
		if(sale.status == "Ag. Embalo"){
			html += "<div class='box b1 container h-center'><input type='button' class='box b3 submit-generic margin-top-10 margin-bottom-10 center' onclick='Ecommerce.sale.controller.update("+sale.id+", `Ag. Coleta`);' value='Confirmar Embalo'></div>";
		};
	html += "</div>";

	document.getElementById("ecommerce-sale-filter-box").style.display = "none";
	document.getElementById("ecommerce-sale-show-box").style.display = "";
	document.getElementById("ecommerce-sale-show-box").innerHTML = html;
};