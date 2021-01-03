// ----------------------------
// Income functions
// ----------------------------

function renderIncomeTable(incomes, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Categoria</td>";
	html += "<td>Origem</td>";
	html += "<td>Valor</td>";
	html += "<td>Usuário</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < incomes.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><h3 class='tbl-show-link nowrap' onclick='showFinancialIncome("+incomes[i].id+")'>"+incomes[i].id+"</h3></td>";
		html += "<td>"+lib.convertDate(incomes[i].date)+"</td>";
		html += "<td>"+incomes[i].category_name+"</td>";
		html += "<td>"+incomes[i].origin_name+"</td>";
		html += "<td class='nowrap'>"+incomes[i].value+"</td>";
		html += "<td>"+incomes[i].user_name+"</td>";
		html += "</tr>";
	};
	document.getElementById('financial-income-report-tbl').innerHTML = html;
	document.getElementById('financial-income-report-div').style.display = 'block';
	$('#incomeReportPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(incomes.length / pageSize));
};

function renderIncomeCategoryTable(incomeCategories, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < incomeCategories.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+incomeCategories[i].id+")'>"+incomeCategories[i].code+"</a></td>";
		html += "<td class='nowrap'>"+incomeCategories[i].id+"</td>";
		html += "<td>"+incomeCategories[i].name+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeIncomeCategory("+incomeCategories[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('financial-income-category-tbl').innerHTML = html;
	document.getElementById('financial-income-category-div').style.display = 'block';
	$('#incomeCategoryPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(incomeCategories.length / pageSize));
};

function renderIncomeOriginTable(incomeOrigins, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < incomeOrigins.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+incomeOrigins[i].id+")'>"+incomeOrigins[i].code+"</a></td>";
		html += "<td class='nowrap'>"+incomeOrigins[i].id+"</td>";
		html += "<td>"+incomeOrigins[i].name+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeIncomeOrigin("+incomeOrigins[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('financial-income-origin-tbl').innerHTML = html;
	document.getElementById('financial-income-origin-div').style.display = 'block';
	$('#incomeOriginPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(incomeOrigins.length / pageSize));
};

// ----------------------------
// Outcome functions
// ----------------------------

function renderOutcomeTable(outcomes, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Categoria</td>";
	html += "<td>Origem</td>";
	html += "<td>Valor</td>";
	html += "<td>Usuário</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < outcomes.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><h3 class='tbl-show-link nowrap' onclick='showFinancialOutcome("+outcomes[i].id+")'>"+outcomes[i].id+"</h3></td>";
		html += "<td>"+lib.convertDate(outcomes[i].date)+"</td>";
		html += "<td>"+outcomes[i].category_name+"</td>";
		html += "<td>"+outcomes[i].origin_name+"</td>";
		html += "<td class='nowrap'>"+outcomes[i].value+"</td>";
		html += "<td>"+outcomes[i].user_name+"</td>";
		html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='removeOutcome("+outcomes[i].id+")'></td>";
		// html += "<td>"+outcomes[i].id+"</td>";
		html += "</tr>";
	};
	document.getElementById('financial-outcome-report-tbl').innerHTML = html;
	document.getElementById('financial-outcome-report-div').style.display = 'block';
	$('#outcomeReportPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(outcomes.length / pageSize));
};

function renderOutcomeCategoryTable(outcomeCategories, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < outcomeCategories.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+outcomeCategories[i].id+")'>"+outcomeCategories[i].code+"</a></td>";
		html += "<td class='nowrap'>"+outcomeCategories[i].id+"</td>";
		html += "<td>"+outcomeCategories[i].name+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeOutcomeCategory("+outcomeCategories[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('financial-outcome-category-tbl').innerHTML = html;
	document.getElementById('financial-outcome-category-div').style.display = 'block';
	$('#outcomeCategoryPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(outcomeCategories.length / pageSize));
};

function renderOutcomeOriginTable(outcomeOrigins, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < outcomeOrigins.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+outcomeOrigins[i].id+")'>"+outcomeOrigins[i].code+"</a></td>";
		html += "<td class='nowrap'>"+outcomeOrigins[i].id+"</td>";
		html += "<td>"+outcomeOrigins[i].name+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeOutcomeOrigin("+outcomeOrigins[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('financial-outcome-origin-tbl').innerHTML = html;
	document.getElementById('financial-outcome-origin-div').style.display = 'block';
	$('#outcomeOriginPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(outcomeOrigins.length / pageSize));
};