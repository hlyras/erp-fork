Prospect.view = {};

Prospect.view.status1 = (prospect, status_div) => {
	let div_prospect = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 radius-5 border-st-2", style: "background-color:#f0f0f0;" });
	div_prospect.appendChild(lib.element.icon('b8', 20, "/images/icon/down-arrow.png", "lib.displayDiv('prospect-form-"+prospect.id+"', this, '/images/icon/down-arrow.png', '/images/icon/up-arrow.png');"));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b3-4 lucida-grande padding-3 radius-5 center" }, prospect.brand));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b8 em08 lucida-grande radius-5 center" }, prospect.state));
	div_prospect.appendChild(lib.element.info("b7-8 em09 lucida-grande radius-5", "Telefone:", prospect.phone))
	prospect.social_media && div_prospect.appendChild(lib.element.icon('b8 radius-5', 20, "/images/icon/social-media.png", `lib.openExternalLink('${prospect.social_media}')`));
	prospect.product_approach && div_prospect.appendChild(lib.element.info("b1 em09 lucida-grande margin-top-5 radius-5", "Produto de abordagem:", prospect.product_approach))
	
	let form_prospect = lib.element.create("div", {
		id: `prospect-form-${prospect.id}`, 
		class: "box b1 container margin-top-5",
		style: "display:none;"
	});

	form_prospect.appendChild(lib.element.create("input", { type: "text", name: "manager", class: "box b1 em08 input-generic radius-5 center", placeholder: "Nome do Responsável", autocomplete: "nope" }));
	form_prospect.appendChild(lib.element.create("input", { type: "text", name: "mail", class: "box b1 em08 input-generic margin-top-5 radius-5 center", placeholder: "Email", autocomplete: "nope" }));
	form_prospect.appendChild(lib.element.create("input", { type: "text", name: "cellphone", class: "box b1 em08 input-generic margin-top-5 radius-5 center", placeholder: "WhatsApp do Responsável", autocomplete: "nope" }));
	form_prospect.appendChild(lib.element.create("textarea", { name: "comment", class: "box b1 height-80 avant-garde margin-top-5 padding-5 radius-5", placeholder: "Observações do contato" }));

	let status_select = lib.element.create("select", { type: "text", name: "status", class: "mobile-box b5-6 em08 input-generic margin-top-5 radius-5 center" }); 
	status_select.appendChild(lib.element.create("option", { value: "" }, "Status"));
	status_select.appendChild(lib.element.create("option", { value: "Contatar loja novamente" }, "Contatar loja novamente"));
	status_select.appendChild(lib.element.create("option", { value: "Contato com responsável" }, "Contatar responsável"));
	status_select.appendChild(lib.element.create("option", { value: "Lista de transmissão" }, "Enviar para Lista de transmissão"));

	form_prospect.appendChild(status_select);
	
	form_prospect.appendChild(lib.element.icon('b6', 25, "/images/icon/confirm.png", `Prospect.controller.confirmContact1(${prospect.id})`));

	div_prospect.appendChild(form_prospect);
	status_div.appendChild(div_prospect);
};

