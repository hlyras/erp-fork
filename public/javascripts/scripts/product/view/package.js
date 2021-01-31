Product.view.package = {};

Product.view.package.filter = (packages, pagination) => {
	if(packages.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < packages.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box one container border padding-5 margin-top-5'>";
				html += "<div class='mobile-box nine center'><h3 class='tbl-show-link nowrap' onclick='Product.controller.package.show("+packages[i].id+")'>"+packages[i].code+"</h3></div>";
				html += "<div class='mobile-box two center'>"+packages[i].name+"</div>";
				html += "<div class='mobile-box nine center'>"+packages[i].color+"</div>";
				html += "<div class='mobile-box nine center'>$"+packages[i].price+"</div>";
				html += "<div class='mobile-box twelve center'><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.controller.package.edit("+packages[i].id+")'></div>";
				html += "<div class='mobile-box twelve center'><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.controller.package.delete("+packages[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("product-package-filter-box").style.display = "";
		document.getElementById("product-package-filter-div").innerHTML = html;
	} else {
		document.getElementById("product-package-filter-box").style.display = "";
		document.getElementById("product-package-filter-div").innerHTML = "Sem resultados";
	};
};

Product.view.package.show = (package) => {
	let html = "<div class='box one underline center'>Informações do Pacote</div>";
	html += "<div class='box one container padding-10'>";
		html += "<div class='box one container box-border margin-top-5'>"
			html += "<div class='mobile-box four padding-5 margin-top-5'>Nome</div>";
			html += "<div class='mobile-box three-fourths padding-5 margin-top-5 bold'>"+package.name+"</div>";
		html += "</div>";
		html += "<div class='mobile-box three container box-border margin-top-5'>"
			html += "<div class='mobile-box two padding-5 margin-top-5'>Código</div>";
			html += "<div class='mobile-box two padding-5 margin-top-5 bold'>"+package.code+"</div>";
		html += "</div>";
		html += "<div class='mobile-box three container box-border margin-top-5'>"
			html += "<div class='mobile-box two padding-5 margin-top-5'>Valor</div>";
			html += "<div class='mobile-box two padding-5 margin-top-5 bold'>$"+package.price+"</div>";
		html += "</div>";
		html += "<div class='mobile-box three container box-border margin-top-5'>"
			html += "<div class='mobile-box two padding-5 margin-top-5'>Cor</div>";
			html += "<div class='mobile-box two padding-5 margin-top-5 bold'>"+package.color+"</div>";
		html += "</div>";
	html += "</div>";

	document.getElementById("product-package-show-info").innerHTML = html;
	document.getElementById("product-package-show-box").style.display = "";
};