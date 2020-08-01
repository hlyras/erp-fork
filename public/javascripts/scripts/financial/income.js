$(function(){
	$("#income-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('income-create-submit').disabled = true;

		const category = document.getElementById("income-create-form").elements.namedItem('income_category');
		const origin = document.getElementById("income-create-form").elements.namedItem('income_origin');
		const value = document.getElementById("income-create-form").elements.namedItem('income_value').value;
		const obs = document.getElementById("income-create-form").elements.namedItem('income_obs').value;

		const category_id = category.options[category.selectedIndex].value;
		const category_name = category.options[category.selectedIndex].text;

		const origin_id = origin.options[origin.selectedIndex].value;
		const origin_name = origin.options[origin.selectedIndex].text;

		if(category_id == "0"){
			alert("É necessário selecionar uma categoria!");
			return document.getElementById('income-create-submit').disabled = false;
		};

		if(origin_id == "0"){
			alert("É necessário selecionar uma origem!");
			return document.getElementById('income-create-submit').disabled = false;
		};

		if(value < 0.01){
			alert("É necessário cadastrar o valor da receita!");
			return document.getElementById('income-create-submit').disabled = false;	
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/income/save',
			method: 'post',
			data: {
				category_id: category_id,
				category_name: category_name,
				origin_id: origin_id,
				origin_name: origin_name,
				value: value,
				obs: obs
			},
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					document.getElementById('ajax-loader').style.display = 'none';
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				document.getElementById("income-create-form").elements.namedItem('income_category').value = "0";
				document.getElementById("income-create-form").elements.namedItem('income_origin').value = "0";
				document.getElementById("income-create-form").elements.namedItem('income_value').value = "0.00";
				document.getElementById("income-create-form").elements.namedItem('income_obs').value = "";

				return document.getElementById('income-create-submit').disabled = false;	
			}
		});
	});

	$("#income-report-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('income-report-submit').disabled = true;

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/financial/income/filter',
			method: 'post',
			data: $("#income-report-form").serialize(),
			success: (incomes) => {
				if(incomes.unauthorized){
					alert(incomes.unauthorized);
					return window.location.href = '/login';
				};
				
				if(incomes.msg){
					alert(incomes.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					return document.getElementById('product-create-submit').disabled = false;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				var pageSize = 15;
				var page = 0;

				var totalValue = 0;
				for(i in incomes){
					totalValue += incomes[i].value;
				};

				document.getElementById('income_totalValue').innerHTML = "$"+lib.roundValue(totalValue);

				function paging(){
					if(incomes.length){
						renderIncomeTable(incomes, pageSize, page);
					} else {
						lib.clearTable('income-report-tbl', 'incomeReport');
					};
				};

				document.getElementById('income-report-submit').disabled = false;

				function buttonsPaging(){
					$('#incomeReportNext').prop('disabled', incomes.length <= pageSize || page >= incomes.length / pageSize - 1);
					$('#incomeReportPrevious').prop('disabled', incomes.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#incomeReportNext').click(function(){
				        if(page < incomes.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#incomeReportPrevious').click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});

				document.getElementById('income-report-submit').disabled = false;
			}
		});
	});

	$("#income-category-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('income-category-create-submit').disabled = true;

		let category_name = document.getElementById("income-category-create-form").elements.namedItem('category_name').value;

		if(category_name.length < 3 || category_name.length > 20){
			alert("Nome inválido!");
			return document.getElementById('income-category-create-submit').disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/incomecategory/save',
			method: 'post',
			data: $("#income-category-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				document.getElementById("income-category-create-form").elements.namedItem('category_name').value = "";
				document.getElementById('income-category-create-submit').disabled = false;

				lib.fillSelect('Categoria','income-origin-create-select','/financial/incomecategory/list', 'get');
				lib.fillSelect('Categoria','income-category-filter-select','/financial/incomecategory/list', 'get');

				$("#income-category-filter-form").submit();
			}
		});
	});
	
	$("#income-category-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);
		let category_name = document.getElementById("income-category-filter-form").elements.namedItem('category_name').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: "/financial/incomecategory/filter?name="+category_name,
			method: 'get',
			success: (incomeCategories) => {
				if(incomeCategories.unauthorized){
					alert(incomeCategories.unauthorized);
					return window.location.href = '/login';
				};

				var pageSize = 10;
				var page = 0;

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				function paging(){
					if(incomeCategories.length){
						renderIncomeCategoryTable(incomeCategories, pageSize, page);
					} else {
						lib.clearTable('income-category-tbl', 'incomeCategory');
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$('#incomeCategoryNext').prop('disabled', incomeCategories.length <= pageSize || page >= incomeCategories.length / pageSize - 1);
					$('#incomeCategoryPrevious').prop('disabled', incomeCategories.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#incomeCategoryNext').click(function(){
				        if(page < incomeCategories.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#incomeCategoryPrevious').click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});
			}
		});
	});

	$("#income-origin-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('income-origin-create-submit').disabled = true;

		const category_id = document.getElementById("income-origin-create-form").elements.namedItem('category_id').value;
		const origin_name = document.getElementById("income-origin-create-form").elements.namedItem('origin_name').value;

		if(category_id == "0"){
			alert('É necessário selecionar a categoria para cadastrar a origem!');
			return document.getElementById('income-origin-create-submit').disabled = false;
		};

		if(origin_name.length < 2 || origin_name.length > 20){
			alert("Origem inválida!");
			return document.getElementById('income-origin-create-submit').disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/incomeorigin/save',
			method: 'post',
			data: $("#income-origin-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					return document.getElementById('income-origin-create-submit').disabled = false;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				document.getElementById("income-origin-create-form").elements.namedItem('origin_name').value = "";
				document.getElementById('income-origin-create-form').elements.namedItem('submit').disabled = false;
			}
		});
	});
	
	$("#income-origin-filter-form").on('submit', (event) => {
		event.preventDefault();
		const btn = $(this);btn.attr('disabled', true);
		const category_id = document.getElementById("income-origin-filter-form").elements.namedItem('category_id').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		if(category_id){
			$.ajax({
				url: "/financial/incomeorigin/filterbycategory?id="+category_id,
				method: 'get',
				success: (incomeOrigins) => {
					if(incomeOrigins.unauthorized){
						alert(incomeOrigins.unauthorized);
						return window.location.href = '/login';
					};

					document.getElementById('ajax-loader').style.visibility = 'hidden';
					
					var pageSize = 10;
					var page = 0;

					function paging(){
						if(incomeOrigins.length){
							renderIncomeOriginTable(incomeOrigins, pageSize, page);
						} else {
							lib.clearTable('income-origin-tbl', 'incomeOrigin');
						};
					};

					btn.attr('disabled', false);

					function buttonsPaging(){
						$('#incomeCategoryNext').prop('disabled', incomeOrigins.length <= pageSize || page >= incomeOrigins.length / pageSize - 1);
						$('#incomeCategoryPrevious').prop('disabled', incomeOrigins.length <= pageSize || page == 0);
					};

					$(function(){
					    $('#incomeCategoryNext').click(function(){
					        if(page < incomeOrigins.length / pageSize - 1){
					            page++;
					            paging();
					            buttonsPaging();
					        };
					    });
					    $('#incomeCategoryPrevious').click(function(){
					        if(page > 0){
					            page--;
					            paging();
					            buttonsPaging();
					        };
					    });
					    paging();
					    buttonsPaging();
					});
				}
			});
		} else {
			alert('É necessário selecionar uma categoria');
			lib.clearTable('income-origin-tbl', 'incomeOrigin');
			return btn.attr('disabled', false);
		}
	});
});

