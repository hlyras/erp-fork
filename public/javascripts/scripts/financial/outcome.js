$(function(){
	$("#outcome-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('outcome-create-submit').disabled = true;

		const category = document.getElementById("outcome-create-form").elements.namedItem('outcome_category');
		const origin = document.getElementById("outcome-create-form").elements.namedItem('outcome_origin');
		const value = document.getElementById("outcome-create-form").elements.namedItem('outcome_value').value;
		const obs = document.getElementById("outcome-create-form").elements.namedItem('outcome_obs').value;

		const category_id = category.options[category.selectedIndex].value;
		const category_name = category.options[category.selectedIndex].text;

		const origin_id = origin.options[origin.selectedIndex].value;
		const origin_name = origin.options[origin.selectedIndex].text;

		if(category_id == "0"){
			alert("É necessário selecionar uma categoria!");
			return document.getElementById('outcome-create-submit').disabled = false;
		};

		if(origin_id == "0"){
			alert("É necessário selecionar uma origem!");
			return document.getElementById('outcome-create-submit').disabled = false;
		};

		if(value < 0.01){
			alert("É necessário cadastrar o valor da receita!");
			return document.getElementById('outcome-create-submit').disabled = false;	
		};

		$.ajax({
			url: '/financial/outcome/save',
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
					document.getElementById('outcome-create-submit').disabled = false;
					return;
				};

				alert(response.done);

				document.getElementById("outcome-create-form").elements.namedItem('outcome_category').value = "0";
				document.getElementById("outcome-create-form").elements.namedItem('outcome_origin').value = "0";
				document.getElementById("outcome-create-form").elements.namedItem('outcome_value').value = "0.00";
				document.getElementById("outcome-create-form").elements.namedItem('outcome_obs').value = "";

				return document.getElementById('outcome-create-submit').disabled = false;	
			}
		});
	});

	$("#outcome-report-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('outcome-report-submit').disabled = true;

		$.ajax({
			url: '/financial/outcome/filter',
			method: 'post',
			data: $("#outcome-report-form").serialize(),
			success: (outcomes) => {
				if(outcomes.unauthorized){
					alert(outcomes.unauthorized);
					return window.location.href = '/login';
				};
				
				if(outcomes.msg){
					alert(outcomes.msg);
					return document.getElementById('product-create-submit').disabled = false;
				};

				const pageSize = 20;
				const page = 0;

				var totalValue = 0;
				for(i in outcomes){
					totalValue += outcomes[i].value;
				};

				document.getElementById('outcome_totalValue').innerHTML = "$"+lib.roundValue(totalValue);

				function paging(){
					if(outcomes.length){
						renderOutcomeTable(outcomes, pageSize, page);
					} else {
						lib.clearTable('outcome-report-tbl', 'outcomeReport');
					};
				};

				document.getElementById('outcome-report-submit').disabled = false;

				function buttonsPaging(){
					$('#outcomeReportNext').prop('disabled', outcomes.length <= pageSize || page >= outcomes.length / pageSize - 1);
					$('#outcomeReportPrevious').prop('disabled', outcomes.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#outcomeReportNext').click(function(){
				        if(page < outcomes.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#outcomeReportPrevious').click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});

				document.getElementById('outcome-report-submit').disabled = false;
			}
		});
	});

	$("#outcome-category-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('outcome-category-create-submit').disabled = true;

		let category_name = document.getElementById("outcome-category-create-form").elements.namedItem('category_name').value;

		if(category_name.length < 3 || category_name.length > 20){
			alert("Nome inválido!");
			return document.getElementById('outcome-category-create-submit').disabled = false;
		};

		$.ajax({
			url: '/financial/outcomecategory/save',
			method: 'post',
			data: $("#outcome-category-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				alert(response.done);

				document.getElementById("outcome-category-create-form").elements.namedItem('category_name').value = "";
				document.getElementById('outcome-category-create-submit').disabled = false;

				fillSelect('Categoria','outcome-origin-create-select','/financial/outcomecategory/list', 'get');
				fillSelect('Categoria','outcome-category-filter-select','/financial/outcomecategory/list', 'get');

				$("#outcome-category-filter-form").submit();
			}
		});
	});
	
	$("#outcome-category-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);
		let category_name = document.getElementById("outcome-category-filter-form").elements.namedItem('category_name').value;

		$.ajax({
			url: "/financial/outcomecategory/filter?name="+category_name,
			method: 'get',
			success: (outcomeCategories) => {
				if(outcomeCategories.unauthorized){
					alert(outcomeCategories.unauthorized);
					return window.location.href = '/login';
				};

				let pageSize = 20;
				let page = 0;

				function paging(){
					if(outcomeCategories.length){
						renderOutcomeCategoryTable(outcomeCategories, pageSize, page);
					} else {
						lib.clearTable("outcome-category-tbl", "outcomeCategory");
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$('#outcomeCategoryNext').prop('disabled', outcomeCategories.length <= pageSize || page >= outcomeCategories.length / pageSize - 1);
					$('#outcomeCategoryPrevious').prop('disabled', outcomeCategories.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#outcomeCategoryNext').click(function(){
				        if(page < outcomeCategories.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#outcomeCategoryPrevious').click(function(){
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

	$("#outcome-origin-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('outcome-origin-create-submit').disabled = true;

		let category_id = document.getElementById("outcome-origin-create-form").elements.namedItem('category_id').value;
		let origin_name = document.getElementById("outcome-origin-create-form").elements.namedItem('origin_name').value;

		if(category_id == "0"){
			alert('É necessário selecionar a categoria para cadastrar a origem!');
			return document.getElementById('outcome-origin-create-submit').disabled = false;
		};

		if(origin_name.length < 2 || origin_name.length > 20){
			alert("Origem inválida!");
			return document.getElementById('outcome-origin-create-submit').disabled = false;
		};

		$.ajax({
			url: '/financial/outcomeorigin/save',
			method: 'post',
			data: $("#outcome-origin-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};
				
				if(response.msg){
					alert(response.msg);
					return document.getElementById('outcome-origin-create-submit').disabled = false;
				};

				alert(response.done);

				document.getElementById("outcome-origin-create-form").elements.namedItem('origin_name').value = "";
				document.getElementById('outcome-origin-create-submit').disabled = false;
			}
		});
	});
	
	$("#outcome-origin-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);
		let category_id = document.getElementById("outcome-origin-filter-form").elements.namedItem('category_id').value;

		if(category_id){
			$.ajax({
				url: "/financial/outcomeorigin/filterbycategory?id="+category_id,
				method: 'get',
				success: (outcomeOrigins) => {
					if(outcomeOrigins.unauthorized){
						alert(outcomeOrigins.unauthorized);
						return window.location.href = '/login';
					};

					let pageSize = 10;
					let page = 0;

					function paging(){
						if(outcomeOrigins.length){
							renderOutcomeOriginTable(outcomeOrigins, pageSize, page);
						} else {
							lib.clearTable("outcome-origin-tbl", "outcomeOrigin");
						};
					};

					btn.attr('disabled', false);

					function buttonsPaging(){
						$('#outcomeOriginNext').prop('disabled', outcomeOrigins.length <= pageSize || page >= outcomeOrigins.length / pageSize - 1);
						$('#outcomeOriginPrevious').prop('disabled', outcomeOrigins.length <= pageSize || page == 0);
					};

					$(function(){
					    $('#outcomeOriginNext').click(function(){
					        if(page < outcomeOrigins.length / pageSize - 1){
					            page++;
					            paging();
					            buttonsPaging();
					        };
					    });
					    $('#outcomeOriginPrevious').click(function(){
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
			lib.clearTable('outcome-origin-tbl', 'outcomeOrigin');
			return btn.attr('disabled', false);

		}
	});
});

function showFinancialOutcome(id){
	$.ajax({
		url: '/financial/outcome/id/'+id,
		method: 'get',
		success: (outcome) => {
			if(outcome.unauthorized){
				alert(outcome.unauthorized);
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
			html += "<td>"+outcome[0].id+"<td>";
			html += "<td>"+outcome[0].date+"<td>";
			html += "<td>"+outcome[0].category_name+"<td>";
			html += "<td>"+outcome[0].origin_name+"<td>";
			html += "<td>"+outcome[0].value+"<td>";
			html += "<td>"+outcome[0].user_name+"<td>";
			html += "</tr>";
			
			document.getElementById("financial-show-tbl").innerHTML = html;
			document.getElementById("financial-show-obs").innerHTML = "<br>"+outcome[0].obs;
		}
	});
};

function removeOutcomeCategory(id){
	let r = confirm('Deseja realmente excluir esta categoria?');
	
	if(r){
		$.ajax({
			url: '/financial/outcomecategory/remove?id='+id,
			method: 'delete',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				alert(response.done);

				fillSelect('Categoria','outcome-origin-create-select','/financial/outcomecategory/list', 'get')
				fillSelect('Categoria','outcome-category-filter-select','/financial/outcomecategory/list', 'get')
				
				lib.clearTable("outcome-origin-tbl", "outcomeOrigin");
				
				$("#outcome-category-filter-form").submit();
			}
		});
	};
};

function removeOutcomeOrigin(id){
	let r = confirm('Deseja realmente excluir esta origem?');
	
	if(r){
		$.ajax({
			url: '/financial/outcomeorigin/remove?id='+id,
			method: 'delete',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				alert(response.done);

				$("#outcome-origin-filter-form").submit();
			}
		});
	};
};