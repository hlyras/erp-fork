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

Sale.view.customer.filter = {
	input: (customers, dropdown) => {
		let html = "";
		for(i in customers){
			if(customers[i].person_type == "legal-entity"){
				html += "<li><input type='button' class='box one dropdown-input' data-id='"+customers[i].id+"' value='"+customers[i].name+" | "+customers[i].trademark+" | "+customers[i].brand+" | "+customers[i].cnpj+"' onclick='Customer.controller.filter.inputFill(this)'></li>";
			} else if (customers[i].person_type == "natural-person"){
				html += "<li><input type='button' class='box one dropdown-input' data-id='"+customers[i].id+"' value='"+customers[i].name+" | "+customers[i].cpf+"' onclick='Customer.controller.filter.inputFill(this)'></li>";
			};
		};

		document.getElementById(dropdown).innerHTML = html;
	}
};