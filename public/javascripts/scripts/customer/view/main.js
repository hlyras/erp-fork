Customer.view = {};

Customer.view.filter = (customers, pagination) => {
	if(customers.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < customers.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			if(customers[i].person_type == "legal-entity"){
				html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
					html += "<div class='mobile-box b9 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Customer.controller.show("+customers[i].id+")'>"+customers[i].id+"</div>";
					html += "<div class='mobile-box b4-9 padding-5 v-center'>";
						html += "<div class='mobile-box b1 em07 bold v-center'>Nome:</div>";
						html += "<div class='mobile-box b1 v-center'>"+customers[i].name+"</div>";
					html += "</div>";
					html += "<div class='mobile-box b4-9 padding-5 v-center'>";
						html += "<div class='mobile-box b1 em07 bold v-center'>Nome fantasia:</div>";
						html += "<div class='mobile-box b1 v-center'>"+customers[i].brand+"</div>";
					html += "</div>";
					html += "<div class='mobile-box b4-10 padding-5 v-center'>";
						html += "<div class='mobile-box b1 em07 bold v-center'>Razão social:</div>";
						html += "<div class='mobile-box b1 margin-top-5 v-center'>"+customers[i].trademark+"</div>";
					html += "</div>";
					html += "<div class='mobile-box b4-10 padding-5 v-center'>";
						html += "<div class='mobile-box b1 em07 bold v-center'>CNPJ:</div>";
						html += "<div class='mobile-box b1 margin-top-5 v-center'>"+customers[i].cnpj+"</div>";
					html += "</div>";
					html += "<div class='mobile-box b10 padding-5 margin-top-5 center'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Customer.controller.edit("+customers[i].id+")'></div>";
					html += "<div class='mobile-box b10 padding-5 margin-top-5 center'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Customer.controller.delete("+customers[i].id+")'></div>";
				html += "</div>";
			} else if(customers[i].person_type == "natural-person"){
				html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
				html += "<div class='mobile-box b10 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Customer.controller.show("+customers[i].id+")'>"+customers[i].id+"</div>";
				html += "<div class='mobile-box b4-10 padding-5 v-center'>";
					html += "<div class='mobile-box b1 em07 bold v-center'>Nome:</div>";
					html += "<div class='mobile-box b1 v-center'>"+customers[i].name+"</div>";
				html += "</div>";
				html += "<div class='mobile-box b3-10 padding-5 v-center'>";
						html += "<div class='mobile-box b1 em07 bold v-center'>CPF:</div>";
						html += "<div class='mobile-box b1 v-center'>"+customers[i].cpf+"</div>";
					html += "</div>";
				html += "<div class='mobile-box b10 padding-5 margin-top-5 center'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Customer.controller.edit("+customers[i].id+")'></div>";
				html += "<div class='mobile-box b10 padding-5 margin-top-5 center'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Customer.controller.delete("+customers[i].id+")'></div>";
				html += "</div>";
			};
		};
		document.getElementById("customer-filter-div").innerHTML = html;
		document.getElementById("customer-filter-box").style.display = "";
	} else {
		document.getElementById("customer-filter-div").innerHTML = "Sem resultados";
		document.getElementById("customer-filter-box").style.display = "";
	};
};

