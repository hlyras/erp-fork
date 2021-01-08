$(function(){
	$("#financial-outcome-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('financial-outcome-create-submit').disabled = true;

		const category = document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_category');
		const origin = document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_origin');
		const payment = document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_payment');
		const value = document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_value').value;
		const obs = document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_obs').value;

		const category_id = category.options[category.selectedIndex].value;
		const category_name = category.options[category.selectedIndex].text;

		const origin_id = origin.options[origin.selectedIndex].value;
		const origin_name = origin.options[origin.selectedIndex].text;

		const payment_id = payment.options[payment.selectedIndex].value;
		const payment_name = payment.options[payment.selectedIndex].text;

		if(category_id == "0"){
			alert("É necessário selecionar uma categoria!");
			return document.getElementById('financial-outcome-create-submit').disabled = false;
		};

		if(origin_id == "0"){
			alert("É necessário selecionar uma origem!");
			return document.getElementById('financial-outcome-create-submit').disabled = false;
		};

		if(payment_id == "0"){
			alert("É necessário selecionar um método de pagamento!");
			return document.getElementById('financial-outcome-create-submit').disabled = false;
		};

		if(value < 0.01){
			alert("É necessário cadastrar o valor da despesa!");
			return document.getElementById('financial-outcome-create-submit').disabled = false;	
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/outcome/save',
			method: 'post',
			data: {
				category_id: category_id,
				category_name: category_name,
				origin_id: origin_id,
				origin_name: origin_name,
				payment_id: payment_id,
				payment_name: payment_name,
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
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					document.getElementById('financial-outcome-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				alert(response.done);

				document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_category').value = "0";
				document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_origin').value = "0";
				document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_payment').value = "0";
				document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_value').value = "0.00";
				document.getElementById("financial-outcome-create-form").elements.namedItem('outcome_obs').value = "";

				return document.getElementById('financial-outcome-create-submit').disabled = false;	
			}
		});
	});

	$("#financial-outcome-report-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('financial-outcome-report-submit').disabled = true;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/outcome/filter',
			method: 'post',
			data: $("#financial-outcome-report-form").serialize(),
			success: (outcomes) => {
				if(outcomes.unauthorized){
					alert(outcomes.unauthorized);
					return window.location.href = '/login';
				};
				
				if(outcomes.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(outcomes.msg);
					return document.getElementById('product-create-submit').disabled = false;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				var pageSize = 15;
				var page = 0;

				var totalValue = 0;
				for(i in outcomes){
					totalValue += outcomes[i].value;
				};

				document.getElementById('outcome_totalValue').innerHTML = "$"+lib.roundValue(totalValue);

				function paging(){
					if(outcomes.length){
						renderOutcomeTable(outcomes, pageSize, page);
					} else {
						lib.clearTable('financial-outcome-report-tbl', 'outcomeReport');
					};
				};

				document.getElementById('financial-outcome-report-submit').disabled = false;

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

				document.getElementById('financial-outcome-report-submit').disabled = false;
			}
		});
	});

	$("#financial-outcome-category-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('financial-outcome-category-create-submit').disabled = true;

		let category_name = document.getElementById("financial-outcome-category-create-form").elements.namedItem('category_name').value;

		if(category_name.length < 3 || category_name.length > 20){
			alert("Nome inválido!");
			return document.getElementById('financial-outcome-category-create-submit').disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/outcomecategory/save',
			method: 'post',
			data: $("#financial-outcome-category-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				document.getElementById("financial-outcome-category-create-form").elements.namedItem('category_name').value = "";
				document.getElementById('financial-outcome-category-create-submit').disabled = false;

				fillSelect('Categoria','financial-outcome-origin-create-select','/financial/outcomecategory/list', 'get');
				fillSelect('Categoria','financial-outcome-category-filter-select','/financial/outcomecategory/list', 'get');

				$("#financial-outcome-category-filter-form").submit();
			}
		});
	});
	
	$("#financial-outcome-category-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);
		let category_name = document.getElementById("financial-outcome-category-filter-form").elements.namedItem('category_name').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: "/financial/outcomecategory/filter?name="+category_name,
			method: 'get',
			success: (outcomeCategories) => {
				if(outcomeCategories.unauthorized){
					alert(outcomeCategories.unauthorized);
					return window.location.href = '/login';
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				var pageSize = 20;
				var page = 0;

				function paging(){
					if(outcomeCategories.length){
						renderOutcomeCategoryTable(outcomeCategories, pageSize, page);
					} else {
						lib.clearTable("financial-outcome-category-tbl", "outcomeCategory");
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

	$("#financial-outcome-origin-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('financial-outcome-origin-create-submit').disabled = true;

		let category_id = document.getElementById("financial-outcome-origin-create-form").elements.namedItem('category_id').value;
		let origin_name = document.getElementById("financial-outcome-origin-create-form").elements.namedItem('origin_name').value;

		if(category_id == "0"){
			alert('É necessário selecionar a categoria para cadastrar a origem!');
			return document.getElementById('financial-outcome-origin-create-submit').disabled = false;
		};

		if(origin_name.length < 2 || origin_name.length > 20){
			alert("Origem inválida!");
			return document.getElementById('financial-outcome-origin-create-submit').disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/financial/outcomeorigin/save',
			method: 'post',
			data: $("#financial-outcome-origin-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};
				
				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					return document.getElementById('financial-outcome-origin-create-submit').disabled = false;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				document.getElementById("financial-outcome-origin-create-form").elements.namedItem('origin_name').value = "";
				document.getElementById('financial-outcome-origin-create-submit').disabled = false;
			}
		});
	});
	
	$("#financial-outcome-origin-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);
		let category_id = document.getElementById("financial-outcome-origin-filter-form").elements.namedItem('category_id').value;

		if(category_id){
			document.getElementById('ajax-loader').style.visibility = 'visible';
			$.ajax({
				url: "/financial/outcomeorigin/filterbycategory?id="+category_id,
				method: 'get',
				success: (outcomeOrigins) => {
					if(outcomeOrigins.unauthorized){
						alert(outcomeOrigins.unauthorized);
						return window.location.href = '/login';
					};

					document.getElementById('ajax-loader').style.visibility = 'hidden';
					
					var pageSize = 10;
					var page = 0;

					function paging(){
						if(outcomeOrigins.length){
							renderOutcomeOriginTable(outcomeOrigins, pageSize, page);
						} else {
							lib.clearTable("financial-outcome-origin-tbl", "outcomeOrigin");
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
			lib.clearTable('financial-outcome-origin-tbl', 'outcomeOrigin');
			return btn.attr('disabled', false);

		}
	});
});

function showFinancialOutcome(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/financial/outcome/id/'+id,
		method: 'get',
		success: (outcome) => {
			if(outcome.unauthorized){
				alert(outcome.unauthorized);
				window.location.href = '/login';
				return;
			};

			var html = "";

			html += "<div class='box one center underline bold'>Dados da despesa "+outcome[0].id+"</div>";
			html += "<div class='box three container border-explicit padding-10 margin-top-5'>";
				html += "<div class='box one container'>";
					html += "<div class='mobile-box three box-border center padding-5 margin-top-5'>Categoria:</div>";
					html += "<div class='mobile-box two-thirds box-border center padding-5 margin-top-5 bold'>"+outcome[0].category_name+"</div>";
					html += "<div class='mobile-box three box-border center padding-5 margin-top-5'>Origem:</div>";
					html += "<div class='mobile-box two-thirds box-border center padding-5 margin-top-5 bold'>"+outcome[0].origin_name+"</div>";
				html += "</div>";
			html += "</div>";

			html += "<div class='box three container border-explicit padding-10 margin-top-5'>";
				html += "<div class='box one container'>";
					html += "<div class='mobile-box three box-border center padding-5 margin-top-5'>Data:</div>";
					html += "<div class='mobile-box two-thirds box-border center padding-5 margin-top-5 bold'>"+outcome[0].full_date+"</div>";
					html += "<div class='mobile-box three box-border center padding-5 margin-top-5'>Mét de pag:</div>";
					html += "<div class='mobile-box two-thirds box-border center padding-5 margin-top-5 bold'>"+outcome[0].payment_name+"</div>";
				html += "</div>";
			html += "</div>";

			html += "<div class='box three container border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box three box-border center padding-5 margin-top-5'>Valor:</div>";
				html += "<div class='mobile-box two-thirds box-border center padding-5 margin-top-5 bold'>"+outcome[0].value+"</div>";
				html += "<div class='mobile-box three box-border center padding-5 margin-top-5'>Usuário:</div>";
				html += "<div class='mobile-box two-thirds box-border center padding-5 margin-top-5 bold'>"+outcome[0].user_name+"</div>";
			html += "</div>";

			if(outcome[0].obs){
				html += "<div class='box one center border-explicit padding-10 margin-top-5 bold'>"+outcome[0].obs+"</div>";
			};

			// html += "<tr>";
			// html += "<td>Data<td>";
			// html += "<td>"+outcome[0].full_date+"<td>";
			// html += "</tr>";

			// html += "<tr>";
			// html += "<td>Categoria<td>";
			// html += "<td>"+outcome[0].category_name+"<td>";
			// html += "</tr>";

			// html += "<tr>";
			// html += "<td>Origem<td>";
			// html += "<td>"+outcome[0].origin_name+"<td>";
			// html += "</tr>";

			// html += "<tr>";
			// html += "<td>Método de pagamento<td>";
			// html += "<td>"+outcome[0].payment_name+"<td>";
			// html += "</tr>";

			// html += "<tr>";
			// html += "<td>Valor<td>";
			// html += "<td class='nowrap'>"+outcome[0].value+"<td>";
			// html += "</tr>";

			// html += "<tr>";
			// html += "<td>Usuário<td>";
			// html += "<td>"+outcome[0].user_name+"<td>";
			// html += "</tr>";
			
			document.getElementById("financial-show-box").style.display = "";
			document.getElementById("financial-show-box").innerHTML = html;
			
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeOutcomeCategory(id){
	let r = confirm('Deseja realmente excluir esta categoria?');
	
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
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
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				fillSelect('Categoria','financial-outcome-origin-create-select','/financial/outcomecategory/list', 'get')
				fillSelect('Categoria','financial-outcome-category-filter-select','/financial/outcomecategory/list', 'get')
				
				lib.clearTable("financial-outcome-origin-tbl", "outcomeOrigin");
				
				$("#financial-outcome-category-filter-form").submit();
			}
		});
	};
};

function removeOutcomeOrigin(id){
	let r = confirm('Deseja realmente excluir esta origem?');
	
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
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
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				$("#financial-outcome-origin-filter-form").submit();
			}
		});
	};
};

// let modelOutcomeRemove = async (id) => {
// 	console.log(id);
// };

let modelOutcomeRemove = async (id) => {
	let response = await fetch("/financial/outcome/delete?id="+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false; };
	
	alert(response.done);
	
	return true;
};

let removeOutcome = async (id) => {
	let r = confirm('Deseja realmente excluir a saída?');
	if(r){
		
		document.getElementById('ajax-loader').style.visibility = 'visible';
		await modelOutcomeRemove(id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';

		$("#financial-outcome-report-form").submit();
	};
};