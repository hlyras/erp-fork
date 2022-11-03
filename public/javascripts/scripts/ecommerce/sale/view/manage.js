Ecommerce.sale.view.manage = {};

Ecommerce.sale.view.manage.filter = (sales, status, service_orders) => {
	let html = "";
	if (sales.length) {
		if (!status) {
			document.getElementById('ecommerce-sale-os-create-form').style.display = "none";

			for (let i in sales) {
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`" + sales[i].id + "`)'><h4>" + sales[i].code + "</h4></div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_name + "</div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_user + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + lib.timestampToDate(sales[i].datetime) + "</div>";
				html += "<div class='mobile-box b5-12 border padding-5 center margin-top-5'>" + sales[i].customer_phone + "</div>";
				html += "<div class='mobile-box b5-12 border padding-5 center margin-top-5'>" + sales[i].status + "</div>";
				html += "<div class='mobile-box b6 border padding-5 center margin-top-5'>" + sales[i].tracker + "</div>";
				html += "</div>";
				html += "</div>";
			};
		} else if (status == "Ag. Informações") {
			document.getElementById('ecommerce-sale-os-create-form').style.display = "none";

			for (let i in sales) {
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`" + sales[i].id + "`)'><h4>" + sales[i].code + "</h4></div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_name + "</div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_user + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].customer_phone + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + lib.timestampToDate(sales[i].datetime) + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].tracker + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].status + "</div>";
				html += "<select id='ecommerce-sale-manage-change-status-select-id" + sales[i].id + "' class='mobile-box b2 border-explicit padding-5 center margin-top-5'>";
				html += "<option value='Cancelada'>Cancelada</option>";
				html += "</select>";
				html += "<button class='mobile-box b2 submit-generic padding-5 center margin-top-5 pointer' onclick='Ecommerce.sale.controller.manage.changeStatus(" + sales[i].id + ")'>Atualizar status</button>";
				html += "</div>";
				html += "</div>";
			};
		} else if (status == "Ag. Embalo") {
			document.getElementById('ecommerce-sale-os-create-form').style.display = "none";

			for (let i in sales) {
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`" + sales[i].id + "`)'><h4>" + sales[i].code + "</h4></div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_name + "</div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_user + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].customer_phone + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + lib.timestampToDate(sales[i].datetime) + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].tracker + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].status + "</div>";
				html += "<select id='ecommerce-sale-manage-change-status-select-id" + sales[i].id + "' class='mobile-box b2 border-explicit padding-5 center margin-top-5'>";
				html += "<option value='Ag. Informações'>Ag. Informações</option>";
				html += "<option value='Cancelada'>Cancelada</option>";
				html += "</select>";
				html += "<button class='mobile-box b2 submit-generic padding-5 center margin-top-5 pointer' onclick='Ecommerce.sale.controller.manage.changeStatus(" + sales[i].id + ")'>Atualizar status</button>";
				html += "</div>";
				html += "</div>";
			};
		} else if (status == "Ag. Coleta") {
			document.getElementById('ecommerce-sale-os-create-form').style.display = "";

			for (let i in sales) {
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><input type='checkbox' name='ecommerce-sale-os-checkbox' value='" + sales[i].id + "'></div>";
				html += "<div class='mobile-box b2 border padding-5 center margin-top-5'>" + sales[i].customer_name + "</div>";
				html += "<div class='mobile-box b5-12 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`" + sales[i].id + "`)'><h4>" + sales[i].code + "</h4></div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_user + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].customer_phone + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + lib.timestampToDate(sales[i].datetime) + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].tracker + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].status + "</div>";
				html += "<select id='ecommerce-sale-manage-change-status-select-id" + sales[i].id + "' class='mobile-box b2 border-explicit padding-5 center margin-top-5'>";
				html += "<option value='Cancelada'>Cancelada</option>";
				html += "</select>";
				html += "<button class='mobile-box b2 submit-generic padding-5 center margin-top-5 pointer' onclick='Ecommerce.sale.controller.manage.changeStatus(" + sales[i].id + ")'>Atualizar status</button>";
				for (let j in service_orders) {
					html += "<select id='ecommerce-sale-manage-change-status-select-id" + sales[i].id + "' class='mobile-box b2 border-explicit padding-5 center margin-top-5'>";
					html += "<option value='" + service_orders[j].id + "'>" + service_orders[i].code + "</option>";
					html += "</select>";
				};
				html += "</div>";
				html += "</div>";
			};
		} else if (status == "Enviado") {
			document.getElementById('ecommerce-sale-os-create-form').style.display = "none";

			for (let i in sales) {
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`" + sales[i].id + "`)'><h4>" + sales[i].code + "</h4></div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_name + "</div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_user + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].customer_phone + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + lib.timestampToDate(sales[i].datetime) + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].status + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].tracker + "</div>";
				html += "</div>";
				html += "</div>";
			};
		} else if (status == "Cancelada") {
			document.getElementById('ecommerce-sale-os-create-form').style.display = "none";

			for (let i in sales) {
				html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='mobile-box b2 border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`" + sales[i].id + "`)'><h4>" + sales[i].code + "</h4></div>";
				html += "<div class='mobile-box b2 border padding-5 center margin-top-5'>" + sales[i].customer_name + "</div>";
				html += "<div class='mobile-box b2-3 border padding-5 center margin-top-5'>" + sales[i].customer_user + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].customer_phone + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + lib.timestampToDate(sales[i].datetime) + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].tracker + "</div>";
				html += "<div class='mobile-box b3 border padding-5 center margin-top-5'>" + sales[i].status + "</div>";
				html += "</div>";
				html += "</div>";
			};
		};
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	} else {
		html += "<div class='box b1 center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhuma venda encontrada</div>";
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	};
};

