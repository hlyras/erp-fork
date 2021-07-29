Income.view = {};

Income.view.filter = (incomes, pagination) => {
	if(incomes.length){
		let html = "";
		html += "<div class='box b1 container border-explicit'>";
			html += "<div class='mobile-box a6 em07 padding-5'><div class='center'>Código</div></div>";
			html += "<div class='mobile-box a4 em07 padding-5'><div class='center'>Categoria</div></div>";
			html += "<div class='mobile-box a4 em07 padding-5'><div class='center'>Origem</div></div>";
			html += "<div class='mobile-box a6 em07 padding-5'><div class='center'>Valor</div></div>";
		html += "</div>";
		for (let i = pagination.page * pagination.pageSize; i < incomes.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
				html += "<div class='mobile-box b6 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Income.controller.show("+incomes[i].id+")'>"+incomes[i].id+"</div>";
				html += "<div class='mobile-box b4 padding-5 v-center'>"+incomes[i].category_name+"</div>";
				html += "<div class='mobile-box b4 padding-5 v-center'>"+incomes[i].origin_name+"</div>";
				html += "<div class='mobile-box b6 padding-5 v-center bold'>$"+incomes[i].cash+"</div>";
				html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Income.controller.edit("+incomes[i].id+")'></div>";
				html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Income.controller.delete("+incomes[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("income-filter-div").innerHTML = html;
		document.getElementById("income-filter-box").style.display = "";
	} else {
		document.getElementById("income-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("income-filter-box").style.display = "";
	};
};

Income.view.show = (income) => {
	let html = "";
	html += "<div class='mobile-box b4 em12 avant-garde center'>"+income.id+"</div>";
	html += "<div class='mobile-box b2 avant-garde center'>"+income.category_name+"</div>";
	document.getElementById("income-show-box").innerHTML = html;
};