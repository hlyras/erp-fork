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
			html += "<td><h3 class='tbl-show-link nowrap' onclick='Product.controller.manage.show("+customers[i].id+")'>"+customers[i].cnpj+"</h3></td>";
			html += "<td>"+customers[i].name+"</td>";
			html += "<td>"+customers[i].brand+"</td>";
			html += "<td>"+customers[i].trademark+"</td>";
			html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.controller.manage.edit("+customers[i].id+")'></td>";
			html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.controller.manage.delete("+customers[i].id+")'></td>";
			html += "</tr>";
		};
		document.getElementById("customer-filter-table").innerHTML = html;
		document.getElementById("customer-filter-box").style.display = "";
	} else {
		document.getElementById("customer-filter-table").innerHTML = "Sem resultados";
		document.getElementById("customer-filter-box").style.display = "";
	};
};