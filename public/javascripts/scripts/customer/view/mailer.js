Customer.mailer.view = {};

Customer.mailer.view.filter = (customers, pagination) => {
	let filter_div = document.getElementById("customer-mailer-filter-div");
	filter_div.innerHTML = "";

	if(!customers.length) {
		return filter_div.appendChild(lib.element.create("div", { class: "box b1 center" }, "Não foram encontrados clientes disponíveis" ));
	}


	for (let i = pagination.page * pagination.pageSize; i < customers.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		let customer_div = lib.element.create("div", { class: "box b2 container border-st padding-5 margin-top-5" });
		customer_div.appendChild(lib.element.create("div", { class: "mobile-box b10 lucida-grande bold border center" }, customers[i].id ));
		customer_div.appendChild(lib.element.create("div", { class: "mobile-box b2-5 lucida-grande em09 center" }, customers[i].name ));
		customers[i].cellphone && customer_div.appendChild(lib.element.info("b2-5 lucida-grande radius-5", "WhatsApp:", customers[i].cellphone));
		!customers[i].cellphone && customers[i].phone && customer_div.appendChild(lib.element.info("b2-5 lucida-grande radius-5", "Telefone:", customers[i].phone));
		customers[i].email && customer_div.appendChild(lib.element.icon('b10', 20, "https://spaces.jariomilitar.com/erp-images/icon/sendmail.png", `Customer.mailer.controller.send(${customers[i].id}, this)`));

		filter_div.appendChild(customer_div);
	};
};