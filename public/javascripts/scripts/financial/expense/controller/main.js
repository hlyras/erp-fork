Expense.controller = {};

Expense.controller.create = document.getElementById("expense-create-form");
if(Expense.controller.create){
	Expense.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let expense = {
			due_date: event.target.elements.namedItem("due-date").value,
			description: event.target.elements.namedItem("description").value,
			cost: event.target.elements.namedItem("cost").value,
			payment_category: event.target.elements.namedItem("payment-category").value
		};

		if(event.target.elements.namedItem("payment-category").value = "Boleto"){
			expense.payment_category = event.target.elements.namedItem("payment-category").value;
			expense.billet_receiver = event.target.elements.namedItem("billet-receiver")
			expense.billet_key = event.target.elements.namedItem("billet-key")
		} else if(event.target.elements.namedItem("payment-category").value = "Pix"){
			expense.payment_category = event.target.elements.namedItem("payment-category").value;
			expense.pix_receiver = event.target.elements.namedItem("pix-receiver")
			expense.pix_key = event.target.elements.namedItem("pix-key")
		} else if(event.target.elements.namedItem("payment-category").value = "Transferência bancária"){
			expense.payment_category = event.target.elements.namedItem("payment-category").value;
			expense.bank_transfer_receiver = event.target.elements.namedItem("bank-transfer-receiver").value;
			expense.bank_transfer_register = event.target.elements.namedItem("bank-transfer-register").value;
			expense.bank_transfer_bank = event.target.elements.namedItem("bank-transfer-bank").value;
			expense.bank_transfer_agency = event.target.elements.namedItem("bank-transfer-agency").value;
			expense.bank_transfer_account = event.target.elements.namedItem("bank-transfer-account").value;
			expense.bank_transfer_category = event.target.elements.namedItem("bank-transfer-category").value;
		}

		console.log(expense);
	});
}

Expense.controller.payment_category = document.getElementById("expense-payment-category");
if(Expense.controller.payment_category){
	Expense.controller.payment_category.addEventListener("change", event => {

		if(event.target.value == "Boleto"){
			document.getElementById("expense-pix-form").style.display = "none";
			document.getElementById("expense-bank-transfer-form").style.display = "none";
			document.getElementById("expense-billet-form").style.display = "";
		}
		if(event.target.value == "Pix"){
			document.getElementById("expense-billet-form").style.display = "none";
			document.getElementById("expense-bank-transfer-form").style.display = "none";
			document.getElementById("expense-pix-form").style.display = "";
		}
		if(event.target.value == "Transferência bancária"){
			document.getElementById("expense-billet-form").style.display = "none";
			document.getElementById("expense-pix-form").style.display = "none";
			document.getElementById("expense-bank-transfer-form").style.display = "";
		}
	});
}