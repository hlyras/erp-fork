const IncomeView = {};

IncomeView.filter = (incomes, pagination) => {
	let incomeTotalValue = 0;
	if (incomes.length) {
		let html = "";

		for (let i in incomes) { incomeTotalValue += parseFloat(incomes[i].value); };
		document.getElementById("income-total-value").innerHTML = "$" + incomeTotalValue.toFixed(2);

		html += "<div class='box b1 container border-explicit'>";
		html += "<div class='mobile-box a6 em07 padding-5'><div class='center'>Código</div></div>";
		html += "<div class='mobile-box a4 em07 padding-5'><div class='center'>Categoria</div></div>";
		html += "<div class='mobile-box a4 em07 padding-5'><div class='center'>Origem</div></div>";
		html += "<div class='mobile-box a6 em07 padding-5'><div class='center'>Valor</div></div>";
		html += "</div>";
		for (let i = pagination.page * pagination.pageSize; i < incomes.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
			html += "<div class='mobile-box b6 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Income.controller.show(" + incomes[i].id + ")'>" + incomes[i].id + "</div>";
			html += "<div class='mobile-box b4 padding-5 v-center'>" + incomes[i].category_name + "</div>";
			html += "<div class='mobile-box b4 padding-5 v-center'>" + incomes[i].origin_name + "</div>";
			html += "<div class='mobile-box b6 padding-5 v-center bold'>$" + incomes[i].value.toFixed(2) + "</div>";
			html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Income.controller.edit(" + incomes[i].id + ")'></div>";
			html += "<div class='mobile-box b12 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Income.controller.delete(" + incomes[i].id + ")'></div>";
			html += "</div>";
		};
		document.getElementById("income-filter-div").innerHTML = html;
		document.getElementById("income-filter-box").style.display = "";
	} else {
		document.getElementById("income-total-value").innerHTML = "$" + incomeTotalValue.toFixed(2);
		document.getElementById("income-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("income-filter-box").style.display = "";
	};
};

IncomeView.show = (income) => {
	let html = "";
	html += "<div class='mobile-box b7 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Id</div>";
	html += "<div class='box b1 border padding-5 center'>" + income.id + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3-7 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Categoria</div>";
	html += "<div class='box b1 border padding-5 center'>" + income.category_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3-7 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Origem</div>";
	html += "<div class='box b1 border padding-5 center'>" + income.origin_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Data</div>";
	html += "<div class='box b1 border padding-5 center'>" + lib.timestampToDate(income.date) + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Valor</div>";
	html += "<div class='box b1 border padding-5 center bold'>$" + income.value + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b3 container margin-top-5'>";
	html += "<div class='box b1 em06 bold'>Valor</div>";
	html += "<div class='box b1 border padding-5 center'>" + income.user_name + "</div>";
	html += "</div>";
	html += "<div class='mobile-box b1 container margin-top-5 margin-bottom-5'>";
	html += "<div class='box b1 em06 bold'>Descrição</div>";
	html += "<div class='box b1 border padding-5 center pre-wrap'>" + income.description + "</div>";
	html += "</div>";

	document.getElementById("income-show-box").innerHTML = html;
	document.getElementById("income-show-box").style.display = "";
};