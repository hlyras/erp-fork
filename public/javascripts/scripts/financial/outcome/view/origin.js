Outcome.origin.view = {};

Outcome.origin.view.show = (origin) => {
	let html = "";
	html += "<div class='mobile-box b4 em11 bold avant-garde center tbl-show-link nowrap' onclick='Outcome.origin.controller.show("+origin.id+")'>"+origin.id+"</div>";
	html += "<div class='mobile-box b2 em13 bold avant-garde center'>"+origin.name+"</div>";
	html += "<button type='button' class='mobile-box b1 submit-generic center margin-top-5' onclick='lib.displayDiv(`origin-payment-create-form`, this, `Adicionar método de pagamento`, `Esconder formulário`)'>Adicionar método de pagamento</button>";
	
	document.getElementById("outcome-origin-show-box").innerHTML = html;
	document.getElementById("outcome-origin-show-box").style.display = "";
};

Outcome.origin.view.filter = (origins, pagination) => {
	if(origins.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < origins.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
				html += "<div class='mobile-box b7 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Outcome.origin.controller.show("+origins[i].id+")'>"+origins[i].id+"</div>";
				html += "<div class='mobile-box b4-7 padding-5 v-center'>"+origins[i].name+"</div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Outcome.origin.controller.edit("+origins[i].id+")'></div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Outcome.origin.controller.delete("+origins[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("outcome-origin-filter-div").innerHTML = html;
		document.getElementById("origin-payment-filter-box").style.display = "none";
	} else {
		document.getElementById("outcome-origin-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("origin-payment-filter-box").style.display = "none";
	};
};

Outcome.origin.payment.view = {};

Outcome.origin.payment.view.show = (payment) => {
	let html = "";
	html += "<div class='mobile-box b4 em11 bold avant-garde center'>"+payment.id+"</div>";
	html += "<div class='mobile-box b2 em13 bold avant-garde center'>"+payment.method+"</div>";
	document.getElementById("origin-payment-show-box").style.display = "";
	document.getElementById("origin-payment-show-box").innerHTML = html;
};

Outcome.origin.payment.view.filter = (payments, pagination) => {
	if(payments.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < payments.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
				html += "<div class='mobile-box b7 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Outcome.origin.payment.controller.show("+payments[i].id+")'>"+payments[i].id+"</div>";
				html += "<div class='mobile-box b4-7 padding-5 v-center'>"+payments[i].method+"</div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Outcome.origin.payment.controller.edit("+payments[i].id+")'></div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Outcome.origin.payment.controller.delete("+payments[i].id+")'></div>";
				if(payments[i].method == "Pix"){
					html += "<div class='mobile-box b2 padding-5 center'>"+payments[i].pix_receiver+"</div>";
				} else if(payments[i].method == "Transferência bancária"){
					html += "<div class='mobile-box b2 padding-5 center'>"+payments[i].transfer_receiver+"</div>";
					html += "<div class='mobile-box b2 padding-5 center'>"+payments[i].transfer_bank+"</div>";
				}
			html += "</div>";
		};
		document.getElementById("origin-payment-filter-div").innerHTML = html;
		document.getElementById("origin-payment-filter-box").style.display = "";
	} else {
		document.getElementById("origin-payment-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("origin-payment-filter-box").style.display = "";
	}
};

Outcome.origin.payment.view.show = (payment) => {
	let html = "";
	html += "<div class='mobile-box b7 em12 bold padding-5 center'>"+payment.id+"</div>";
	html += "<div class='mobile-box b4-7 em12 padding-5 center'>"+payment.method+"</div>";
	html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Outcome.origin.payment.controller.edit("+payment.id+")'></div>";
	html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Outcome.origin.payment.controller.delete("+payment.id+")'></div>";
	if(payment.method == "Pix"){
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Recebedor:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.pix_receiver+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Chave:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center wrap'>"+payment.pix_key+"</div>";
		html += "</div>";
	} else if(payment.method == "Transferência bancária"){
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Recebedor:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.transfer_receiver+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>CPF/CNPJ:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.transfer_register+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Banco:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.transfer_bank+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Agência:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.transfer_agency+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Nº conta:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.transfer_account+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b1 container border padding-5 margin-top-5'>";
			html += "<div class='mobile-box b4 em08 bold padding-5'>Tipo de conta:</div>";
			html += "<div class='mobile-box b3-4 padding-5 center'>"+payment.transfer_account_type+"</div>";
		html += "</div>";
	}
	document.getElementById("origin-payment-show-box").innerHTML = html;
	document.getElementById("origin-payment-show-box").style.display = "";
};