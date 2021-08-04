Expense.triage.view = {};

Expense.triage.view.filter = (expenses, pagination) => {
	if(expenses.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < expenses.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='container box b3 ground margin-top-5 padding-5 border-explicit-2'>";
		   		html += "<div class='box b1 container h-center margin-top-5'>";
					if(expenses[i].status == "A pagar"){
						if(parseInt(expenses[i].date) < lib.genTimestamp()){
							html += "<div class='mobile-box a2-3 em13 bold center bg-red radius-10 font-white'>"+expenses[i].status+"</div>";
						} else if((parseInt(expenses[i].date) - parseInt(lib.timestampDay())) < lib.genTimestamp()){
							html += "<div class='mobile-box a2-3 em13 bold center bg-orange radius-10 font-white'>"+expenses[i].status+"</div>";
						} else {
							html += "<div class='mobile-box a2-3 em13 bold center bg-blue radius-10 font-white'>"+expenses[i].status+"</div>";
						}
					} else if(expenses[i].status == "Pago"){
						html += "<div class='mobile-box a2-3 em13 bold center bg-gray radius-10 font-white'>"+expenses[i].status+"</div>";
					}
					html += "<div class='mobile-box a2-3 em11 bg-gray radius-10 margin-top-5 center font-white'>"+lib.timestampToDate(parseInt(expenses[i].date))+"</div>"; 
				html += "</div>";
				html += "<div class='box b1 container border-explicit margin-top-5 padding-5'>";
					html += "<div class='mobile-box b9 center'><img class='width-25' src='/images/icon/label.png'></div>";
					html += "<div class='mobile-box b8-9 center bold'>"+expenses[i].origin_name+"</div>";
				html += "</div>";
				html += "<div class='box b1 container border-explicit margin-top-5 padding-5'>";
					html += "<div class='mobile-box b9 center'><img class='width-25' src='/images/icon/wallet.png'></div>";
					html += "<div class='mobile-box b8-9 center bold'>"+expenses[i].payment_method+"</div>";
				html += "</div>";
				html += "<div class='box b1 container border-explicit margin-top-5 padding-5'>";
					html += "<div class='mobile-box b9 center'><img class='width-25' src='/images/icon/dollar.png'></div>";
					html += "<div class='mobile-box b8-9 em12 center bold'>R$"+expenses[i].cost+"</div>";
				html += "</div>";
				html += "<button class='box a1 center bg-green radius-10 font-white input-generic noborder margin-top-5 pointer opacity-out-09' onclick='Expense.triage.controller.show("+expenses[i].id+")'>Conferir</button>";
		   	html += "</div>";
		};
		document.getElementById("expense-triage-filter-div").innerHTML = html;
		document.getElementById("expense-triage-filter-box").style.display = "";
	} else {
		document.getElementById("expense-triage-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("expense-triage-filter-box").style.display = "";
	};
};