Prospect.view.status2 = (prospect, status_div) => {
	let div_prospect = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 radius-5 border-st-2", style: "background-color:#f0f0f0;" });
	div_prospect.appendChild(lib.element.icon('b8', 20, "/images/icon/down-arrow.png", "lib.displayDiv('prospect-form-"+prospect.id+"', this, '/images/icon/down-arrow.png', '/images/icon/up-arrow.png');"));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b3-4 lucida-grande padding-3 radius-5 center" }, prospect.brand));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b8 em08 lucida-grande radius-5 center" }, prospect.state));
	div_prospect.appendChild(lib.element.info("b7-8 em09 lucida-grande radius-5", "Telefone:", prospect.phone))
	prospect.social_media && div_prospect.appendChild(lib.element.icon('b8 radius-5', 20, "/images/icon/social-media.png", `lib.openExternalLink('${prospect.social_media}')`));
	prospect.product_approach && div_prospect.appendChild(lib.element.info("b1 em09 lucida-grande margin-top-5 radius-5", "Produto de abordagem:", prospect.product_approach))

	let form_prospect = lib.element.create("div", {
		id: `prospect-form-${prospect.id}`, 
		class: "box b1 container",
		style: "display:none;"
	});

	for(let i in prospect.comments){
		let div_comments = lib.element.create("div", { type: "text", class: "box b1 container padding-3 margin-top-5 radius-5 box-hover border" });
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em07 lucida-grande" }, prospect.comments[i].fromstatus +" > "+ prospect.comments[i].tostatus));
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em07 lucida-grande" }, lib.convertDatetime(lib.timestampToDatetime(prospect.comments[i].datetime))));
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em09 lucida-grande" }, prospect.comments[i].comment));
		form_prospect.appendChild(div_comments);
	};

	// `Email enviado ${lib.convertDatetime(lib.timestampToDatetime(prospect.mailer))}`

	form_prospect.appendChild(lib.element.create("input", { type: "text", name: "manager", class: "box b1 em08 input-generic margin-top-5 radius-5 center", placeholder: "Nome do Responsável", autocomplete: "nope", value: prospect.manager || "" }));
	!prospect.mailer && form_prospect.appendChild(lib.element.create("input", { type: "text", name: "mail", class: "box b7-8 em08 input-generic margin-top-5 radius-5 center", placeholder: "Email", autocomplete: "nope", value: prospect.email || "" }));
	!prospect.mailer && form_prospect.appendChild(lib.element.icon('b8', 20, "/images/icon/sendmail.png", `Prospect.controller.sendMail(${prospect.id}, this)`));
	prospect.mailer && form_prospect.appendChild(lib.element.create("input", { type: "text", name: "mail", class: "box b1 em08 input-generic margin-top-5 radius-5 center", placeholder: "Email", autocomplete: "nope", disabled: 'on', value: prospect.email || "" }));
	prospect.mailer && form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "E-mail enviado:", `${lib.convertDatetime(lib.timestampToDatetime(prospect.mailer))}`));
	form_prospect.appendChild(lib.element.create("input", { type: "text", name: "cellphone", class: "box b1 em08 input-generic margin-top-5 radius-5 center", placeholder: "WhatsApp do Responsável", autocomplete: "nope", value: prospect.cellphone || "" }));
	form_prospect.appendChild(lib.element.create("textarea", { name: "comment", class: "box b1 height-80 avant-garde margin-top-5 padding-5 radius-5", placeholder: "Observações do contato" }));

	let status_select = lib.element.create("select", { type: "text", name: "status", class: "mobile-box b5-6 em08 input-generic margin-top-5 radius-5 center" }); 
	status_select.appendChild(lib.element.create("option", { value: "" }, "Status"));
	status_select.appendChild(lib.element.create("option", { value: "Contatar loja novamente" }, "Contatar loja novamente"));
	status_select.appendChild(lib.element.create("option", { value: "Contato com responsável" }, "Contatar responsável"));
	status_select.appendChild(lib.element.create("option", { value: "Lista de transmissão" }, "Enviar para Lista de transmissão"));

	form_prospect.appendChild(status_select);
	
	form_prospect.appendChild(lib.element.icon('b6', 25, "/images/icon/confirm.png", `Prospect.controller.confirmContact2(${prospect.id})`));

	div_prospect.appendChild(form_prospect);
	status_div.appendChild(div_prospect);
};

Prospect.view.status3 = (prospect, status_div) => {
	let div_prospect = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 radius-5 border-st-2", style: "background-color:#f0f0f0;" });
	div_prospect.appendChild(lib.element.icon('b8', 20, "/images/icon/down-arrow.png", "lib.displayDiv('prospect-form-"+prospect.id+"', this, '/images/icon/down-arrow.png', '/images/icon/up-arrow.png');"));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b3-4 lucida-grande padding-3 radius-5 center" }, prospect.brand));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b8 em08 lucida-grande radius-5 center" }, prospect.state));
	div_prospect.appendChild(lib.element.info("b7-8 em09 lucida-grande radius-5", "Telefone:", prospect.phone))
	prospect.social_media && div_prospect.appendChild(lib.element.icon('b8 radius-5', 20, "/images/icon/social-media.png", `lib.openExternalLink('${prospect.social_media}')`));
	prospect.product_approach && div_prospect.appendChild(lib.element.info("b1 em09 lucida-grande margin-top-5 radius-5", "Produto de abordagem:", prospect.product_approach))

	let form_prospect = lib.element.create("div", {
		id: `prospect-form-${prospect.id}`, 
		class: "box b1 container",
		style: "display:none;"
	});

	form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "Responsável", prospect.manager));
	!prospect.mailer && form_prospect.appendChild(lib.element.info("b7-8 em09 lucida-grande radius-5", "E-mail", prospect.email));
	!prospect.mailer && form_prospect.appendChild(lib.element.icon('b8', 20, "/images/icon/sendmail.png", `Prospect.controller.sendMail(${prospect.id}, this)`));
	prospect.mailer && form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "E-mail", prospect.email));
	prospect.mailer && form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "E-mail enviado:", `${lib.convertDatetime(lib.timestampToDatetime(prospect.mailer))}`));
	form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "WhatsApp", prospect.cellphone));

	for(let i in prospect.comments){
		let div_comments = lib.element.create("div", { type: "text", class: "box b1 container padding-3 margin-top-5 radius-5 box-hover border" });
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em07 lucida-grande" }, prospect.comments[i].fromstatus +" > "+ prospect.comments[i].tostatus));
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em07 lucida-grande" }, lib.convertDatetime(lib.timestampToDatetime(prospect.comments[i].datetime))));
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em09 lucida-grande" }, prospect.comments[i].comment));
		form_prospect.appendChild(div_comments);
	};

	form_prospect.appendChild(lib.element.create("textarea", { name: "comment", class: "box b1 height-80 avant-garde margin-top-5 padding-5 radius-5", placeholder: "Observações do contato" }));

	let status_select = lib.element.create("select", { type: "text", name: "status", class: "mobile-box b5-6 em08 input-generic margin-top-5 center" }); 
	status_select.appendChild(lib.element.create("option", { value: "" }, "Status"));
	status_select.appendChild(lib.element.create("option", { value: "Contato com responsável" }, "Contatar responsável novamente"));
	status_select.appendChild(lib.element.create("option", { value: "Lista de transmissão" }, "Enviar para Lista de transmissão"));

	form_prospect.appendChild(status_select);
	
	form_prospect.appendChild(lib.element.icon('b6', 25, "/images/icon/confirm.png", `Prospect.controller.confirmContact3(${prospect.id})`));

	div_prospect.appendChild(form_prospect);
	status_div.appendChild(div_prospect);
};

