Outcome.view = {};

Outcome.view.filter = (outcomes, pagination) => {
	let outcomeTotalValue = 0;
	if (outcomes.length) {
		for (let i in outcomes) { outcomeTotalValue += parseFloat(outcomes[i].cost); };
		document.getElementById("outcome-total-value").innerHTML = "$" + outcomeTotalValue.toFixed(2);

		let html = "";
		html += "<div class='box b1 container border-explicit'>";
		html += "<div class='mobile-box a6 em07 padding-5'><div class='center'>Código</div></div>";
		html += "<div class='mobile-box a4 em07 padding-5'><div class='center'>Categoria</div></div>";
		html += "<div class='mobile-box a4 em07 padding-5'><div class='center'>Origem</div></div>";
		html += "<div class='mobile-box a6 em07 padding-5'><div class='center'>Valor</div></div>";
		html += "</div>";
		for (let i = pagination.page * pagination.pageSize; i < outcomes.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
			html += "<div class='mobile-box b9 border em09 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Outcome.controller.show(" + outcomes[i].id + ")'>" + outcomes[i].id + "</div>";
			html += "<div class='mobile-box b5 em09 padding-5 v-center'>" + outcomes[i].category_name + "</div>";
			html += "<div class='mobile-box b5 em09 padding-5 v-center'>" + outcomes[i].origin_name + "</div>";
			html += "<div class='mobile-box b8 em09 padding-5 v-center bold'>$" + outcomes[i].cost.toFixed(2) + "</div>";
			html += "<div class='mobile-box b6 em09 padding-5 v-center'>" + lib.timestampToDate(outcomes[i].date) + "</div>";
			html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><img class='icon size-20 v-center' src='/images/icon/edit.png' onclick='Outcome.controller.edit(" + outcomes[i].id + ")'></div>";
			html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><img class='icon size-20 v-center' src='/images/icon/trash.png' onclick='Outcome.controller.delete(" + outcomes[i].id + ")'></div>";
			html += "</div>";
		};
		document.getElementById("outcome-filter-div").innerHTML = html;
		document.getElementById("outcome-filter-box").style.display = "";
	} else {
		document.getElementById("outcome-total-value").innerHTML = "$" + outcomeTotalValue.toFixed(2);
		document.getElementById("outcome-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("outcome-filter-box").style.display = "";
	};
};

Outcome.view.show = (outcome) => {
	let html = "";
	html += "<div class='box b1 underline padding-5 center bold center'>Dados da despesa " + outcome.expense_id + "</div>";

	html += "<div class='box b1 container border margin-top-5 margin-bottom-5'>";
	html += "<div class='mobile-box b6 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Id</div>";
	html += "<div class='box b1 border padding-5 center'>" + outcome.expense_id + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b6 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Id da saída</div>";
	html += "<div class='box b1 border padding-5 center'>" + outcome.id + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Status</div>";
	html += "<div class='box b1 border padding-5 center'>" + outcome.status + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Data</div>";
	html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(outcome.datetime) + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Categoria</div>";
	html += "<div class='box b1 border padding-5 center'>" + outcome.category_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Origem</div>";
	html += "<div class='box b1 border padding-5 center'>" + outcome.origin_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Usuário</div>";
	html += "<div class='box b1 border padding-5 center'>" + outcome.user_name + "</div>";
	html += "</div>";

	html += "<div class='mobile-box b3-4 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Método de pagamento</div>";
	html += "<div class='box b1 border padding-5 center bold'>" + outcome.payment_method + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b4 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Valor da despesa</div>";
	html += "<div class='box b1 border padding-5 center bold'>$" + outcome.cost.toFixed(2) + "</div>";
	html += "</div>";
	if (outcome.payment_method == "Boleto") {
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Beneficiário</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.billet_receiver + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Código de barras</div>";
		html += "<div class='box b1 border padding-5 wrap center'>" + outcome.billet_code + "</div>";
		html += "</div>";
	} else if (outcome.payment_method == "Pix") {
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Beneficiário</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.pix_receiver + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Chave</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.pix_key + "</div>";
		html += "</div>";
	} else if (outcome.payment_method == "Transferência bancária") {
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Beneficiário</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.transfer_receiver + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>CPF/CNPJ</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.transfer_register + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Banco</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.transfer_bank + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Agência</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.transfer_agency + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Nº Conta</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.transfer_account + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Tipo de conta</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.transfer_account_type + "</div>";
		html += "</div>";
	}

	if (outcome.approval_date) {
		html += "<div class='mobile-box b3 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Data da aprovação</div>";
		html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(outcome.approval_date) + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2-3 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Aprovada por</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.approval_user_name + "</div>";
		html += "</div>";
	}

	if (outcome.payment_date) {
		html += "<div class='mobile-box b3 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Data do pagamento</div>";
		html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(outcome.payment_date) + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2-3 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Pago por</div>";
		html += "<div class='box b1 border padding-5 center'>" + outcome.payment_user_name + "</div>";
		html += "</div>";
	}

	html += "<div class='mobile-box b1 container margin-top-5 margin-bottom-5'>";
	html += "<div class='box b1 em06 bold'>Descrição</div>";
	html += "<div class='box b1 border padding-5 pre-wrap'>" + outcome.description + "</div>";
	html += "</div>";
	html += "</div>";

	document.getElementById("outcome-show-box").innerHTML = html;
	document.getElementById("outcome-show-box").style.display = "";
};