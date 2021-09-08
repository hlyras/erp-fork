Sale.view = {};

Sale.view.filter = (sales, setup) => {
	let html = "";
	if(sales.length){
		sales = lib.sort(sales, "estimated_shipment_date");
		if(setup.status == "Ag. embalo"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`, `"+setup.status+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box container b2 border center padding-5 margin-top-5'>";
						html += "<div class='mobile-box b2 em08 bold'>Data p/ envio:</div>";
						if(sales[i].estimated_shipment_date < lib.genTimestamp()){
							html += "<div class='mobile-box b2 bold' style='color:red'>"+lib.timestampToDate(sales[i].estimated_shipment_date)+"</div>";
						} else {
							html += "<div class='mobile-box b2 bold'>"+lib.timestampToDate(sales[i].estimated_shipment_date)+"</div>";
						};
					html += "</div>";
				html += "</div>";
			};
		};
	} else {
		html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
			html += "<div class='mobile-box b1 center padding-5 border margin-top-5'>Sem resultados</div>";
		html += "</div>";
	};
	document.getElementById("sale-filter-div").innerHTML = html;
};

Sale.view.show = (sale, status) => {
	let html = "";
	html += "<div class='box a1 underline center avant-garde margin-top-10 bold'>Dados da venda #"+sale.id+"</div>";
	html += "<div class='box a2 container'>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Cliente</div>";

			html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Nome completo</div>";
				html += "<div class='box a1'>"+sale.customer.name+"</div>"; 
			html += "</div>";
		html += "</div>";

		if(sale.customer.person_type=="legal-entity"){
			html += "<div class='box a1 container box-border padding-10'>";
				html += "<div class='underline center avant-garde italic bold'>Empresa</div>";
				if(sale.customer.trademark){ 
					html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
						html += "<div class='box a1 em06 bold'>Razão Social</div>";
						html += "<div class='box a1'>"+sale.customer.trademark+"</div>"; 
					html += "</div>";
				};
				if(sale.customer.brand){ 
					html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
						html += "<div class='box a1 em06 bold'>Marca</div>";
						html += "<div class='box a1'>"+sale.customer.brand+"</div>"; 
					html += "</div>";
				};
			html += "</div>";
		};
	html += "</div>";

	html += "<div class='box a2 container'>";
		html += "<div class='box a1 container box-border padding-5'>";
			html += "<div class='mobile-box b1 underline center avant-garde italic bold'>Informações da venda</div>";

			html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
				html += "<div class='mobile-box b3-8 container'>";
					html += "<div class='box b1 em06 bold'>Data da venda</div>";
					html += "<div class='box b1'>"+lib.timestampToDate(sale.sale_date)+"</div>";
				html += "</div>";
				html += "<div class='mobile-box b2 container'>";
					html += "<div class='box b1 em06 bold'>Status</div>";
					html += "<div class='box b1'>"+sale.status+"</div>"; 
				html += "</div>";
				if(sale.nf){
					html += "<div class='mobile-box b8 margin-top-5 center'><img class='icon size-35' src='/images/icon/nf-e.png' onclick='lib.openExternalLink(`"+sale.nf+"`)'></div>";
				};
			html += "</div>";
		html += "</div>";


		html += "<div class='box a1 container box-border padding-5'>";
			html += "<div class='underline center avant-garde italic bold'>Logística de envio</div>";
			if(sale.estimated_shipment_date){ 
				html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Método de envio</div>";
						html += "<div class='box b1'>"+sale.shipment_method+"</div>";
					html += "</div>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Prazo de embalo</div>";
						if(sale.estimated_shipment_date < lib.genTimestamp()){
							html += "<div class='box b1 em09 bold' style='color:red'>"+lib.timestampToDate(sale.estimated_shipment_date)+"</div>"; 
						} else {
							html += "<div class='box b1 em09 bold'>"+lib.timestampToDate(sale.estimated_shipment_date)+"</div>"; 
						};
					html += "</div>";
				html += "</div>";
			};

			if(sale.payment_confirmation_date){ 
				html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Confirmação do pagamento</div>";
						html += "<div class='box b1 em09'>"+lib.timestampToFulldate(sale.payment_confirmation_date)+"</div>"; 
					html += "</div>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Confirmado por</div>";
						html += "<div class='box b1'>"+sale.payment_user_name+"</div>"; 
					html += "</div>";
				html += "</div>";
			};

			if(sale.packment_confirmation_date){ 
				html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Data de embalo</div>";
						html += "<div class='box b1 em09'>"+lib.timestampToFulldate(sale.packment_confirmation_date)+"</div>"; 
					html += "</div>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Embalado por</div>";
						html += "<div class='box b1'>"+sale.packment_user_name+"</div>"; 
					html += "</div>";
				html += "</div>";
			};

			if(sale.shipment_confirmation_date){ 
				html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Data de envio</div>";
						html += "<div class='box b1 em09'>"+lib.timestampToFulldate(sale.shipment_confirmation_date)+"</div>"; 
					html += "</div>";
					html += "<div class='mobile-box b2 container'>";
						html += "<div class='box b1 em06 bold'>Enviado por</div>";
						html += "<div class='box b1'>"+sale.shipment_user_name+"</div>"; 
					html += "</div>";
				html += "</div>";
			};
		html += "</div>";
	html += "</div>";

	html += "<div class='box b1 container ground'>";
		html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
		html += "<div class='box b1 underline center bold'>Produtos</div>";
		for(let i in sale.products){
			html += "<div class='box b1 container ground box-hover border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box b2'>"+sale.products[i].product_info+"</div>";
				html += "<div class='mobile-box b6 em12 center bold' style='color:red'>"+sale.products[i].amount+"un</div>";
			html += "</div>";
		};
		html += "</div>";

		// IMPLEMENTAR VALOR DO FRETE, DESCONTO E TOTAL

		html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
		html += "<div class='box b1 underline center bold'>Pacotes</div>";
		for(let i in sale.packages){
			html += "<div class='box b1 container ground border-explicit padding-10 margin-top-5'>";
				html += "<div class='box b1 container padding-10'>";
					html += "<div class='mobile-box b8 center pointer box-hover border-explicit' onclick='lib.displayDiv(`sale-show-package-product-"+sale.packages[i].package_id+"-div`, this);'>P"+sale.packages[i].package_id+"</div>";
					html += "<div class='mobile-box b2 center'>"+sale.packages[i].info+"</div>";
					html += "<div class='mobile-box b3 em12 center margin-top-5 bold' style='color:red'>"+sale.packages[i].amount+"un</div>";
					html += "<h5 class='mobile-box b3-8 center'>"+sale.packages[i].setup+"</h5>";
				html += "</div>";
				html += "<div id='sale-show-package-product-"+sale.packages[i].package_id+"-div' class='box b1 container' style='display:none'>";
				for(let j in sale.packages[i].products){
					html += "<div class='box b1 container border box-hover padding-5 margin-top-5'>";
						html += "<div class='mobile-box em12 bold b5 center'>"+sale.packages[i].products[j].amount+"un</div>";
						html += "<div class='mobile-box b4-5'>"+sale.packages[i].products[j].product_info+"</div>";
					html += "</div>";
				};
				html += "</div>";
			html += "</div>";
		};
		html += "</div>";
	html += "</div>";

    if(status == "Ag. embalo"){ html += "<div class='box b1 container h-center'><input type='button' class='box b3 submit-generic bold margin-top-15 margin-bottom-15' value='CONFIRMAR EMBALO' onclick='Sale.controller.confirmPackment("+sale.id+")'></div>"; };
    if(status == "Ag. envio"){ html += "<div class='box b1 container h-center'><input type='button'class='box b3 submit-generic bold margin-top-15 margin-bottom-15' value='CONFIRMAR ENVIO' onclick='Sale.controller.confirmShipment("+sale.id+")'></div>"; };

	document.getElementById("sale-show-box").innerHTML = html;
};