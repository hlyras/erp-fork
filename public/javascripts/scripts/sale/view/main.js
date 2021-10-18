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
					html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
						html += "<div class='mobile-box em08 a3 center bold'>total:</div>";
						html += "<div class='mobile-box b2-3 center bold'>$"+(sales[i].value).toFixed(2)+"</div>";
					html += "</div>";
					html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
						html += "<div class='mobile-box em08 a3 center bold'>Frete:</div>";
						html += "<div class='mobile-box b2-3 center'>$"+sales[i].shipment_value.toFixed(2)+"</div>";
					html += "</div>";
					html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
						html += "<div class='mobile-box em08 a3 center bold'>Desconto:</div>";
						html += "<div class='mobile-box b2-3 center'>$"+sales[i].discount_value.toFixed(2)+"</div>";
					html += "</div>";
					html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
						html += "<div class='mobile-box em08 a3 center bold'>Valor:</div>";
						html += "<div class='mobile-box a2-3 center'>$"+(sales[i].value-sales[i].shipment_value).toFixed(2)+"</div>";
					html += "</div>";
				html += "</div>";
			};
		} else if(setup.status == "Confirmadas"){
			let total_value = 0;
			for(let i in sales){
				if(sales[i].status == "Ag. embalo" || sales[i].status == "Ag. nota fiscal" || sales[i].status == "Ag. envio" || sales[i].status == "Enviado"){
					total_value += (sales[i].value-sales[i].shipment_value);
				};
			};
			html += "<div class='mobile-box container a1 padding-15 border-explicit'>";
				html += "<div class='mobile-box b2 em13 center'>Faturamento Líquido:</div>";
				html += "<div class='mobile-box b2 em15 center'>$"+total_value.toFixed(2)+"</div>";
			html += "</div>";
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				if(sales[i].status == "Ag. embalo" || sales[i].status == "Ag. nota fiscal" || sales[i].status == "Ag. envio" || sales[i].status == "Enviado"){
					html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
						html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`)'><h4>"+sales[i].id+"</h4></div>";
						html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
						html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
						html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
						html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
						html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
						html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
							html += "<div class='mobile-box em08 a3 center bold'>total:</div>";
							html += "<div class='mobile-box b2-3 center bold'>$"+(sales[i].value).toFixed(2)+"</div>";
						html += "</div>";
						html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
							html += "<div class='mobile-box em08 a3 center bold'>Frete:</div>";
							html += "<div class='mobile-box b2-3 center'>$"+sales[i].shipment_value.toFixed(2)+"</div>";
						html += "</div>";
						html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
							html += "<div class='mobile-box em08 a3 center bold'>Desconto:</div>";
							html += "<div class='mobile-box b2-3 center'>$"+sales[i].discount_value.toFixed(2)+"</div>";
						html += "</div>";
						html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
							html += "<div class='mobile-box em08 a3 center bold'>Valor:</div>";
							html += "<div class='mobile-box a2-3 center'>$"+(sales[i].value-sales[i].shipment_value).toFixed(2)+"</div>";
						html += "</div>";
					html += "</div>";
				};
			};
		} else if(setup.status == "Em negociação"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`, `"+setup.status+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Sale.controller.edit("+sales[i].id+")'></div>";
					html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Sale.controller.cancel("+sales[i].id+")'></div>";
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
		} else if(setup.status == "Ag. embalo"){
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
		} else if(setup.status == "Ag. nota fiscal"){
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
		} else if(setup.status == "Ag. envio"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`, `"+setup.status+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5 pointer' onclick='lib.openExternalLink(`"+sales[i].nf+"`)'>Ver Nota Fiscal</div>";
				html += "</div>";
			};
		} else if(setup.status == "Cancelada"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`, `"+setup.status+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5 pointer' onclick='lib.openExternalLink(`"+sales[i].nf+"`)'>Ver Nota Fiscal</div>";
				html += "</div>";
			};
		} else if(setup.status == "Enviado"){
			for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`, `"+setup.status+"`)'><h4>"+sales[i].id+"</h4></div>";
					html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box b4 border center padding-5 margin-top-5 pointer' onclick='lib.openExternalLink(`"+sales[i].nf+"`)'>Ver Nota Fiscal</div>";
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
	html += "<div class='box a3 container'>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Cliente</div>";

			html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
				html += "<div class='box a1 em06 bold'>Nome completo</div>";
				html += "<div class='box a1'>"+sale.customer.name+"</div>"; 
			html += "</div>";

			if(sale.customer.cpf){ 
				html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>CPF</div>";
					html += "<div class='box a1'>"+sale.customer.cpf+"</div>"; 
				html += "</div>";
			};
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
				if(sale.customer.cnpj){ 
					html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
						html += "<div class='box a1 em06 bold'>CNPJ</div>";
						html += "<div class='box a1'>"+sale.customer.cnpj+"</div>"; 
					html += "</div>";
				};
			html += "</div>";
		};
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Contato</div>";
			if(sale.customer.email){ 
				html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>E-mail</div>";
					html += "<div class='box a1'>"+sale.customer.email.toLowerCase()+"</div>"; 
				html += "</div>";
			};
			if(sale.customer.phone){ 
				html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>Telefone</div>";
					html += "<div class='box a1'>"+sale.customer.phone+"</div>"; 
				html += "</div>";
			};
			if(sale.customer.cellphone){ 
				html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
					html += "<div class='box a1 em06 bold'>Telefone móvel</div>";
					html += "<div class='box a1'>"+sale.customer.cellphone+"</div>"; 
				html += "</div>";
			};
		html += "</div>";
	html += "</div>";

	html += "<div class='box a3 container'>";
		html += "<div class='box a1 container box-border padding-5'>";
			html += "<div class='mobile-box b1 underline center avant-garde italic bold'>Informações da venda</div>";

			html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
				html += "<div class='mobile-box b1 container'>";
					html += "<div class='box b1 em06 bold'>Vendedor</div>";
					html += "<div class='box b1'>"+sale.user_name+"</div>"; 
				html += "</div>";
			html += "</div>";

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
			html += "<div class='mobile-box a1 container border margin-top-5 padding-5'>";
				html += "<div class='mobile-box b2 container'>";
					html += "<div class='box b1 em06 bold'>Método de pagamento</div>";
					html += "<div class='box b1'>"+sale.payment_method+"</div>"; 
				html += "</div>";
				html += "<div class='mobile-box b2 container'>";
					html += "<div class='box b1 em06 bold'>Prazo de pagamento</div>";
					html += "<div class='box b1'>"+sale.payment_period+"</div>"; 
				html += "</div>";
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
						html += "<div class='box b1 em09'>"+lib.timestampToDate(sale.estimated_shipment_date)+"</div>"; 
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

	html += "<div class='box a3 container'>";
		html += "<div class='box a1 container box-border padding-10'>";
			html += "<div class='underline center avant-garde italic bold'>Medidas e peso</div>";
			html += "<div class='box a1 container'>";
				html += "<div class='mobile-box a2 padding-5'>Peso total: </div>";
				html += "<div class='mobile-box a2 padding-5 bold'>"+(sale.weight/1000).toFixed(2)+"kg</div>";
			html += "</div>";
		html += "</div>";

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

	html += "<div class='mobile-box b1 container margin-top-5 margin-bottom-5'>";
		html += "<div class='box b1 em12 bold'>Observações</div>";
		html += "<div class='box b1 em14 border padding-5 pre-wrap'>"+sale.obs+"</div>";
	html += "</div>";

	html += "<div class='box b1 container ground'>";
		html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
		html += "<div class='box b1 underline center bold'>Produtos</div>";
		for(let i in sale.products){
			html += "<div class='box b1 container ground box-hover border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box b2'>"+sale.products[i].product_info+"</div>";
				html += "<div class='mobile-box b6 center'>"+sale.products[i].amount+"un</div>";
				html += "<div class='mobile-box b6 center'>$"+sale.products[i].price+"</div>";
				html += "<div class='mobile-box b6 center'>$"+(sale.products[i].amount*sale.products[i].price).toFixed(2)+"</div>";
			html += "</div>";
		};
		html += "</div>";

		html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
		html += "<div class='box b1 underline center bold'>Pacotes</div>";
		for(let i in sale.packages){
			html += "<div class='box b1 container ground border-explicit padding-10 margin-top-5'>";
				html += "<div class='box b1 container padding-10'>";
					html += "<div class='mobile-box b8 center pointer box-hover border-explicit' onclick='lib.displayDiv(`sale-show-package-product-"+sale.packages[i].package_id+"-div`, this);'>P"+sale.packages[i].package_id+"</div>";
					html += "<div class='mobile-box b2 center'>"+sale.packages[i].info+"</div>";
					html += "<h5 class='mobile-box b3-8 center'>"+sale.packages[i].setup+"</h5>";
					html += "<div class='mobile-box b3 center margin-top-5'>"+sale.packages[i].amount+"un</div>";
					html += "<div class='mobile-box b3 center margin-top-5'>$"+sale.packages[i].price+"</div>";
					html += "<div class='mobile-box b3 center margin-top-5'>$"+(sale.packages[i].amount*sale.packages[i].price).toFixed(2)+"</div>";
				html += "</div>";
				html += "<div id='sale-show-package-product-"+sale.packages[i].package_id+"-div' class='box b1 container' style='display:none'>";
				for(let j in sale.packages[i].products){
					html += "<div class='box b1 container border box-hover padding-5 margin-top-5'>";
						html += "<div class='mobile-box b5 center'>"+sale.packages[i].products[j].amount+"un</div>";
						html += "<div class='mobile-box b4-5'>"+sale.packages[i].products[j].product_info+"</div>";
					html += "</div>";
				};
				html += "</div>";
			html += "</div>";
		};
		html += "</div>";
	html += "</div>";

	if(status == "Ag. nota fiscal"){
		html += "<input type='text' id='sale-nf-url' class='box b3-4 input-generic margin-top-10' placeholder='URL da nota fiscal'>";
		html += "<input type='button' class='box b4 submit-generic margin-top-10' onclick='Sale.controller.confirmNF(`"+sale.id+"`)' value='Anexar NF'>";
	};

    if(status == "Ag. envio"){ html += "<input type='button' id='sale-create-submit' class='box b1 height-35 input-confirm bold margin-top-15 margin-bottom-15' value='CONFIRMAR ENVIO' onclick='Sale.controller.confirmShipment("+sale.id+")'>"; };

	document.getElementById("sale-show-box").innerHTML = html;
};

