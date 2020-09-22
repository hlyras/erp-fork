Product.view.manage = {
	info: (product, title, table) => {
		let html = "";
		html += product.name;

		document.getElementById(title).innerHTML = html;

		html = "<tr class='bold'>";
		html += "<td>ID</td>";
		html += "<td>Cód</td>";
		html += "<td>Tamanho</td>";
		html += "<td>Cor</td>";
		html += "</tr>";

		html += "<tr>";
		html += "<td class='nowrap'>"+product.id+"</td>";
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
			html += "<td></td>";
			html += "<td></td>";
			html += "</tr>";
			for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
				html += "<tr>";
				html += "<td><h3 class='tbl-show-link nowrap' onclick='Product.controller.manage.show("+products[i].id+")'>"+products[i].code+"</h3></td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.controller.edit("+products[i].id+")'></td>";
				html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.controller.delete("+products[i].id+")'></td>";
				html += "</tr>";
			};
			document.getElementById("product-manage-filter-table").innerHTML = html;
			document.getElementById("product-manage-filter-box").style.display = "block";
		} else {
			document.getElementById("product-manage-filter-table").innerHTML = "Sem resultados";
			document.getElementById("product-manage-filter-box").style.display = "block";
		};
	},
	menu: (product) => {
		let html = "";
		html += "<h4 class='underline'>MENU PRINCIPAL</h4>";
		html += "<button class='btn-generic-medium' onclick='Product.controller.image.add("+product.id+")'>Adicionar Imagem</button>";
		html += "<button class='btn-generic-medium' onclick='Product.controller.feedstock.form.display("+product.id+");lib.displayDiv(`product-feedstock-add-box`, this, `Adicionar Matéria-Prima`, `Esconder Formulário`);'>Adicionar Matéria-Prima</button>";
		html += "<button class='btn-generic-medium' onclick='Product.controller.feedstock.list("+product.id+");lib.displayDiv(`product-feedstock-box`, this, `Listar Matérias-Primas`, `Esconder Lista`);'>Listar Matérias-Primas</button>";

		document.getElementById("product-manage-menu-div").innerHTML = html;
	}
};