Expense.triage.view.show = (expense) => {
	let html = "";

	html += "<div class='box b1 underline em12 avant-garde padding-5 bold center'>Despesa "+expense.id+" | Saída "+expense.outcome_id+"</div>";

	html += "<div class='box b1 container ground border-explicit-2 padding-5 margin-top-5'>";
		html += "<div class='box b3 em08 bold margin-top-10'>Despesa cadastrada por: "+expense.user_name+"</div>"
		html += "<div class='box b1 container h-center margin-top-5'>";
			if(expense.status == "A pagar"){
				if(parseInt(expense.date) < lib.genTimestamp()){ html += "<div class='box b3 bg-red radius-10 padding-5'>"; } 
				else if((parseInt(expense.date) - parseInt(lib.timestampDay())) < lib.genTimestamp()){ html += "<div class='box b3 bg-orange radius-10 padding-5'>"; } 
				else { html += "<div class='box b3 bg-blue radius-10 padding-5'>"; }
			} else if(expense.status == "Pago"){
				if(parseInt(expense.date) + parseInt(lib.timestampDay()) > expense.payment_date){
					console.log(parseInt(expense.date) + parseInt(lib.timestampDay()));
					console.log(expense.payment_date);
					html += "<div class='box b3 bg-green radius-10 padding-5'>";
				} else {
					console.log(parseInt(expense.date) + parseInt(lib.timestampDay()));
					console.log(expense.payment_date);
					html += "<div class='box b3 bg-red radius-10 padding-5'>";
				}
			}
				html += "<div class='box a1 center bold font-white'>"+expense.status+"</div>";
			html += "</div>";
		html += "</div>";
		html += "<div class='box b1 container h-center margin-top-5'>";
			html += "<div class='box b3 bg-gray radius-10 padding-5'>";
				html += "<div class='box a1 em08 center font-white'>Vencimento: "+lib.timestampToDate(parseInt(expense.date))+"</div>";
			html += "</div>";
		html += "</div>";

		html += "<div class='mobile-box b2 container border padding-5 margin-top-10'>";
			html += "<div class='mobile-box b6 center'><img class='width-25' src='/images/icon/bill.png'></div>";
			html += "<div class='mobile-box b5-6 center'>"+expense.category_name+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b2 container border padding-5 margin-top-10'>";
			html += "<div class='mobile-box b6 center'><img class='width-25' src='/images/icon/tag.png'></div>";
			html += "<div class='mobile-box b5-6 center'>"+expense.origin_name+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container margin-top-5 margin-bottom-5'>";
			html += "<div class='box b1 em06 bold'>Descrição</div>";
			html += "<div class='box b1 border padding-5 pre-wrap'>"+expense.description+"</div>";
		html += "</div>";

		html += "<div class='box b1 underline-explicit margin-top-10'></div>";

		html += "<div class='box b1 em12 bold center'>"+expense.payment_method+"</div>";

		if(expense.payment_method == "Boleto"){
			html += "<div class='mobile-box b5 container border margin-top-5'>";
				html += "<div class='box a1 em06 bold padding-5'>Beneficiário</div>";
				html += "<div class='box a1 padding-5'>"+expense.billet_bank+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b3-5 container border margin-top-5'>";
				html += "<div class='box a1 em06 bold padding-5'>Banco</div>";
				html += "<div class='box a1 padding-5'>"+expense.billet_receiver+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b5 container border margin-top-5'>";
				html += "<div class='box a1 em06 bold padding-5'>Valor</div>";
				html += "<div class='box a1 padding-5'>$"+expense.cost+"</div>";
			html += "</div>";
			html += "<div class='box b1 container border pointer opacity-in-08 margin-top-5 padding-5'>";
				html += "<input type='text' id='expense-billet-code' class='mobile-box b8-9 em08 border padding-5 center wrap' value='"+expense.billet_code+"'>";
				html += "<div class='mobile-box b9 center'><img class='width-25' onclick='lib.copyToClipboard(`expense-billet-code`)' src='/images/icon/copy.png'></div>";
			html += "</div>";
		} else if(expense.payment_method == "Pix"){
			html += "<div class='mobile-box b2-3 container margin-top-5'>";
				html += "<div class='box a1 em06 bold '>Beneficiário</div>";
				html += "<div class='box a1 border padding-5'>"+expense.pix_receiver+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b3 container margin-top-5'>";
				html += "<div class='box a1 em06 bold '>Valor</div>";
				html += "<div class='box a1 border padding-5'>$"+expense.cost+"</div>";
			html += "</div>";
			html += "<div class='box b1 container margin-top-5'>";
				html += "<div class='box a1 em06 bold'>Chave</div>";
				html += "<input type='text' id='expense-pix-key' class='mobile-box b8-9 em08 border padding-5 center wrap' value='"+expense.pix_key+"'>";
				html += "<div class='mobile-box b9 center'><img class='width-25 opacity-in-08 pointer' onclick='lib.copyToClipboard(`expense-pix-key`)' src='/images/icon/copy.png'></div>";
			html += "</div>";
		} else if(expense.payment_method == "Transferência bancária"){
			html += "<div class='mobile-box b2 container margin-top-5'>";
				html += "<div class='box b1 em06 bold'>Beneficiário</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.transfer_receiver+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2 container margin-top-5'>";
				html += "<div class='box b1 em06 bold'>CPF/CNPJ</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.transfer_register+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2 container margin-top-5'>";
				html += "<div class='box b1 em06 bold'>Banco</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.transfer_bank+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2 container margin-top-5'>";
				html += "<div class='box b1 em06 bold'>Agência</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.transfer_agency+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2 container margin-top-5'>";
				html += "<div class='box b1 em06 bold'>Nº Conta</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.transfer_account+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2 container margin-top-5'>";
				html += "<div class='box b1 em06 bold'>Tipo de conta</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.transfer_account_type+"</div>";
			html += "</div>";
		}

		if(expense.approval_date){
			html += "<div class='mobile-box b3 container margin-top-5'>";
				html += "<div class='box b1 em07 bold'>Data da aprovação</div>";
				html += "<div class='box b1 border padding-5 center'>"+lib.timestampToDate(expense.approval_date)+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2-3 container margin-top-5'>";
				html += "<div class='box b1 em07 bold'>Aprovada por</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.approval_user_name+"</div>";
			html += "</div>";
		}

		if(expense.payment_date){
			html += "<div class='mobile-box b3 container margin-top-5'>";
				html += "<div class='box b1 em07 bold'>Data do pagamento</div>";
				html += "<div class='box b1 border padding-5 center'>"+lib.timestampToDate(expense.payment_date)+"</div>";
			html += "</div>";
			html += "<div class='mobile-box b2-3 container margin-top-5'>";
				html += "<div class='box b1 em07 bold'>Pago por</div>";
				html += "<div class='box b1 border padding-5 center'>"+expense.payment_user_name+"</div>";
			html += "</div>";
		}
	html += "</div>";

	document.getElementById("expense-triage-show-div").innerHTML = html;
	document.getElementById("expense-triage-show-box").style.display = "";
};