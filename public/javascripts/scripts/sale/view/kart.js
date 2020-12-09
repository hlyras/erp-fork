// Sale product view
Sale.product.view = {};

Sale.product.view.kart = {
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
				html += "<td><a class='tbl-show-link nowrap' onclick='Sale.controller.product.kart.remove("+products[i].id+")'>Rem</a></td>";
				html += "</tr>";
			};

			document.getElementById("sale-product-kart-table").innerHTML = html;
		} else {
			document.getElementById("sale-product-kart-table").innerHTML = "";
		};
	}
};