Customer.view = {};

Customer.view.filter = (customers, pagination) => {
	if(customers.length){
		let html = "<tr>";
		html += "<td>Id</td>";
		html += "<td>Nome</td>";
		html += "<td>Marca</td>";
		html += "<td>Razão Social</td>";
		html += "</tr>";
		for (let i = pagination.page * pagination.pageSize; i < customers.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<tr>";
			html += "<td><h3 class='tbl-show-link nowrap' onclick='Customer.controller.show("+customers[i].id+")'>"+customers[i].id+"</h3></td>";
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

	console.log(customer);

	if(customer.person_type == "legal-entity"){
		html += "<div class='box three container box-border padding-5 margin-top-5'>";
			html += "<div class='box one underline center'>Dados do cliente</div>";
			html += "<div class='box one container box-border padding-5 margin-top-5'>";
				html += "<h5 class='mobile-box six box-border center padding-5 margin-top-5'>"+customer.id+"</h5>";
				html += "<h4 class='mobile-box five-sixths center padding-5 margin-top-5'>"+customer.name+"</h4>";
				html += "<h5 class='mobile-box four center padding-5'>CPF:</h5>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.cpf+"</h4>";
			html += "</div>";
		html += "</div>";

		html += "<div class='box three container box-border padding-5 margin-top-5'>";
			html += "<div class='box one underline center'>Dados da empresa</div>";
			html += "<div class='box one container box-border padding-5 margin-top-5'>";
				html += "<h6 class='mobile-box four center padding-5'>CNPJ: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.cnpj+"</h4>";
				html += "<h6 class='mobile-box four center padding-5'>Nome fantasia: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.brand+"</h4>";
				html += "<h6 class='mobile-box four center padding-5'>Razão social: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.trademark+"</h4>";
				html += "<h6 class='mobile-box four center padding-5'>IE: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.ie+"</h4>";
			html += "</div>";
		html += "</div>";

		html += "<div class='box three container box-border padding-5 margin-top-5'>";
			html += "<div class='box one underline center'>Dados de contato</div>";
			html += "<div class='box one container box-border padding-5 margin-top-5'>";
				html += "<h6 class='mobile-box four center padding-5'>E-mail: </h6>";
				html += "<h5 class='mobile-box three-fourths center padding-5'>"+customer.email+"</h5>";
				html += "<h6 class='mobile-box four center padding-5'>Telefone: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.phone+"</h4>";
				html += "<h6 class='mobile-box four center padding-5'>Celular: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.cellphone+"</h4>";
				if(customer.social_media){
					html += "<h6 class='mobile-box four center padding-5'>Rede Social: </h6>";
					html += "<h5 class='mobile-box three-fourths center padding-5'><a href='"+customer.social_media+"' target='_blank' rel='noopener noreferrer'>"+customer.social_media+"</a></h5>";
				};
			html += "</div>";
		html += "</div>";
	};

	if(customer.person_type=="natural-person"){
		html += "<div class='box two container box-border padding-5 margin-top-5'>";
			html += "<div class='box one underline center bold'>Dados do cliente</div>";
			html += "<div class='box one container box-border padding-5 margin-top-5'>";
				html += "<h5 class='mobile-box six box-border center padding-5 margin-top-5'>"+customer.id+"</h5>";
				html += "<h4 class='mobile-box five-sixths center padding-5 margin-top-5'>"+customer.name+"</h4>";
				html += "<h5 class='mobile-box four center padding-5'>CPF:</h5>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.cpf+"</h4>";
			html += "</div>";
		html += "</div>";

		html += "<div class='box two container box-border padding-5 margin-top-5'>";
			html += "<div class='box one underline center'>Dados de contato</div>";
			html += "<div class='box one container box-border padding-5 margin-top-5'>";
				html += "<h6 class='mobile-box four center padding-5'>E-mail: </h6>";
				html += "<h5 class='mobile-box three-fourths center padding-5'>"+customer.email+"</h5>";
				html += "<h6 class='mobile-box four center padding-5'>Telefone: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.phone+"</h4>";
				html += "<h6 class='mobile-box four center padding-5'>Celular: </h6>";
				html += "<h4 class='mobile-box three-fourths center padding-5'>"+customer.cellphone+"</h4>";
				if(customer.social_media){
					html += "<h6 class='mobile-box four center padding-5'>Rede Social: </h6>";
					html += "<h5 class='mobile-box three-fourths center padding-5'><a href='"+customer.social_media+"' target='_blank' rel='noopener noreferrer'>"+customer.social_media+"</a></h5>";
				};
			html += "</div>";
		html += "</div>";
	};

	document.getElementById(box).innerHTML = html;
};