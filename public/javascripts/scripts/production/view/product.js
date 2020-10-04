// External product view
Product.view = {
	fillSelect: (products, select) => {
		select.innerHTML = "";
		if(products.length){
			for(i in products){
				select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
			};
		} else {
			select.innerHTML += "<option value=''>Sem resultados</option>"
		};
	}
};

// Production product view
Production.product.view = {};

Production.product.view.kart = {
	list: async (products) => {
		if(products.length){
			var html = "";
			html += "<tr>";
			html += "<td>Código</td>";
			html += "<td>Nome</td>";
			html += "<td>Cor</td>";
			html += "<td>Tamanho</td>";
			html += "<td>Qtd</td>";
			html += "</tr>";
			for(i in products){
				html += "<tr>";
				html += "<td class='nowrap'>"+products[i].code+"</td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td class='nowrap'>"+products[i].amount+"</td>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Production.product.controller.kart.remove("+products[i].id+")'>Rem</a></td>";
				html += "</tr>";
			};

			document.getElementById("production-product-kart-table").innerHTML = html;
		} else {
			document.getElementById("production-product-kart-table").innerHTML = "";
		};
	}
};