Prospect.view.status4 = (prospect, status_div) => {
	let div_prospect = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 radius-5 border-st-2", style: "background-color:#f0f0f0;" });
	div_prospect.appendChild(lib.element.icon('b8', 20, "/images/icon/down-arrow.png", "lib.displayDiv('prospect-form-"+prospect.id+"', this, '/images/icon/down-arrow.png', '/images/icon/up-arrow.png');"));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b3-4 lucida-grande padding-3 radius-5 center" }, prospect.brand));
	div_prospect.appendChild(lib.element.create("div", { class: "mobile-box b8 em08 lucida-grande radius-5 center" }, prospect.state));
	div_prospect.appendChild(lib.element.info("b7-8 em09 lucida-grande radius-5", "Telefone:", prospect.phone))
	prospect.social_media && div_prospect.appendChild(lib.element.icon('b8 radius-5', 20, "/images/icon/social-media.png", `lib.openExternalLink('${prospect.social_media}')`));
	prospect.product_approach && div_prospect.appendChild(lib.element.info("b1 em09 lucida-grande margin-top-5 radius-5", "Produto de abordagem:", prospect.product_approach));

	let form_prospect = lib.element.create("div", {
		id: `prospect-form-${prospect.id}`, 
		class: "box b1 container",
		style: "display:none;"
	});

	form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "Responsável", prospect.manager));
	form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "E-mail", prospect.email));
	form_prospect.appendChild(lib.element.info("b1 em09 lucida-grande radius-5", "WhatsApp", prospect.cellphone));

	for(let i in prospect.comments){
		let div_comments = lib.element.create("div", { type: "text", class: "box b1 container padding-3 margin-top-5 radius-5 box-hover border" });
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em07 lucida-grande" }, prospect.comments[i].fromstatus +" > "+ prospect.comments[i].tostatus));
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em07 lucida-grande" }, lib.convertDatetime(lib.timestampToDatetime(prospect.comments[i].datetime))));
		div_comments.appendChild(lib.element.create("div", { class: "box b1 em09 lucida-grande" }, prospect.comments[i].comment));
		form_prospect.appendChild(div_comments);
	};

	div_prospect.appendChild(form_prospect);
	status_div.appendChild(div_prospect);
};

Prospect.view.filter = (prospects, pagination) => {
	let filter_box = document.getElementById("prospect-filter-box");
	let filter_div = document.getElementById("prospect-filter-div");
	filter_div.innerHTML = "";

	filter_div.appendChild(lib.element.create("div", { class: "box b1 em08 bold lucida-grande padding-5 border margin-top-5 center" }, "Leads cadastrados "+ prospects.length ));

	if(prospects.length){
		let status_1_div = lib.element.create("div", { class: "box b4 em09 bold lucida-grande padding-5 border-st margin-top-5 radius-5" });
		status_1_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande underline center" }, "Ag. 1º contato"));
		let status_2_div = lib.element.create("div", { class: "box b4 em09 bold lucida-grande padding-5 border-st margin-top-5 radius-5" });
		status_2_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande underline center" }, "Contatar loja novamente"));
		let status_3_div = lib.element.create("div", { class: "box b4 em09 bold lucida-grande padding-5 border-st margin-top-5 radius-5" });
		status_3_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande underline center" }, "Ag. contato com responsável"));
		let status_4_div = lib.element.create("div", { class: "box b4 em09 bold lucida-grande padding-5 border-st margin-top-5 radius-5" });
		status_4_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande underline center" }, "Lista de transmissão"));

		for(let i in prospects){
			if(prospects[i].status == "1º contato"){
				Prospect.view.status1(prospects[i], status_1_div);
			} else if(prospects[i].status == "Contatar loja novamente") {
				Prospect.view.status2(prospects[i], status_2_div);
			} else if(prospects[i].status == "Contato com responsável") {
				Prospect.view.status3(prospects[i], status_3_div);
			} else if(prospects[i].status == "Lista de transmissão") {
				Prospect.view.status4(prospects[i], status_4_div);
			}
		};

		filter_div.appendChild(status_1_div);
		filter_div.appendChild(status_2_div);
		filter_div.appendChild(status_3_div);
		filter_div.appendChild(status_4_div);
		filter_box.style.display = "";
	} else {
		filter_div.appendChild(lib.element.create("div", { class: "box b1 bold lucida-grande center padding-10 margin-top-5" }, "Sem resultados"));
		filter_box.style.display = "";
	};
};