Ecommerce.sale.view.manage.show = (sale) => {
	let html = "";
	html += "<div class='box b1 container ground'>";
	html += "<div class='box container b3 border-explicit padding-10 margin-top-5'>";
	html += "<div class='box b1 underline center bold'>Dados do cliente</div>";
	if (sale.customer_name) {
		html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
		html += "<div class='box a1 em06 bold'>Nome</div>";
		html += "<div class='box a1'>" + sale.customer_name + "</div>";
		html += "</div>";
	};
	if (sale.customer_user) {
		html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
		html += "<div class='box a1 em06 bold'>Usuário</div>";
		html += "<div class='box a1'>" + sale.customer_user + "</div>";
		html += "</div>";
	};
	if (sale.customer_phone) {
		html += "<div class='mobile-box a1 container margin-top-5 padding-5'>";
		html += "<div class='box a1 em06 bold'>Telefone</div>";
		html += "<div class='box a1'>" + sale.customer_phone + "</div>";
		html += "</div>";
	};
	html += "</div>";

	html += "<div class='box container b3 border-explicit padding-10 margin-top-5'>";
	html += "<div class='box b1 underline center bold'>Dados da venda</div>";
	html += "<div class='mobile-box b4 border container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Origem</div>";
	html += "<div class='box a1'>" + sale.origin + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3-4 border container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Código</div>";
	html += "<div class='box a1'>" + sale.code + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 border container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Data da venda</div>";
	html += "<div class='box a1 em09'>" + lib.timestampToFulldate(sale.datetime) + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 border container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Rastreio</div>";
	html += "<div class='box a1 em09'>" + sale.tracker + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 border container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Status</div>";
	html += "<div class='box a1 em09'>" + sale.status + "</div>";
	html += "</div>";
	html += "</div>";
	html += "<div class='box container b3 border-explicit padding-10 margin-top-5'>";
	html += "<div class='box b1 underline center bold'>Dados operacionais</div>";
	html += "<div class='mobile-box a1 container border margin-top-5'>";
	html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Data da coleta</div>";
	html += "<div class='box a1 em09'>" + lib.timestampToFulldate(sale.date) + "</div>";
	html += "</div>";
	html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Coletor</div>";
	html += "<div class='box a1 em09'>" + sale.user_name + "</div>";
	html += "</div>";
	html += "</div>";
	html += "<div class='mobile-box a1 container border margin-top-5'>";
	html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Data do embalo</div>";
	html += "<div class='box a1 em09'>" + lib.timestampToFulldate(sale.packing_datetime) + "</div>";
	html += "</div>";
	html += "<div class='mobile-box a2 container margin-top-5 padding-5'>";
	html += "<div class='box a1 em06 bold'>Embalador</div>";
	html += "<div class='box a1 em09'>" + sale.packing_user_name + "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";

	if (sale.obs) {
		html += "<div class='mobile-box b1 border-explicit container margin-top-5 padding-5'>";
		html += "<div class='box a1 em06 bold'>Mensagem de observação</div>";
		html += "<div class='box a1 bold'>" + sale.obs + "</div>";
		html += "</div>";
	}

	html += "<div class='box b1 container ground'>";
	html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
	html += "<div class='box b1 underline center bold'>Produtos</div>";
	for (let i in sale.products) {
		html += "<div class='box b1 container ground box-hover border-explicit padding-10 margin-top-5'>";
		html += "<div class='mobile-box b3-4'>" + sale.products[i].info + "</div>";
		html += "<div class='mobile-box b4 center bold'>" + sale.products[i].amount + "un</div>";
		html += "</div>";
	};
	html += "</div>";

	html += "<div class='box b2 container ground border padding-5 margin-top-5'>";
	html += "<div class='box b1 underline center bold'>Pacotes</div>";
	for (let i in sale.packages) {
		html += "<div class='box b1 container ground border-explicit padding-10 margin-top-5'>";
		html += "<div class='box b1 container padding-10'>";
		html += "<div class='mobile-box b8 center pointer box-hover border-explicit' onclick='lib.displayDiv(`ecommerce-sale-show-package-product-" + sale.packages[i].package_id + "-div`, this);'>P" + sale.packages[i].package_id + "</div>";
		html += "<div class='mobile-box b2 center'>" + sale.packages[i].info + "</div>";
		html += "<h5 class='mobile-box b4 center border-explicit'>" + sale.packages[i].setup + "</h5>";
		html += "<div class='mobile-box b8 center bold'>" + sale.packages[i].amount + "un</div>";
		html += "</div>";
		html += "<div id='ecommerce-sale-show-package-product-" + sale.packages[i].package_id + "-div' class='box b1 container' style='display:none'>";
		for (let j in sale.packages[i].products) {
			html += "<div class='box b1 container border box-hover padding-5 margin-top-5'>";
			html += "<div class='mobile-box b5 center'>" + sale.packages[i].products[j].amount + "un</div>";
			html += "<div class='mobile-box b4-5'>" + sale.packages[i].products[j].product_info + "</div>";
			html += "</div>";
		};
		html += "</div>";
		html += "</div>";
	};
	html += "</div>";
	html += "</div>";

	document.getElementById("ecommerce-sale-filter-box").style.display = "none";
	document.getElementById("ecommerce-sale-show-box").style.display = "";
	document.getElementById("ecommerce-sale-show-box").innerHTML = html;
};