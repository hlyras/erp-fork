Ecommerce.sale.view.triage = {};

Ecommerce.sale.view.triage.filter = (sales, pagination) => {
	let html = "";
	if(sales.length){
		html += "</div>";
		for(let i in sales){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.triage.show(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
				html += "<div class='mobile-box b6 border padding-5 center margin-top-5'>"+sales[i].origin+"</div>";
				html += "<div class='mobile-box b2 border padding-5 center margin-top-5'>"+sales[i].customer_name+"</div>";
				html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_user+"</div>";
				html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
				html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].user_name+"</div>";
				html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].status+"</div>";
				html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].tracker+"</div>";
				html += "</div>";
			html += "</div>";
		};
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	} else {
		html += "<div class='box one center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhuma venda encontrada</div>";
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	};
};

Ecommerce.sale.view.triage.show = (sale) => {
	let html = "";
	html += "<div class='box a1 container ground'>";
		html += "<div class='box container three border-explicit padding-10 margin-top-5'>";
			html += "<div class='box one underline center bold'>Dados do cliente</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Nome</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center bold'>"+sale.customer_name+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Usuário</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center bold'>"+sale.customer_user+"</div>";
		html += "</div>";
		html += "<div class='box container three border-explicit padding-10 margin-top-5'>";
			html += "<div class='box one underline center bold'>Dados da venda</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Origem da venda</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center bold'>"+sale.origin+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Código da venda</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.code+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Data</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+lib.timestampToFulldate(sale.datetime)+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Status</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.status+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Rastreio</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.tracker+"</div>";
		html += "</div>";
		html += "<div class='box container b3 margin-top-5'>";
			if(sale.date){
				html += "<div class='box a1 border-explicit padding-5'>";
				html += "<div class='box a1 em08 bold underline center'>Coleta</div>";
				html += "<div class='box b1 margin-top-5 center'>"+sale.user_name+"</div>";
				html += "<div class='box b1 margin-top-5 center'>"+lib.timestampToFulldate(sale.date)+"</div>";
				html += "</div>"
			};
			if(sale.packing_datetime){
				html += "<div class='box a1 border-explicit padding-5'>";
				html += "<div class='box a1 em08 bold underline center'>Embalo</div>";
				html += "<div class='box b1 margin-top-5 center'>"+sale.packing_user_name+"</div>";
				html += "<div class='box b1 margin-top-5 center'>"+sale.packing_datetime+"</div>";
				html += "</div>"
			};
		html += "</div>";
	html += "</div>";

	if(sale.obs){ html += "<div class='box b1 em15 border-explicit margin-top-5 margin-bottom-5 padding-10 center'>"+sale.obs+"</div>"; };

	html += "<div class='box one container ground'>";
		html += "<div class='box two container ground border padding-5 margin-top-5'>";
		html += "<div class='box one underline center bold'>Produtos</div>";
		for(let i in sale.products){
			html += "<div class='box one one container ground box-hover border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box three-fourths'>"+sale.products[i].info+"</div>";
				html += "<div class='mobile-box four center bold'>"+sale.products[i].amount+"un</div>";
			html += "</div>";
		};
		html += "</div>";

		html += "<div class='box two container ground border padding-5 margin-top-5'>";
		html += "<div class='box one underline center bold'>Pacotes</div>";
		for(let i in sale.packages){
			html += "<div class='box one one container ground border-explicit padding-10 margin-top-5'>";
				html += "<div class='box one container padding-10'>";
					html += "<div class='mobile-box eight center pointer box-hover border-explicit' onclick='lib.displayDiv(`ecommerce-sale-show-package-product-"+sale.packages[i].package_id+"-div`, this);'>P"+sale.packages[i].package_id+"</div>";
					html += "<div class='mobile-box two center'>"+sale.packages[i].info+"</div>";
					html += "<h5 class='mobile-box four center border-explicit'>"+sale.packages[i].setup+"</h5>";
					html += "<div class='mobile-box eight center bold'>"+sale.packages[i].amount+"un</div>";
				html += "</div>";
				html += "<div id='ecommerce-sale-show-package-product-"+sale.packages[i].package_id+"-div' class='box one container' style='display:none'>";
				for(let j in sale.packages[i].products){
					html += "<div class='box one container border box-hover padding-5 margin-top-5'>";
						html += "<div class='mobile-box five center'>"+sale.packages[i].products[j].amount+"un</div>";
						html += "<div class='mobile-box four-fifths'>"+sale.packages[i].products[j].product_info+"</div>";
					html += "</div>";
				};
				html += "</div>";
			html += "</div>";
		};
		html += "</div>";
		if(sale.status == "Ag. Embalo"){
			html += "<input type='button' class='box one input-confirm height-40 center padding-10 margin-top-10 margin-bottom-10' onclick='Ecommerce.sale.controller.update("+sale.id+", `Ag. Coleta`);' value='Confirmar Embalo'>";
		};
	html += "</div>";

	document.getElementById("ecommerce-sale-filter-box").style.display = "none";
	document.getElementById("ecommerce-sale-show-box").style.display = "";
	document.getElementById("ecommerce-sale-show-box").innerHTML = html;
};