Sale.view.edit = async (sale) => {
	document.getElementById("sale-customer").dataset.id = sale.customer.id;
	document.getElementById("sale-customer").dataset.person_type = sale.customer.person_type;
	if(sale.customer.person_type == "legal-entity"){
		document.getElementById("sale-customer").value = sale.customer.name+" | "+sale.customer.trademark+" | "+sale.customer.brand+" | "+sale.customer.cnpj;
	} else if(sale.customer.person_type == "natural-person"){
		document.getElementById("sale-customer").value = sale.customer.name+" | "+sale.customer.cpf;
	};
	document.getElementById("sale-customer").readOnly = true;

	let addresses = await API.response(Customer.address.findByCustomerId, sale.customer.id);
	if(!addresses){ return false };

	for(let i in addresses){ if(addresses[i].id == sale.customer_address_id){ addresses[i].checked = true; }; };
	Sale.view.customer.address.list(addresses, sale.customer_address_id);

	document.getElementById("sale-id").value = sale.id;
	
	document.getElementById("shipment-method").value = sale.shipment_method;
	document.getElementById("payment-method").value = sale.payment_method;

	if(document.getElementById("payment-method").value === "Cartão de crédito"){
		let html = "";
		html += "<option value='' disabled selected>Prazo de Pagamento</option>";
		html += "<option value='1x'>1x</option>";
		html += "<option value='2x'>2x</option>";
		html += "<option value='3x'>3x</option>";
		document.getElementById("payment-period").innerHTML = html;
	};

	document.getElementById("payment-period").value = sale.payment_period;
	document.getElementById("status").value = sale.status;
	document.getElementById("sale-obs").value = sale.obs;
	
	Sale.product.kart.total_value = sale.product_value;
	Sale.package.kart.total_value = sale.package_value;
	Sale.pos.shipment_value = sale.shipment_value;
	document.getElementById("sale-shipment-value").value = sale.shipment_value.toFixed(2);
	Sale.pos.discount_value = sale.discount_value;
	document.getElementById("sale-discount-value").value = sale.discount_value.toFixed(2);
	
	Sale.pos.updateValue();
	Sale.pos.updateWeight();

	for(let i in sale.products){
		sale.products[i].code = sale.products[i].product_info.split(" | ")[0];
		sale.products[i].name = sale.products[i].product_info.split(" | ")[1];
		sale.products[i].color = sale.products[i].product_info.split(" | ")[2];
		sale.products[i].size = sale.products[i].product_info.split(" | ")[3];
		sale.products[i].total_price = sale.products[i].amount * sale.products[i].price;
	};

	Sale.product.kart.items = sale.products;
	Sale.product.kart.list("Sale.product.kart", Sale.product.kart.props);

	for(let i in sale.packages){
		sale.packages[i].id = sale.packages[i].package_id;
		sale.packages[i].code = sale.packages[i].info.split(" | ")[0];
		sale.packages[i].name = sale.packages[i].info.split(" | ")[1];
		sale.packages[i].color = sale.packages[i].info.split(" | ")[2];
		sale.packages[i].total_price = sale.packages[i].amount * sale.packages[i].price;
	};

	Sale.package.kart.items = sale.packages;

	for(let i in sale.packages){
		Sale.package.product["kart"+sale.packages[i].id] = new lib.kart("sale-package-product-kart"+sale.packages[i].id, "Sale.package.product.kart"+sale.packages[i].id, [{"product_info":"Descrição"}]);
		Sale.package.product["kart"+sale.packages[i].id].id = sale.packages[i].id;

		for(let j in sale.packages[i].products){
			sale.packages[i].products[j].product_code = sale.packages[i].products[j].product_info.split(" | ")[0];		
			Sale.package.product["kart"+sale.packages[i].id].insert("id", sale.packages[i].products[j]);
		};
		Sale.package.product["kart"+sale.packages[i].id].update("product_code");
	};

	Sale.package.kart.list("Sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"}]);
	for(let i in Sale.package.product){ Sale.package.kart.set(Sale.package.product[i].id); };
};