Product.view.manage = {
	info: (product, title, table) => {
		let html = "";

		html += "<div class='box b1 underline center bold' onclick='window.location.href=`/product/datasheet/"+product.code+"`'>"+product.name+"</div>";

		html += "<div class='mobile-box b10 container margin-top-5'>";
			html += "<div class='box b1 em06'>Id</div>";
			html += "<div class='box b1 em12'>"+product.id+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b10 container margin-top-5'>";
			html += "<div class='box b1 em06'>Código</div>";
			html += "<div class='box b1 em12'>"+product.code+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b4-10 container margin-top-5'>";
			html += "<div class='box b1 em06'>Nome</div>";
			html += "<div class='box b1 em12'>"+product.name+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b10 container margin-top-5'>";
			html += "<div class='box b1 em06'>Tamanho</div>";
			html += "<div class='box b1 em12'>"+product.size+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b10 container margin-top-5'>";
			html += "<div class='box b1 em06'>Cor</div>";
			html += "<div class='box b1 em12'>"+product.color+"</div>";
		html += "</div>";
		html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Product.controller.manage.edit("+product.id+")'></div>";
		html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Product.controller.manage.delete("+product.id+")'></div>";

		document.getElementById(table).innerHTML = html;
	},
	filter: (products, pagination) => {
		if(products.length){
			let html = "<div class='box b1 container border em07 center'>";
			html += "<div class='mobile-box b10 padding-5'>Código</div>";
			html += "<div class='mobile-box b2 padding-5'>Nome</div>";
			html += "<div class='mobile-box b10 padding-5'>Tamanho</div>";
			html += "<div class='mobile-box b10 padding-5'>Cor</div>";
			html += "<div class='mobile-box b10 padding-5'></div>";
			html += "<div class='mobile-box b10 padding-5'></div>";
			html += "</div>";
			for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
				html += "<div class='box b1 container box-hover padding-5 margin-top-5 border'>";
				html += "<div type='text' class='mobile-box b10 em11 tbl-show-link nowrap center bold' onclick='Product.controller.manage.show("+products[i].id+")'>"+products[i].code+"</div>";
				html += "<div class='mobile-box b2 center'>"+products[i].name+"</div>";
				html += "<div class='mobile-box b10 center'>"+products[i].size+"</div>";
				html += "<div class='mobile-box b10 center'>"+products[i].color+"</div>";
				html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/edit.png' onclick='Product.controller.manage.edit("+products[i].id+")'></div>";
				html += "<div class='mobile-box b10 center'><img class='size-20 icon' src='/images/icon/trash.png' onclick='Product.controller.manage.delete("+products[i].id+")'></div>";
				html += "</div>";
			};
			document.getElementById("product-manage-filter-table").innerHTML = html;
			document.getElementById("product-manage-filter-box").style.display = "";
		} else {
			document.getElementById("product-manage-filter-table").innerHTML = "Sem resultados";
			document.getElementById("product-manage-filter-box").style.display = "";
		};
	},
	menu: (product) => {
		let html = "";
		html += "<h4 class='underline'>MENU PRINCIPAL</h4>";
		html += "<button class='mobile-box three submit-generic box-hover center margin-top-5' onclick='Product.controller.image.add("+product.id+")'>Adicionar Imagem</button>";
		html += "<button class='mobile-box three submit-generic box-hover center margin-top-5' onclick='Product.controller.feedstock.form.display("+product.id+");lib.displayDiv(`product-feedstock-add-box`, this, `Adicionar Matéria-Prima`, `Esconder Formulário`);'>Adicionar Matéria-Prima</button>";
		html += "<button class='mobile-box three submit-generic box-hover center margin-top-5' onclick='Product.controller.feedstock.list("+product.id+");lib.displayDiv(`product-feedstock-box`, this, `Listar Matérias-Primas`, `Esconder Lista`);'>Listar Matérias-Primas</button>";

		document.getElementById("product-manage-menu-div").innerHTML = html;
	},
	image: {
		show: (images, pagination) => {
			let html = "";
		    if(images.length){
			    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
					document.getElementById("product-manage-image-img").src = images[i].url;
					document.getElementById("product-manage-image-remove-button").setAttribute("onClick", "javascript: Product.controller.image.remove('"+images[i].id+"', '"+images[i].product_id+"');" );
					document.getElementById("product-manage-image-remove-button").disabled = false;
				};
		    } else {
				document.getElementById("product-manage-image-img").src = "/images/product/no-product.png";
				document.getElementById("product-manage-image-remove-button").setAttribute("onClick", "javascript: Product.controller.image.remove(0, 0);" );
				document.getElementById("product-manage-image-remove-button").disabled = true;
		    };
		}
	}
};