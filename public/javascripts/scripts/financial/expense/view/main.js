Expense.view = {};

lib.timestampToDate = (timestamp) => {
	if (timestamp) {
		let date = new Date(parseInt(timestamp));
		let day; let month; let hour; let minute;
		if (date.getDate() < 10) { day = "0" + date.getDate() } else { day = date.getDate() };
		if (date.getMonth() < 9) { month = "0" + (date.getMonth() + 1) } else { month = (date.getMonth() + 1) };
		if (date.getHours() < 10) { hour = "0" + date.getHours() } else { hour = date.getHours() };
		if (date.getMinutes() < 10) { minute = "0" + date.getMinutes() } else { minute = date.getMinutes() };
		return day + '-' + month + '-' + date.getFullYear();
	};
	return false;
};

Expense.view.originPayments = (payments, pagination) => {
	if (payments.length) {
		let html = "";
		for (let i in payments) {
			html += "<div class='box a1 container border-explicit-2 padding-5 margin-top-5'>";
			html += "<input type='radio' id='origin-payment-radio-" + payments[i].id + "' name='origin-payment-id' class='mobile-box b9 center' value='" + payments[i].id + "'>";
			html += "<div class='mobile-box b9 margin-top-5 center bold'>" + payments[i].id + "</div>";
			html += "<div class='mobile-box b7-9 margin-top-5 center bold'>" + payments[i].method + "</div>";
			if (payments[i].method == "Pix") {
				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Nome do benefiário</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].pix_receiver + "</div>";
				html += "</div>";

				html += "<div class='mobile-box b2-3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Chave</div>";
				html += "<div class='mobile-box b1 margin-top-5 wrap'>" + payments[i].pix_key + "</div>";
				html += "</div>";
			} else if (payments[i].method == "Transferência bancária") {
				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Nome do benefiário</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].transfer_receiver + "</div>";
				html += "</div>";

				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>CPF ou CNPJ</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].transfer_register + "</div>";
				html += "</div>";

				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Banco</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].transfer_bank + "</div>";
				html += "</div>";

				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Agência</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].transfer_agency + "</div>";
				html += "</div>";

				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Nº da conta</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].transfer_account + "</div>";
				html += "</div>";

				html += "<div class='mobile-box b3 margin-top-5 padding-5 border'>";
				html += "<div class='mobile-box b1 em07 bold'>Tipo de conta</div>";
				html += "<div class='mobile-box b1 margin-top-5'>" + payments[i].transfer_account_type + "</div>";
				html += "</div>";
			}
			html += "</div>";
		};
		document.getElementById("expense-payment-method-div").innerHTML = html;
		document.getElementById("expense-payment-method-box").style.display = "";

		document.getElementById("expense-billet-form").style.display = "none";
		document.getElementById("origin-payment-radio").checked = false;
	} else {
		document.getElementById("expense-payment-method-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("expense-payment-method-box").style.display = "none";

		document.getElementById("expense-billet-form").style.display = "";
	}
};

Expense.view.filter = (expenses, pagination) => {
	if (expenses.length) {
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < expenses.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			if (expenses[i].id == 3581) { console.log(expenses[i]) }
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
			html += "<div class='mobile-box b9 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Expense.controller.show(" + expenses[i].id + ")'>" + expenses[i].id + "</div>";
			html += "<div class='mobile-box b9 avant-garde center'>" + expenses[i].outcome_id + "</div>";
			html += "<div class='mobile-box b3 padding-5 center bold'>" + expenses[i].status + "</div>";
			html += "<div class='mobile-box b2-9 padding-5 center bold'>" + lib.timestampToDate(expenses[i].date) + "</div>";
			html += "<div class='mobile-box b9 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Expense.controller.edit(" + expenses[i].id + ")'></div>";
			html += "<div class='mobile-box b9 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Expense.controller.cancel(" + expenses[i].id + ")'></div>";
			html += "<div class='mobile-box b2-5 padding-5 center'>" + expenses[i].category_name + "</div>";
			html += "<div class='mobile-box b2-5 padding-5 center'>" + expenses[i].origin_name + "</div>";
			html += "<div class='mobile-box b5 padding-5 center bold'>$" + expenses[i].cost.toFixed(2) + "</div>";
			html += "</div>";
		};
		document.getElementById("expense-filter-div").innerHTML = html;
		document.getElementById("expense-filter-box").style.display = "";

	} else {
		document.getElementById("expense-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("expense-filter-box").style.display = "";
	};
};

