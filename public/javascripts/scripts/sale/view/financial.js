Sale.view = {};

Sale.view.filter = (sales, setup) => {
	let html = "";
	if(sales.length){
		if(!setup.status){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
				html += "</div>";
			};
		} else if(setup.status == "Em negociação"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Sale.controller.edit("+sales[i].id+")'></div>";
					html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Sale.controller.delete("+sales[i].id+")'></div>";
				html += "</div>";
			};
		} else if(setup.status == "Ag. pagamento"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`, `"+setup.status+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
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
	console.log(status)
	let html = "";
	html += "<div class='box a1 underline center avant-garde margin-top-10 bold'>Dados da venda #"+sale.id+"</div>";
	html += "<div class='box b3 container'>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Cliente</div>";
			html += "<div class='box a1 padding-5'>Nome: "+sale.customer.name+"</div>";
			if(sale.customer.cpf){ html += "<div class='box a1 padding-5'>CPF: "+sale.customer.cpf+"</div>"; };
		html += "</div>";
		if(sale.customer.person_type=="legal-entity"){
			html += "<div class='box a1 container box-border padding-10'>";
				html += "<div class='underline center avant-garde italic bold'>Empresa</div>";
				html += "<div class='box a1 padding-5'>Razão Social: "+sale.customer.trademark+"</div>";
				html += "<div class='box a1 padding-5'>Marca: "+sale.customer.brand+"</div>";
				if(sale.customer.cnpj){ html += "<div class='box a1 padding-5'>CNPJ: "+sale.customer.cnpj+"</div>"; };
			html += "</div>";
		};
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Contato</div>";
			if(sale.customer.email){ html += "<div class='box a1 padding-5'>E-mail: "+sale.customer.email+"</div>"; };
			if(sale.customer.phone){ html += "<div class='box a1 padding-5'>Tel: "+sale.customer.phone+"</div>"; };
			if(sale.customer.cellphone){ html += "<div class='box a1 padding-5'>Cel: "+sale.customer.cellphone+"</div>"; };
		html += "</div>";
	html += "</div>";

	html += "<div class='box b3 container'>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Informações da venda</div>";
			html += "<div class='box a1 padding-5'>Data: "+lib.timestampToFulldate(sale.sale_date)+"</div>";
			html += "<div class='box a1 padding-5'>Metódo: "+sale.payment_method+"</div>";
			if(sale.payment_period == 1){ html += "<div class='box a1 padding-5'>Prazo: à vista</div>"; };
			if(sale.payment_period != 1){ html += "<div class='box a1 padding-5'>Prazo: "+sale.payment_period+" dias</div>"; };
			html += "<div class='box a1 padding-5'>Status: "+sale.status+"</div>";
			html += "<div class='box a1 padding-5'>Vendedor: "+sale.user_name+"</div>";
		html += "</div>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Logística de envio</div>";
			html += "<div class='box a1 padding-5'>Método: "+sale.shipment_method+"</div>";
			if(sale.estimated_shipment_date){ html += "<div class='box a1 padding-5'>Data estimada: "+lib.timestampToDate(sale.estimated_shipment_date)+"</div>"; };
			if(sale.shipment_date){ html += "<div class='box a1 padding-5'>Data: "+lib.timestampToDate(sale.shipment_date)+"</div>"; };
		html += "</div>";
	html += "</div>";

	html += "<div class='box b3 container'>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Financeiro</div>";
			html += "<div class='box a1 container'>";
				html += "<div class='mobile-box a2 padding-5'>Produtos: </div>";
				html += "<div class='mobile-box a2 padding-5'>$"+sale.product_value.toFixed(2)+"</div>";
			html += "</div>";
			html += "<div class='box a1 container'>";
				html += "<div class='mobile-box a2 padding-5'>Pacotes: </div>";
				html += "<div class='mobile-box a2 padding-5'>$"+sale.package_value.toFixed(2)+"</div>";
			html += "</div>";
			html += "<div class='box a1 container'>";
				html += "<div class='mobile-box a2 padding-5'>Frete: </div>";
				html += "<div class='mobile-box a2 padding-5'>$"+sale.shipment_value.toFixed(2)+"</div>";
			html += "</div>";
			html += "<div class='box a1 container'>";
				html += "<div class='mobile-box a2 padding-5'>Desconto: </div>";
				html += "<div class='mobile-box a2 underline padding-5'>$"+sale.discount_value.toFixed(2)+"</div>";
			html += "</div>";
			html += "<div class='box a1 container'>";
				html += "<div class='mobile-box a2 padding-5'>Total: </div>";
				html += "<div class='mobile-box a2 padding-5 bold'>$"+sale.value.toFixed(2)+"</div>";
			html += "</div>";
		html += "</div>";
	html += "</div>";

	html += "<div class='box one container ground'>";
		html += "<div class='box two container ground border padding-5 margin-top-5'>";
		html += "<div class='box one underline center bold'>Produtos</div>";
		for(let i in sale.products){
			html += "<div class='box one one container ground box-hover border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box b2'>"+sale.products[i].product_info+"</div>";
				html += "<div class='mobile-box b6 center'>"+sale.products[i].amount+"un</div>";
				html += "<div class='mobile-box b6 center'>$"+sale.products[i].price+"</div>";
				html += "<div class='mobile-box b6 center'>$"+(sale.products[i].amount*sale.products[i].price).toFixed(2)+"</div>";
			html += "</div>";
		};
		html += "</div>";

		// IMPLEMENTAR VALOR DO FRETE, DESCONTO E TOTAL

		html += "<div class='box two container ground border padding-5 margin-top-5'>";
		html += "<div class='box one underline center bold'>Pacotes</div>";
		for(let i in sale.packages){
			html += "<div class='box one one container ground border-explicit padding-10 margin-top-5'>";
				html += "<div class='box one container padding-10'>";
					html += "<div class='mobile-box b8 center pointer box-hover border-explicit' onclick='lib.displayDiv(`sale-show-package-product-"+sale.packages[i].package_id+"-div`, this);'>P"+sale.packages[i].package_id+"</div>";
					html += "<div class='mobile-box b2 center'>"+sale.packages[i].info+"</div>";
					html += "<h5 class='mobile-box b3-8 center'>"+sale.packages[i].setup+"</h5>";
					html += "<div class='mobile-box b3 center margin-top-5'>"+sale.packages[i].amount+"un</div>";
					html += "<div class='mobile-box b3 center margin-top-5'>$"+sale.packages[i].price+"</div>";
					html += "<div class='mobile-box b3 center margin-top-5'>$"+(sale.packages[i].amount*sale.packages[i].price).toFixed(2)+"</div>";
				html += "</div>";
				html += "<div id='sale-show-package-product-"+sale.packages[i].package_id+"-div' class='box one container' style='display:none'>";
				for(let j in sale.packages[i].products){
					html += "<div class='box one container border box-hover padding-5 margin-top-5'>";
						html += "<div class='mobile-box b5 center'>"+sale.packages[i].products[j].amount+"un</div>";
						html += "<div class='mobile-box b4-5'>"+sale.packages[i].products[j].product_info+"</div>";
					html += "</div>";
				};
				html += "</div>";
			html += "</div>";
		};
		html += "</div>";
	html += "</div>";

    if(status == "Ag. pagamento"){ html += "<input type='button' id='sale-create-submit' class='box b1 height-35 input-confirm bold margin-top-15 margin-bottom-15' value='CONFIRMAR PAGAMENTO' onclick='Sale.controller.confirmPayment("+sale.id+")'>"; };

	document.getElementById("sale-show-box").innerHTML = html;
};