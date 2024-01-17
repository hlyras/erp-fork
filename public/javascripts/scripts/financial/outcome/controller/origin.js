const OutcomeOriginController = {};

OutcomeOriginController.create = document.getElementById("outcome-origin-create-form");
if (OutcomeOriginController.create) {
	OutcomeOriginController.create.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			id: event.target.elements.namedItem("id").value || null,
			category_id: event.target.elements.namedItem("category-id").value || null,
			name: event.target.elements.namedItem("name").value || null
		};

		let response = await API.response(OutcomeOrigin.create, origin);
		if (!response) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		OutcomeOriginController.filter.submit.click();
	});
}

OutcomeOriginController.filter = document.getElementById("outcome-origin-filter-form");
if (OutcomeOriginController.filter) {
	OutcomeOriginController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			category_id: event.target.elements.namedItem("category-id").value,
			name: event.target.elements.namedItem("name").value
		};

		let origins = await API.response(OutcomeOrigin.filter, origin);
		if (!origins) { return false };

		document.getElementById("outcome-origin-filter-div").style.display = "";
		document.getElementById("outcome-origin-filter-box").children.namedItem("carousel-navigation").style.display = "";

		document.getElementById("outcome-origin-show-box").style.display = "none";
		document.getElementById("origin-payment-show-box").style.display = "none";

		const pagination = { pageSize: 9, page: 0 };
		(function () { lib.carousel.execute("outcome-origin-filter-box", OutcomeOriginView.filter, origins, pagination); }());
	});
}

OutcomeOriginController.show = async (id) => {
	let origin = await API.response(OutcomeOrigin.findById, id);
	if (!origin) { return false };

	document.getElementById("outcome-origin-filter-div").style.display = "none";
	document.getElementById("outcome-origin-filter-box").children.namedItem("carousel-navigation").style.display = "none";

	document.getElementById("origin-payment-show-box").style.display = "none";

	document.getElementById("origin-payment-create-form").elements.namedItem("origin-id").value = origin.id;
	document.getElementById("origin-payment-filter-form").elements.namedItem("origin-id").value = origin.id;

	OutcomeOriginPaymentController.filter.submit.click();

	OutcomeOriginView.show(origin);
};

OutcomeOriginController.edit = async (id) => {
	let origin = await API.response(OutcomeOrigin.findById, id);
	if (!origin) { return false };

	document.getElementById("outcome-origin-create-form").elements.namedItem("id").value = origin.id;
	document.getElementById("outcome-origin-create-form").elements.namedItem("category-id").value = origin.category_id;
	document.getElementById("outcome-origin-create-form").elements.namedItem("name").value = origin.name;
};

OutcomeOriginController.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a origem?');
	if (r) {
		if (!await API.response(OutcomeOrigin.delete, id)) { return false };

		OutcomeOriginController.filter.submit.click();
	};
};

const OutcomeOriginPaymentController = {};

OutcomeOriginPaymentController.create = document.getElementById("origin-payment-create-form");
if (OutcomeOriginPaymentController.create) {
	OutcomeOriginPaymentController.create.addEventListener("submit", async event => {
		event.preventDefault();

		let payment = {
			id: event.target.elements.namedItem("id").value || null,
			origin_id: event.target.elements.namedItem("origin-id").value || null,
			method: event.target.elements.namedItem("payment-method").value || null
		};

		if (payment.method == "Pix") {
			payment.pix_receiver = event.target.elements.namedItem("pix-receiver").value || null;
			payment.pix_key = lib.removeChar(event.target.elements.namedItem("pix-key").value, ['/\./g', '/\ /g']) || null;
		} else if (payment.method == "Transferência bancária") {
			payment.transfer_receiver = event.target.elements.namedItem("transfer-receiver").value || null;
			payment.transfer_register = event.target.elements.namedItem("transfer-register").value || null;
			payment.transfer_bank = event.target.elements.namedItem("transfer-bank").value || null;
			payment.transfer_agency = event.target.elements.namedItem("transfer-agency").value || null;
			payment.transfer_account = event.target.elements.namedItem("transfer-account").value || null;
			payment.transfer_account_type = event.target.elements.namedItem("transfer-account-type").value || null;
		}

		let response = await API.response(OutcomeOriginPayment.create, payment);
		if (!response) { return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("pix-receiver").value = "";
		event.target.elements.namedItem("pix-key").value = "";
		event.target.elements.namedItem("transfer-receiver").value = "";
		event.target.elements.namedItem("transfer-register").value = "";
		event.target.elements.namedItem("transfer-bank").value = "";
		event.target.elements.namedItem("transfer-agency").value = "";
		event.target.elements.namedItem("transfer-account").value = "";
		event.target.elements.namedItem("transfer-account-type").value = "";
		OutcomeOriginPaymentController.filter.submit.click();
	});
}

OutcomeOriginPaymentController.filter = document.getElementById("origin-payment-filter-form");
if (OutcomeOriginPaymentController.filter) {
	OutcomeOriginPaymentController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let payment = {
			origin_id: event.target.elements.namedItem("origin-id").value
		};

		let payments = await API.response(OutcomeOriginPayment.filter, payment);
		if (!payments) { return false };

		const pagination = { pageSize: 9, page: 0 };
		(function () { lib.carousel.execute("origin-payment-filter-box", OutcomeOriginPaymentView.filter, payments, pagination); }());
	});
}

OutcomeOriginPaymentController.show = async (id) => {
	let payment = await API.response(OutcomeOriginPayment.findById, id);
	if (!payment) { return false };

	document.getElementById("origin-payment-filter-box").style.display = "none";

	OutcomeOriginPaymentView.show(payment);
};

OutcomeOriginPaymentController.edit = async (id) => {
	let payment = await API.response(OutcomeOriginPayment.findById, id);
	if (!payment) { return false };

	document.getElementById("origin-payment-create-form").style.display = "";
	document.getElementById("origin-payment-create-form").elements.namedItem("id").value = payment.id;
	document.getElementById("origin-payment-create-form").elements.namedItem("origin-id").value = payment.origin_id;
	document.getElementById("origin-payment-create-form").elements.namedItem("payment-method").value = payment.method;

	lib.eventEmmiter(document.getElementById("origin-payment-create-form").elements.namedItem("payment-method"), "change");

	if (payment.method == "Pix") {
		document.getElementById("origin-payment-create-form").elements.namedItem("payment-method").value = payment.method;
		document.getElementById("origin-payment-create-form").elements.namedItem("pix-receiver").value = payment.pix_receiver;
		document.getElementById("origin-payment-create-form").elements.namedItem("pix-key").value = payment.pix_key;

		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-receiver").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-register").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-bank").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-agency").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account-type").value = "";
	} else if (payment.method == "Transferência bancária") {
		document.getElementById("origin-payment-create-form").elements.namedItem("payment-method").value = payment.method;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-receiver").value = payment.transfer_receiver;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-register").value = payment.transfer_register;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-bank").value = payment.transfer_bank;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-agency").value = payment.transfer_agency;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account").value = payment.transfer_account;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account-type").value = payment.transfer_account_type;

		document.getElementById("origin-payment-create-form").elements.namedItem("pix-receiver").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("pix-key").value = "";
	}
};

OutcomeOriginPaymentController.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o pagamento?');
	if (r) {
		if (!await API.response(OutcomeOriginPayment.delete, id)) { return false };

		OutcomeOriginPaymentController.filter.submit.click();
	};
};