Customer.view.show = (customer, box) => {
	let html = "";
	if(customer.person_type == "legal-entity"){
		html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
			html += "<h1 class='mobile-box b2 box-border center padding-5 margin-top-5'>"+customer.rank.name+"</h1>";
			html += "<img class='size-100' src='"+customer.rank.image+"'>";
			html += "<div class='box b1 container box-border padding-5 margin-top-5'>";
			for(let i in customer.rank.benefits){
				html += "<div class='mobile-box b6 box-border center padding-5 margin-top-5'>"+customer.rank.benefits[i].description+"</div>";
			};
			html += "</div>";
		html += "</div>";

		html += "<div class='box b3 container border-explicit padding-5 margin-top-5'>";
			html += "<div class='box b1 underline center'>Dados do cliente</div>";
			html += "<div class='box b1 container box-border padding-5 margin-top-5'>";
				html += "<h5 class='mobile-box b6 box-border center padding-5 margin-top-5'>"+customer.id+"</h5>";
				html += "<h4 class='mobile-box b5-6 center padding-5 margin-top-5'>"+customer.name+"</h4>";
				html += "<h5 class='mobile-box b4 center padding-5'>CPF:</h5>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.cpf+"</h4>";
			html += "</div>";
		html += "</div>";

		html += "<div class='box b3 container border-explicit padding-5 margin-top-5'>";
			html += "<div class='box b1 underline center'>Dados da empresa</div>";
			html += "<div class='box b1 container box-border padding-5 margin-top-5'>";
				html += "<h6 class='mobile-box b4 center padding-5'>CNPJ: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.cnpj+"</h4>";
				html += "<h6 class='mobile-box b4 center padding-5'>Nome fantasia: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.brand+"</h4>";
				html += "<h6 class='mobile-box b4 center padding-5'>Razão social: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.trademark+"</h4>";
				html += "<h6 class='mobile-box b4 center padding-5'>IE: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.ie+"</h4>";
			html += "</div>";
		html += "</div>";

		html += "<div class='box b3 container border-explicit padding-5 margin-top-5'>";
			html += "<div class='box b1 underline center'>Dados de contato</div>";
			html += "<div class='box b1 container box-border padding-5 margin-top-5'>";
				html += "<h6 class='mobile-box b4 center padding-5'>E-mail: </h6>";
				html += "<h5 class='mobile-box b3-4 center padding-5'>"+customer.email+"</h5>";
				html += "<h6 class='mobile-box b4 center padding-5'>Telefone: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.phone+"</h4>";
				html += "<h6 class='mobile-box b4 center padding-5'>Celular: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.cellphone+"</h4>";
				if(customer.social_media){
					html += "<h6 class='mobile-box b4 center padding-5'>Rede Social: </h6>";
					html += "<h5 class='mobile-box b3-4 center padding-5'><a onclick=lib.openExternalLink('"+customer.social_media+"') rel='noopener noreferrer'>"+customer.social_media+"</a></h5>";
				};
			html += "</div>";
		html += "</div>";
	};

	if(customer.person_type=="natural-person"){
		html += "<div class='box b2 container box-border padding-5 margin-top-5'>";
			html += "<div class='box b1 underline center bold'>Dados do cliente</div>";
			html += "<div class='box b1 container box-border padding-5 margin-top-5'>";
				html += "<h5 class='mobile-box b6 box-border center padding-5 margin-top-5'>"+customer.id+"</h5>";
				html += "<h4 class='mobile-box b5-6 center padding-5 margin-top-5'>"+customer.name+"</h4>";
				html += "<h5 class='mobile-box b4 center padding-5'>CPF:</h5>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.cpf+"</h4>";
			html += "</div>";
		html += "</div>";

		html += "<div class='box b2 container box-border padding-5 margin-top-5'>";
			html += "<div class='box b1 underline center'>Dados de contato</div>";
			html += "<div class='box b1 container box-border padding-5 margin-top-5'>";
				html += "<h6 class='mobile-box b4 center padding-5'>E-mail: </h6>";
				html += "<h5 class='mobile-box b3-4 center padding-5'>"+customer.email+"</h5>";
				html += "<h6 class='mobile-box b4 center padding-5'>Telefone: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.phone+"</h4>";
				html += "<h6 class='mobile-box b4 center padding-5'>Celular: </h6>";
				html += "<h4 class='mobile-box b3-4 center padding-5'>"+customer.cellphone+"</h4>";
				if(customer.social_media){
					html += "<h6 class='mobile-box b4 center padding-5'>Rede Social: </h6>";
					html += "<h5 class='mobile-box b3-4 center padding-5'><a href='"+customer.social_media+"' target='_blank' rel='noopener noreferrer'>"+customer.social_media+"</a></h5>";
				};
			html += "</div>";
		html += "</div>";
	};

	if(customer.address.length){
		for(i in customer.address){
			html += "<div class='box b1 container padding-10 margin-top-10 border-explicit'>";
				html += "<div class='mobile-box b3'></div>";
				html += "<div class='mobile-box b3 underline center bold'>Endereço "+(parseInt(i)+1)+"</div>";
				html += "<div class='mobile-box b3 container center bold'>";
					html += "<h5 class='mobile-box b3'></h5>";
					html += "<h5 class='mobile-box b3 center bold'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Customer.controller.address.edit("+customer.address[i].id+")'></h5>";
					html += "<h5 class='mobile-box b3 center bold'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Customer.controller.address.delete("+customer.address[i].id+", "+customer.id+")'></h5>";
				html += "</div>";
				html += "<div class='box b3 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>Logradouro:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].street+"</div></div>";
				html += "<div class='box b3 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>nº:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].number+"</div></div>";
				html += "<div class='box b3 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>Complemento:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].complement+"</div></div>";
				html += "<div class='box b3 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>Bairro:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].neighborhood+"</div></div>";
				html += "<div class='box b3 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>Cidade:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].city+"</div></div>";
				html += "<div class='box b6 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>Estado:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].state+"</div></div>";
				html += "<div class='box b6 container center box-border padding-5 margin-top-5'><div class='mobile-box b3'>CEP:</div><div class='mobile-box two-thirds center bold'>"+customer.address[i].postal_code+"</div></div>";
			html += "</div>";
		};
	};

	document.getElementById("customer-address-create-form").elements.namedItem("customer_id").value = customer.id;

	document.getElementById(box).innerHTML = html;
};