Customer.view = {};

Customer.view.filter = (customers, pagination) => {
	if(customers.length){
		let html = "<tr>";
		html += "<td>CNPJ</td>";
		html += "<td>Nome</td>";
		html += "<td>Marca</td>";
		html += "<td>Razão Social</td>";
		html += "</tr>";
		for (let i = pagination.page * pagination.pageSize; i < customers.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<tr>";
			html += "<td><h3 class='tbl-show-link nowrap' onclick='Customer.controller.show("+customers[i].id+")'>"+customers[i].cnpj+"</h3></td>";
			html += "<td>"+customers[i].name+"</td>";
			html += "<td>"+customers[i].brand+"</td>";
			html += "<td>"+customers[i].trademark+"</td>";
			html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Customer.controller.edit("+customers[i].id+")'></td>";
			html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Customer.controller.delete("+customers[i].id+")'></td>";
			html += "</tr>";
		};
		document.getElementById("customer-filter-table").innerHTML = html;
		document.getElementById("customer-filter-box").style.display = "";
	} else {
		document.getElementById("customer-filter-table").innerHTML = "Sem resultados";
		document.getElementById("customer-filter-box").style.display = "";
	};
};

Customer.view.show = (customer, box) => {
	let html = "";
	html += "<h4 class='box one center padding-5'>Dados do cliente</h4>";
	html += "<h5 class='box four padding-5'>Nome"+customer.name+"</h5>";
	html += "<h5 class='box four padding-5'>Razão Social: "+customer.trademark+"</h5>";
	html += "<h5 class='box four padding-5'>Nome Fantasia: "+customer.brand+"</h5>";
	html += "<h5 class='box four padding-5'>CNPJ: "+customer.cnpj+"</h5>";
	html += "<h5 class='box four padding-5'>Inscrição estadual: "+customer.ie+"</h5>";
	html += "<h5 class='box four padding-5'>E-mail: "+customer.email+"</h5>";
	html += "<h5 class='box four padding-5'>Telefone: "+customer.phone+"</h5>";
	html += "<h5 class='box four padding-5'>Celular: "+customer.cellphone+"</h5>";

	document.getElementById(box).innerHTML = html;
};