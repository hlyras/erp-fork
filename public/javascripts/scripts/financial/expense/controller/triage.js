Expense.triage = {};

Expense.triage.controller = {};

Expense.triage.controller.filter = document.getElementById("expense-triage-filter-form");
if(Expense.triage.controller.filter){
	Expense.triage.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let expense = {
			id: "",
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			category_id: event.target.elements.namedItem("category-id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			payment_method: event.target.elements.namedItem("payment-method").value,
			status: event.target.elements.namedItem("status").value,
			user_id: event.target.elements.namedItem("user_id").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		expenses = await Expense.filter(expense);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!expenses) { return false };

		document.getElementById("expense-triage-show-box").style.display = "none";
		document.getElementById("expense-pay-form").style.display = "none";

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("expense-triage-filter-box", Expense.triage.view.filter, expenses, pagination); });
	});
}

Expense.triage.controller.show = async (id) => {
	document.getElementById("ajax-loader").style.visibility = "visible";
	let expense = await Expense.findById(id);
	document.getElementById("ajax-loader").style.visibility = "hidden";
	if(!expense) { return false };

	document.getElementById("expense-triage-filter-box").style.display = "none";

	if(expense.status == "A pagar"){
		document.getElementById("expense-pay-form").elements.namedItem("id").value = expense.id;
		document.getElementById("expense-pay-form").elements.namedItem("outcome-id").value = expense.outcome_id;
		document.getElementById("expense-pay-form").elements.namedItem("income-category-id").value = "";
		document.getElementById("expense-pay-form").style.display = "";
	} else if(expense.status == "Pago"){
		document.getElementById("expense-pay-form").style.display = "none";
	}

	Expense.triage.view.show(expense);
};

Expense.triage.controller.pay = document.getElementById("expense-pay-form");
if(Expense.triage.controller.pay){
	Expense.triage.controller.pay.addEventListener("submit", async event => {
		event.preventDefault();

		const expense = {
			id: event.target.elements.namedItem("id").value,
			outcome_id: event.target.elements.namedItem("outcome-id").value,
			income_category_id: event.target.elements.namedItem("income-category-id").value
		}

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Expense.pay(expense);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!response){ return false };

		Expense.triage.controller.filter.submit.click();
	});
}