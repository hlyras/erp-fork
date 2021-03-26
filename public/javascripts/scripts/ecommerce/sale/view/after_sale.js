Ecommerce.sale.after_sale.view = {};

Ecommerce.sale.after_sale.view.filter = (sales, pagination) => {
	let html = "";
	if(sales.length){
		html += "</div>";
		for(let i in sales){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box three center padding-5 border box-hover margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.edit(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
				html += "<div class='mobile-box three center padding-5 border margin-top-5'>"+sales[i].customer_name+"</div>";
				html += "<div class='mobile-box b3 center padding-5 border margin-top-5'>"+sales[i].customer_phone+"</div>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5'>"+sales[i].customer_user+"</div>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5'>"+sales[i].origin+"</div>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5'>"+sales[i].status+"</div>";
				html += "<button class='mobile-box b4 center submit-generic margin-top-5' onclick='Ecommerce.sale.after_sale.controller.addToFlow("+sales[i].id+")'>Selecionar cliente</button>";
			html += "</div>";
		};
		document.getElementById("ecommerce-sale-after-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-after-sale-filter-box").innerHTML = html;
	} else {
		html += "<div class='box one center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhum cliente encontrado</div>";
		document.getElementById("ecommerce-sale-after-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-after-sale-filter-box").innerHTML = html;
	};
};

Ecommerce.sale.after_sale.flow.view = {};

Ecommerce.sale.after_sale.flow.view.filter = (sales, pagination) => {
	let html = "";
	if(sales.length){
		html += "</div>";
		for(let i in sales){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box three center padding-5 border margin-top-5 nowrap'>"+sales[i].code+"</div>";
				html += "<div class='mobile-box three center padding-5 border margin-top-5'>"+sales[i].customer_name+"</div>";
				html += "<div class='mobile-box three center padding-5 border margin-top-5'>"+lib.convertDate(sales[i].date)+"</div>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5'>"+sales[i].customer_user+"</div>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5'>"+sales[i].origin+"</div>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5'>"+sales[i].customer_phone+"</div>";
				html += "<select id='ecommerce-sale-after-sale-flow-status-"+sales[i].id+"' class='mobile-box b4 avant-garde submit-generic margin-top-5 hide-disabled'>";
					html += "<option value='' selected disabled>Experiência do cliente</option>";
					html += "<option value='Excelente'>Excelente</option>";
					html += "<option value='Boa'>Boa</option>";
					html += "<option value='Normal'>Normal</option>";
					html += "<option value='Ruim'>Ruim</option>";
					html += "<option value='Péssima'>Péssima</option>";
					html += "<option value='Sem contato'>Sem contato</option>";
				html += "</select>";
				html += "<input type='text' id='ecommerce-sale-after-sale-flow-obs-"+sales[i].id+"' class='box b2 input-generic margin-top-5 center' placeholder='Observações'>";
				html += "<div class='mobile-box b4 center padding-5 border margin-top-5 nowrap'>"+sales[i].status+"</div>";
				html += "<input type='button' class='box b4 submit-generic margin-top-5 center' onclick='Ecommerce.sale.after_sale.controller.flow.update("+sales[i].id+")' value='Salvar'>";
			html += "</div>";
		};
		document.getElementById("ecommerce-sale-after-sale-flow-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-after-sale-flow-filter-box").innerHTML = html;
	} else {
		html += "<div class='box one center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhum cliente encontrado</div>";
		document.getElementById("ecommerce-sale-after-sale-flow-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-after-sale-flow-filter-box").innerHTML = html;
	};
};