Expense.view.show = (expense) => {
	let html = "";
	html += "<div class='box b1 underline padding-5 center bold center'>Dados da despesa " + expense.id + "</div>";

	html += "<div class='box b1 container border margin-top-5 margin-bottom-5'>";
	html += "<div class='mobile-box b6 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Id</div>";
	html += "<div class='box b1 border padding-5 center'>" + expense.id + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b6 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Id da saída</div>";
	html += "<div class='box b1 border padding-5 center'>" + expense.outcome_id + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Status</div>";
	html += "<div class='box b1 border padding-5 center'>" + expense.status + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Data</div>";
	html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(expense.date) + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Categoria</div>";
	html += "<div class='box b1 border padding-5 center'>" + expense.category_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Origem</div>";
	html += "<div class='box b1 border padding-5 center'>" + expense.origin_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Usuário</div>";
	html += "<div class='box b1 border padding-5 center'>" + expense.user_name + "</div>";
	html += "</div>";

	html += "<div class='mobile-box b3-4 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Método de pagamento</div>";
	html += "<div class='box b1 border padding-5 center bold'>" + expense.payment_method + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b4 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Valor da despesa</div>";
	html += "<div class='box b1 border padding-5 center bold'>$" + expense.cost.toFixed(2) + "</div>";
	html += "</div>";
	if (expense.payment_method == "Boleto") {
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Beneficiário</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.billet_receiver + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Código de barras</div>";
		html += "<div class='box b1 border padding-5 wrap center'>" + expense.billet_code + "</div>";
		html += "</div>";
	} else if (expense.payment_method == "Pix") {
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Beneficiário</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.pix_receiver + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Chave</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.pix_key + "</div>";
		html += "</div>";
	} else if (expense.payment_method == "Transferência bancária") {
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Beneficiário</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.transfer_receiver + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>CPF/CNPJ</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.transfer_register + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Banco</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.transfer_bank + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Agência</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.transfer_agency + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Nº Conta</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.transfer_account + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container margin-top-5'>";
		html += "<div class='box b1 em06 bold'>Tipo de conta</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.transfer_account_type + "</div>";
		html += "</div>";
	}

	if (expense.approval_date) {
		html += "<div class='mobile-box b3 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Data da aprovação</div>";
		html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(expense.approval_date) + "</div>";
		html += "</div>";
		html += "<div class='mobile-box b2-3 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Aprovada por</div>";
		html += "<div class='box b1 border padding-5 center'>" + expense.approval_user_name + "</div>";
		html += "</div>";
	}

	if (expense.payment_date) {
		html += "<div class='mobile-box b1 container margin-top-5'>";
		html += "<div class='box b1 em07 bold'>Pagamento da despesa</div>";
		html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(expense.payment_date) + "</div>";
		html += "</div>";
	}

	html += "<div class='mobile-box b1 container margin-top-5 margin-bottom-5'>";
	html += "<div class='box b1 em06 bold'>Descrição</div>";
	html += "<div class='box b1 border padding-5 pre-wrap'>" + expense.description + "</div>";
	html += "</div>";
	html += "</div>";

	if (expense.status == "Ag. aprovação") {
		if (document.getElementById("expense-confirm-btn")) {
			document.getElementById("expense-confirm-btn").style.display = "";
			document.getElementById("expense-confirm-btn").setAttribute("onClick", "javascript: Expense.controller.confirm(" + expense.id + ");");
		}
	} else {
		if (document.getElementById("expense-confirm-btn")) {
			document.getElementById("expense-confirm-btn").style.display = "none";
			document.getElementById("expense-confirm-btn").setAttribute("onClick", "javascript: alert('Não é permitido confirmar essa despesa!');");
		}
	}

	document.getElementById("expense-show-box").innerHTML = html;
	document.getElementById("expense-show-box").style.display = "";
};