function showFinancialIncome(id){
	$.ajax({
		url: '/financial/income/id/'+id,
		method: 'get',
		success: (income) => {
			if(income.unauthorized){
				alert(income.unauthorized);
				window.location.href = '/login';
				return;
			};

			document.getElementById("financial-show-box").style.display = "block";

			var html = "";
			html += "<tr>";
			html += "<td>Id<td>";
			html += "<td>Data<td>";
			html += "<td>Categoria<td>";
			html += "<td>Origem<td>";
			html += "<td>Valor<td>";
			html += "<td>Usuário<td>";
			html += "</tr>";

			html += "<tr>";
			html += "<td class='nowrap'>"+income[0].id+"<td>";
			html += "<td>"+income[0].date+"<td>";
			html += "<td>"+income[0].category_name+"<td>";
			html += "<td>"+income[0].origin_name+"<td>";
			html += "<td class='nowrap'>"+income[0].value+"<td>";
			html += "<td>"+income[0].user_name+"<td>";
			html += "</tr>";
			
			document.getElementById("financial-show-tbl").innerHTML = html;
			document.getElementById("financial-show-obs").innerHTML = "<br>"+income[0].obs;
		}
	});
};

function removeIncomeCategory(id){
	const r = confirm('Deseja realmente excluir esta categoria?');
	
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/financial/incomecategory/remove?id='+id,
			method: 'delete',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					console.log('incomeCategory');
					return window.location.href = '/login';
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				lib.fillSelect('Categoria','income-origin-create-select','/financial/incomecategory/list', 'get');
				lib.fillSelect('Categoria','income-category-filter-select','/financial/incomecategory/list', 'get');

				$("#income-category-filter-form").submit();
				$("#income-origin-filter-form").submit();
			}
		});
	};
};

function removeIncomeOrigin(id){
	const r = confirm('Deseja realmente excluir esta origem?');
	
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/financial/incomeorigin/remove?id='+id,
			method: 'delete',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					console.log('incomeOrigin');
					return window.location.href = '/login';
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				$("#income-origin-filter-form").submit();
			}
		});
	};
};