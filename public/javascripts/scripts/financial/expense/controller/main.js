Expense.controller = {};

Expense.controller.create = document.getElementById("expense-create-form");
if(Expense.controller.create){
	Expense.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let expense = {
			id: event.target.elements.namedItem("id").value,
			outcome_id: event.target.elements.namedItem("outcome-id").value,
			date: lib.dateToTimestamp(event.target.elements.namedItem("date").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			origin_payment_id: lib.findCheckedRadios("origin-payment-id").value,
			description: event.target.elements.namedItem("description").value,
			cost: event.target.elements.namedItem("cost").value
		};
		
		if(!expense.origin_payment_id){
			if(event.target.elements.namedItem("payment-method").value == "Boleto"){
				expense.payment_method = "Boleto";
				expense.billet_bank = event.target.elements.namedItem("billet-bank").value;
				expense.billet_receiver = event.target.elements.namedItem("billet-receiver").value;
				expense.billet_code = lib.removeChar(event.target.elements.namedItem("billet-code").value, ['.',' ',',']);
			} else {
				return alert("Método de pagamento inválido!");
			}
		}

		if(expense.origin_payment_id){
			let originPayment = await API.response(Outcome.origin.payment.findById, expense.origin_payment_id);
			if(!originPayment){ return false };

			expense.origin_payment_id = originPayment.id;
			expense.payment_method = originPayment.method;

			if(originPayment.method == "Pix"){
				expense.pix_receiver = originPayment.pix_receiver;
				expense.pix_key = lib.removeChar(originPayment.pix_key, []);
			} else if(originPayment.method == "Transferência bancária"){
				expense.transfer_receiver = originPayment.transfer_receiver;
				expense.transfer_register = originPayment.transfer_register;
				expense.transfer_bank = originPayment.transfer_bank;
				expense.transfer_agency = originPayment.transfer_agency;
				expense.transfer_account = originPayment.transfer_account;
				expense.transfer_account_type = originPayment.transfer_account_type;
			}
		}
		
		if(!await API.response(Expense.save, expense)){ return false };

		document.getElementById("expense-create-form").elements.namedItem("id").value = "";
		document.getElementById("expense-create-form").elements.namedItem("outcome-id").value = "";
		document.getElementById("expense-create-form").elements.namedItem("date").value = "";
		document.getElementById("expense-create-form").elements.namedItem("category-id").value = "";
		document.getElementById("expense-create-form").elements.namedItem("origin-id").value = "";
		document.getElementById("expense-create-form").elements.namedItem("origin-payment-id").value = "";
		document.getElementById("expense-create-form").elements.namedItem("description").value = "";
		document.getElementById("expense-create-form").elements.namedItem("cost").value = "0.00";
		document.getElementById("expense-create-form").elements.namedItem("payment-method").value = "";
		document.getElementById("expense-create-form").elements.namedItem("billet-bank").value = "";
		document.getElementById("expense-create-form").elements.namedItem("billet-receiver").value = "";
		document.getElementById("expense-create-form").elements.namedItem("billet-code").value = "";

		document.getElementById("expense-payment-method-div").innerHTML = "";
		document.getElementById("expense-payment-method-box").style.display = "none";


		Expense.controller.filter.submit.click();
	});

	Expense.controller.create.elements.namedItem("origin-payment-id").addEventListener("click", async event => {
		document.getElementById("expense-create-form").elements.namedItem("payment-method").value = "Boleto";
	});

	Expense.controller.create.elements.namedItem("origin-id").addEventListener("change", async event => {
		await Expense.controller.fillOriginPayments(event.target.value, "expense-payment-method-box", Expense.view.originPayments);
	});
}

Expense.controller.fillOriginPayments = async (origin_id, box, render) => {
	let payment = origin_id ? { origin_id: origin_id } : { origin_id: 0 };

	let payments = await API.response(Outcome.origin.payment.filter, payment);
	if(!payments){ return false; }

	let pagination = { pageSize: 5, page: 0};
	$(() => { lib.carousel.execute(box, render, payments, pagination); });	
};

Expense.controller.filter = document.getElementById("expense-filter-form");
if(Expense.controller.filter){
	Expense.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let expense = {
			id: "",
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			income_category_id: event.target.elements.namedItem("income-category-id").value,
			status: event.target.elements.namedItem("status").value,
			user_id: event.target.elements.namedItem("user_id").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		expenses = await Expense.filter(expense);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!expenses) { return false };

		document.getElementById("expense-show-box").style.display = "none";

		if(document.getElementById("expense-confirm-btn")){
			document.getElementById("expense-confirm-btn").style.display = "none";
			document.getElementById("expense-confirm-btn").setAttribute("onClick", "javascript: alert('Não é permitido confirmar essa despesa!');" );
		}

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("expense-filter-box", Expense.view.filter, expenses, pagination); });
	});
}

Expense.controller.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let expense = await Expense.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!expense){ return false };

	if(expense.status == "Pago"){ return alert("Não é possível realizar alterações em despesas que tenham sido pagas."); }

	document.getElementById("expense-create-form").elements.namedItem("id").value = expense.id;
	document.getElementById("expense-create-form").elements.namedItem("outcome-id").value = expense.outcome_id;
	document.getElementById("expense-create-form").elements.namedItem("date").value = lib.convertDate(lib.timestampToDate(expense.date));
	document.getElementById("expense-create-form").elements.namedItem("category-id").value = expense.category_id;
	await Outcome.controller.fillOriginSelect(expense.category_id, "expense-create-form");
	document.getElementById("expense-create-form").elements.namedItem("origin-id").value = expense.origin_id;
	await Expense.controller.fillOriginPayments(expense.origin_id, "expense-payment-method-box", Expense.view.originPayments);
	document.getElementById("expense-create-form").elements.namedItem("description").value = expense.description;
	document.getElementById("expense-create-form").elements.namedItem("cost").value = expense.cost;
	document.getElementById("expense-create-form").elements.namedItem("payment-method").value = expense.payment_method;
	if(expense.payment_method == "Boleto"){
		document.getElementById("expense-create-form").elements.namedItem("billet-bank").value = expense.billet_bank;
		document.getElementById("expense-create-form").elements.namedItem("billet-receiver").value = expense.billet_receiver;
		document.getElementById("expense-create-form").elements.namedItem("billet-code").value = expense.billet_code;
	}

	document.getElementById("expense-payment-method-div").innerHTML = "";
	document.getElementById("expense-payment-method-box").style.display = "none";

};

Expense.controller.show = async (id) => {
	document.getElementById("ajax-loader").style.visibility = "visible";
	let expense = await Expense.findById(id);
	document.getElementById("ajax-loader").style.visibility = "hidden";
	if(!expense) { return false };

	document.getElementById("expense-filter-box").style.display = "none";

	Expense.view.show(expense);
};

Expense.controller.confirm = async (outcome_id) => {
	let r = confirm('Deseja realmente aprovar a despesa?');
	if(r){
		let expense = { id: outcome_id };
		document.getElementById('ajax-loader').style.visibility = 'visible';
		if(!await Expense.confirm(expense)){ return false };
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		
		Expense.controller.filter.submit.click();
	}
};

Expense.controller.cancel = async (expense_id) => {
	let r = confirm('Deseja realmente cancelar a despesa?');
	if(r){
		if(!await API.response(Expense.cancel, expense_id)){ return false; };
		Expense.controller.filter.submit.click();
	}
};