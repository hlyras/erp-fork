Sale.view.customer = {};

Sale.view.customer.fillInput = (customers) => {
	let html = "";
	html += "<option value='' disabled selected>Selecionar cliente</option>";
	for(i in customers){
		if(customers[i].name){
			html += "<option value='"+customers[i].id+"'>"+customers[i].name+" | "+customers[i].cnpj+"</option>";
		} else if(customers[i].brand && !customers[i].name){
			html += "<option value='"+customers[i].id+"'>"+customers[i].brand+" | "+customers[i].cnpj+"</option>";
		} else if(customers[i].trademark && !customers[i].name && !customers[i].brand){
			html += "<option value='"+customers[i].id+"'>"+customers[i].trademark+" | "+customers[i].cnpj+"</option>";
		};
	};
	document.getElementById("sale-customer").innerHTML = html;
};

Sale.view.customer.dropdown = {
	render: (customers, input_id, dropdown_id) => {
		let html = "";
		for(i in customers){
			if(customers[i].person_type == "legal-entity"){
				html += "<li><input type='button' class='box b1 dropdown-input' data-id='"+customers[i].id+"' data-person_type='"+customers[i].person_type+"' value='"+customers[i].name+" | "+customers[i].trademark+" | "+customers[i].brand+" | "+customers[i].cnpj+"' onclick='Sale.view.customer.dropdown.fill.input(this, `"+input_id+"`, `"+dropdown_id+"`)'></li>";
			} else if (customers[i].person_type == "natural-person"){
				html += "<li><input type='button' class='box b1 dropdown-input' data-id='"+customers[i].id+"' data-person_type='"+customers[i].person_type+"' value='"+customers[i].name+" | "+customers[i].cpf+"' onclick='Sale.view.customer.dropdown.fill.input(this, `"+input_id+"`, `"+dropdown_id+"`)'></li>";
			};
		};

		document.getElementById(dropdown_id).innerHTML = html;
	},
	fill: {
		input: async (dropdown_input, input_id, dropdown_id) => {
			document.getElementById(input_id).dataset.id = dropdown_input.dataset.id;
			document.getElementById(input_id).dataset.person_type = dropdown_input.dataset.person_type;
			document.getElementById(input_id).value = dropdown_input.value;
			document.getElementById(input_id).readOnly = true;

			document.getElementById(dropdown_id).innerHTML = "";

			let addresses = await API.response(Customer.address.findByCustomerId, dropdown_input.dataset.id);
			if(!addresses){ return false };

			Sale.view.customer.address.list(addresses);
			
			let properties = {
				 id: document.getElementById(input_id).dataset.id,
				 person_type: document.getElementById(input_id).dataset.person_type,
				 value: document.getElementById(input_id).value,
				 readOnly: document.getElementById(input_id).readOnly,
				 addresses: addresses
			};
			
			let stringified_properties = JSON.stringify(properties);
			lib.localStorage.update(input_id, stringified_properties);
		}
	}
};

Sale.view.customer.address = {};

Sale.view.customer.address.list = (addresses, customer_address_id) => {
	let html = "";
	html += "<div class='box b1 container border padding-5 margin-top-5'>";
		if(customer_address_id === 0){
			html += "<input type='radio' id='sale-customer-address' name='sale-customer-address' class='mobile-box four center' value='0' checked>";
		} else {
			html += "<input type='radio' id='sale-customer-address' name='sale-customer-address' class='mobile-box four center' value='0'>";
		};
		html += "<div class='mobile-box b3-4 center'>Agendar retirada em Loja</div>";
	html += "</div>";
	if(addresses.length){
		for(let i in addresses){
			html += "<div class='box b1 container border padding-5 margin-top-5'>";
			if(addresses[i].checked){ html += "<input type='radio' id='sale-customer-address' name='sale-customer-address' class='mobile-box four center' value='"+addresses[i].id+"' checked>"; };
			if(!addresses[i].checked){ html += "<input type='radio' id='sale-customer-address' name='sale-customer-address' class='mobile-box four center' value='"+addresses[i].id+"'>"; };
			html += "<div class='mobile-box b3-4 margin-top-5 center'>"+addresses[i].postal_code+"</div>";
			html += "<div class='mobile-box b2-5 margin-top-5 center'>"+addresses[i].street+"</div>";
			html += "<div class='mobile-box b5 margin-top-5 center'>"+addresses[i].number+"</div>";
			html += "<div class='mobile-box b2-5 margin-top-5 center'>"+addresses[i].complement+"</div>";
			html += "<div class='mobile-box b2-5 margin-top-5 center'>"+addresses[i].neighborhood+"</div>";
			html += "<div class='mobile-box b2-5 margin-top-5 center'>"+addresses[i].city+"</div>";
			html += "<div class='mobile-box b5 margin-top-5 center'>"+addresses[i].state+"</div>";
			html += "</div>";
		};
	} else {
		html += "<div class='mobile-box b1 border center padding-5 margin-top-5'>Sem endereços cadastrados</div>"
	};

	document.getElementById("sale-customer-address-box").innerHTML = html;
};