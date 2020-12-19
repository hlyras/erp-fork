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
	document.getElementById("sale-customer-select").innerHTML = html;
};