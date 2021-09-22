Product.view = {
	info: (product, title, table) => {
		let html = "";
		html += "#"+ product.code +" - "+ product.code;

		document.getElementById(title).innerHTML = html;

		html = "<tr class='bold'>";
		html += "<td>Cód</td>";
		html += "<td>Tamanho</td>";
		html += "<td>Cor</td>";
		html += "</tr>";

		html += "<tr>";
		html += "<td class='nowrap'>"+product.code+"</td>";
		html += "<td>"+product.size+"</td>";
		html += "<td>"+product.color+"</td>";
		html += "</tr>";

		document.getElementById(table).innerHTML = html;
	},
	filter: (products, pagination) => {
		if(products.length){
			let html = "<tr>";
			html += "<td>Cód</td>";
			html += "<td>Nome</td>";
			html += "<td>Tamanho</td>";
			html += "<td>Cor</td>";
			html += "</tr>";

			for(let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
				html += "<tr>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.controller.manage.show("+products[i].id+")'>"+products[i].code+"</a></td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "</tr>";
			};
			document.getElementById("product-manage-filter-table").innerHTML = html;
			document.getElementById("product-manage-filter-box").style.display = "block";
		} else {
			document.getElementById("product-manage-filter-table").innerHTML = "Sem resultados";
			document.getElementById("product-manage-filter-box").style.display = "block";
		};
	},
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